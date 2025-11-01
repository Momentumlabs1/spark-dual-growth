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

    // 🔑 Create JWT Auth Client
    // Handle both literal \n and actual newlines in private key
    let formattedKey = GOOGLE_PRIVATE_KEY;
    
    // If the key contains literal \n strings, replace them with actual newlines
    if (formattedKey.includes('\\n')) {
      formattedKey = formattedKey.replace(/\\n/g, '\n');
    }
    
    // Ensure proper PEM format with correct line breaks
    if (!formattedKey.includes('\n')) {
      // Key is on one line, need to format it properly
      formattedKey = formattedKey
        .replace(/-----BEGIN PRIVATE KEY-----/, '-----BEGIN PRIVATE KEY-----\n')
        .replace(/-----END PRIVATE KEY-----/, '\n-----END PRIVATE KEY-----')
        .replace(/(.{64})/g, '$1\n') // Add newline every 64 chars
        .replace(/\n\n/g, '\n'); // Remove double newlines
    }
    
    console.log('🔑 Private key format check:', {
      hasBeginMarker: formattedKey.includes('-----BEGIN PRIVATE KEY-----'),
      hasEndMarker: formattedKey.includes('-----END PRIVATE KEY-----'),
      hasNewlines: formattedKey.includes('\n'),
      length: formattedKey.length,
    });
    
    const auth = new google.auth.JWT({
      email: GOOGLE_CLIENT_EMAIL,
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
      attendees: [
        { email: email },
      ],
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
      sendUpdates: 'all', // Send email notifications to attendees
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
