import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { google } from "npm:googleapis@^144.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  appointmentDate: string;
  appointmentTime: string;
  healthData: {
    bmi: number;
    bmr: number;
    tdee: number;
    height: string;
    weight: string;
    age: string;
    gender: string;
    goal: string;
    activityLevel: string;
    sleepHours: string;
    stressLevel: string;
    recommendedCalories: number;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📅 Creating booking...');

    const requestData: BookingRequest = await req.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      appointmentDate, 
      appointmentTime,
      healthData 
    } = requestData;

    // ✅ Validate required fields
    if (!firstName || !lastName || !email || !appointmentDate || !appointmentTime) {
      throw new Error('Missing required fields');
    }

    // 🔐 Google Calendar API Setup
    const GOOGLE_CALENDAR_ID = Deno.env.get('GOOGLE_CALENDAR_ID');
    const GOOGLE_CLIENT_EMAIL = Deno.env.get('GOOGLE_CLIENT_EMAIL');
    const GOOGLE_PRIVATE_KEY = Deno.env.get('GOOGLE_PRIVATE_KEY');

    if (!GOOGLE_CALENDAR_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error('❌ Missing Google credentials');
      throw new Error('Calendar credentials not configured');
    }

    console.log('✅ Using Calendar ID:', GOOGLE_CALENDAR_ID);

    // 🔑 Create JWT Auth Client with robust key handling
    let privateKey = GOOGLE_PRIVATE_KEY;
    let clientEmail = GOOGLE_CLIENT_EMAIL;
    
    // Step 1: Detect if the key is a JSON service account file
    if (privateKey.trim().startsWith('{')) {
      console.log('🔍 Detected JSON format, extracting credentials...');
      try {
        const serviceAccount = JSON.parse(privateKey);
        privateKey = serviceAccount.private_key;
        clientEmail = serviceAccount.client_email || clientEmail;
        console.log('✅ Extracted from JSON, using client_email:', clientEmail);
      } catch (e) {
        console.error('❌ Failed to parse JSON:', e);
        throw new Error('Invalid JSON service account format. Please paste the entire downloaded JSON file or just the private_key value.');
      }
    }
    
    // Step 2: Strict normalization
    // Remove whitespace and quotes
    let formattedKey = privateKey.trim();
    formattedKey = formattedKey.replace(/^["']|["']$/g, '');
    
    // Convert CRLF to LF
    formattedKey = formattedKey.replace(/\r\n/g, '\n');
    
    // Replace literal \n with actual newlines
    if (formattedKey.includes('\\n')) {
      formattedKey = formattedKey.replace(/\\n/g, '\n');
    }
    
    // If key is on one line, format it properly
    if (!formattedKey.includes('\n')) {
      const beginMarker = '-----BEGIN PRIVATE KEY-----';
      const endMarker = '-----END PRIVATE KEY-----';
      
      // Extract the content between markers (or entire key if no markers)
      let keyContent = formattedKey;
      if (formattedKey.includes(beginMarker)) {
        keyContent = formattedKey.replace(beginMarker, '').replace(endMarker, '');
      }
      
      // Break into 64-character lines
      const lines = [];
      for (let i = 0; i < keyContent.length; i += 64) {
        lines.push(keyContent.substring(i, i + 64));
      }
      
      formattedKey = `${beginMarker}\n${lines.join('\n')}\n${endMarker}`;
    }
    
    // Remove excessive newlines
    formattedKey = formattedKey.replace(/\n{3,}/g, '\n\n');
    
    // Step 3: Calculate SHA-256 fingerprint for debugging (without exposing secret)
    const encoder = new TextEncoder();
    const data = encoder.encode(formattedKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const fingerprint = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
    
    console.log('🔑 Private key diagnostics:', {
      hasBeginMarker: formattedKey.includes('-----BEGIN PRIVATE KEY-----'),
      hasEndMarker: formattedKey.includes('-----END PRIVATE KEY-----'),
      hasNewlines: formattedKey.includes('\n'),
      length: formattedKey.length,
      fingerprint: fingerprint, // First 16 chars of SHA-256 hash (safe to log)
      clientEmail: clientEmail,
    });
    
    // Step 4: Validate PEM format
    if (!formattedKey.includes('-----BEGIN PRIVATE KEY-----') || !formattedKey.includes('-----END PRIVATE KEY-----')) {
      throw new Error('Invalid PEM format: Missing BEGIN/END markers. Please ensure you copied the complete private key from the JSON service account file.');
    }
    
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: formattedKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // 📅 Parse date and time
    const [year, month, day] = appointmentDate.split('-');
    const [hours, minutes] = appointmentTime.split(':');
    
    const startDateTime = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );
    
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1); // 60 min duration

    // 📝 Helper functions for labels
    const getActivityLabel = (level: string) => {
      const labels: Record<string, string> = {
        sedentary: "Wenig Bewegung",
        light: "Leicht aktiv",
        moderate: "Moderat aktiv",
        active: "Sehr aktiv",
        "very-active": "Extrem aktiv",
      };
      return labels[level] || level;
    };

    const getGoalLabel = (goal: string) => {
      const labels: Record<string, string> = {
        lose: "Abnehmen",
        maintain: "Gewicht halten",
        gain: "Zunehmen",
      };
      return labels[goal] || goal;
    };

    const getSleepLabel = (sleep: string) => {
      const labels: Record<string, string> = {
        "less-than-6": "Weniger als 6 Stunden",
        "6-7": "6-7 Stunden",
        "7-8": "7-8 Stunden",
        "more-than-8": "Mehr als 8 Stunden",
      };
      return labels[sleep] || sleep;
    };

    const getStressLabel = (stress: string) => {
      const labels: Record<string, string> = {
        low: "Niedrig",
        medium: "Mittel",
        high: "Hoch",
        "very-high": "Sehr hoch",
      };
      return labels[stress] || stress;
    };

    const getBMICategory = (bmi: number) => {
      if (bmi < 18.5) return "Untergewicht";
      if (bmi < 25) return "Normalgewicht";
      if (bmi < 30) return "Übergewicht";
      return "Adipositas";
    };

    // 📧 Event Description with all health data
    const description = `
🎯 COACHING-BERATUNG: ${firstName} ${lastName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 KONTAKTDATEN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email: ${email}
📱 Telefon: ${phone || "Nicht angegeben"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 BMI & KÖRPERDATEN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BMI: ${healthData.bmi} (${getBMICategory(healthData.bmi)})
Körpergröße: ${healthData.height} cm
Gewicht: ${healthData.weight} kg
Alter: ${healthData.age} Jahre
Geschlecht: ${healthData.gender === "male" ? "Männlich" : "Weiblich"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 KALORIENBEDARF:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Grundumsatz (BMR): ${healthData.bmr} kcal/Tag
Tagesbedarf (TDEE): ${healthData.tdee} kcal/Tag
Empfohlen für Ziel: ${healthData.recommendedCalories} kcal/Tag

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 ZIELE & LIFESTYLE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hauptziel: ${getGoalLabel(healthData.goal)}
Aktivitätslevel: ${getActivityLabel(healthData.activityLevel)}
Schlaf: ${getSleepLabel(healthData.sleepHours)}
Stresslevel: ${getStressLabel(healthData.stressLevel)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Gebucht am: ${new Date().toLocaleString("de-DE")}
    `.trim();

    // 🎫 Create Google Calendar Event with Meet Link
    console.log('🔄 Creating calendar event...');
    
    // Note: We don't add attendees because Service Accounts need Domain-Wide Delegation
    // to invite attendees. Instead, users will get the calendar link to add themselves.
    const event = {
      summary: `🏋️ Coaching: ${firstName} ${lastName}`,
      description: description,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'Europe/Vienna',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Europe/Vienna',
      },
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'email', minutes: 60 },      // 1 hour before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID,
      conferenceDataVersion: 1,
      sendUpdates: 'none', // Don't send updates (no attendees)
      requestBody: event,
    });

    console.log('✅ Event created:', response.data.id);

    const meetLink = response.data.conferenceData?.entryPoints?.[0]?.uri || '';
    const eventLink = response.data.htmlLink || '';

    console.log('✅ Meet Link:', meetLink);
    console.log('✅ Event Link:', eventLink);

    return new Response(
      JSON.stringify({
        success: true,
        eventId: response.data.id,
        eventLink: eventLink,
        meetLink: meetLink,
        message: 'Termin erfolgreich erstellt! Du erhältst eine Bestätigungs-Email.',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('❌ Error creating booking:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Fehler beim Erstellen des Termins',
        details: error.toString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
