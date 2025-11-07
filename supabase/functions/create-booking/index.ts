import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { google } from "npm:googleapis@164.1.0";
import { z } from "npm:zod@3.25.76";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// 🔒 Simple rate limiting using in-memory store
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // max 5 requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // per hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

// 🔒 Zod validation schema
const BookingSchema = z.object({
  firstName: z.string().trim().min(1, "Vorname erforderlich").max(100, "Vorname zu lang"),
  lastName: z.string().trim().min(1, "Nachname erforderlich").max(100, "Nachname zu lang"),
  email: z.string().email("Ungültige E-Mail-Adresse").max(255, "E-Mail zu lang"),
  phone: z.string().max(20, "Telefonnummer zu lang").optional(),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ungültiges Datumsformat"),
  appointmentTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Ungültige Uhrzeit"),
  healthData: z.object({
    bmi: z.number().min(10).max(100),
    bmr: z.number().min(500).max(5000),
    tdee: z.number().min(500).max(8000),
    height: z.string().regex(/^\d+(\.\d+)?$/),
    weight: z.string().regex(/^\d+(\.\d+)?$/),
    age: z.string().regex(/^\d+$/),
    gender: z.enum(["male", "female"]),
    goal: z.enum(["lose", "maintain", "gain"]),
    activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very-active"]),
    sleepHours: z.string(),
    stressLevel: z.string(),
    additionalInfo: z.string().optional(),
    recommendedCalories: z.number().min(500).max(8000),
  }),
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 🔒 Rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Zu viele Anfragen. Bitte versuche es später erneut.',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429,
        }
      );
    }

    const requestData = await req.json();

    // 🔒 Validate input with zod
    const validation = BookingSchema.safeParse(requestData);
    
    if (!validation.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Ungültige Eingabedaten. Bitte überprüfe deine Angaben.',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      appointmentDate, 
      appointmentTime,
      healthData 
    } = validation.data;

    // 🔐 Google Calendar API Setup
    const GOOGLE_CALENDAR_ID = Deno.env.get('GOOGLE_CALENDAR_ID');
    const GOOGLE_CLIENT_EMAIL = Deno.env.get('GOOGLE_CLIENT_EMAIL');
    const GOOGLE_PRIVATE_KEY = Deno.env.get('GOOGLE_PRIVATE_KEY');

    if (!GOOGLE_CALENDAR_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error('[create-booking] Missing Google credentials');
      throw new Error('Configuration error');
    }

    // 🔑 Create JWT Auth Client with robust key handling
    let privateKey = GOOGLE_PRIVATE_KEY;
    let clientEmail = GOOGLE_CLIENT_EMAIL;
    
    if (privateKey.trim().startsWith('{')) {
      try {
        const serviceAccount = JSON.parse(privateKey);
        privateKey = serviceAccount.private_key;
        clientEmail = serviceAccount.client_email || clientEmail;
      } catch (e) {
        throw new Error('Configuration error');
      }
    }
    
    let formattedKey = privateKey.trim().replace(/^["']|["']$/g, '').replace(/\r\n/g, '\n');
    
    if (formattedKey.includes('\\n')) {
      formattedKey = formattedKey.replace(/\\n/g, '\n');
    }
    
    if (!formattedKey.includes('\n')) {
      const beginMarker = '-----BEGIN PRIVATE KEY-----';
      const endMarker = '-----END PRIVATE KEY-----';
      
      let keyContent = formattedKey;
      if (formattedKey.includes(beginMarker)) {
        keyContent = formattedKey.replace(beginMarker, '').replace(endMarker, '');
      }
      
      const lines = [];
      for (let i = 0; i < keyContent.length; i += 64) {
        lines.push(keyContent.substring(i, i + 64));
      }
      
      formattedKey = `${beginMarker}\n${lines.join('\n')}\n${endMarker}`;
    }
    
    formattedKey = formattedKey.replace(/\n{3,}/g, '\n\n');
    
    if (!formattedKey.includes('-----BEGIN PRIVATE KEY-----') || !formattedKey.includes('-----END PRIVATE KEY-----')) {
      throw new Error('Configuration error');
    }
    
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: formattedKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // 📅 Parse date and time
    const startDateTimeString = `${appointmentDate}T${appointmentTime}:00`;
    
    const [hours, minutes] = appointmentTime.split(':');
    const startMinutes = parseInt(hours) * 60 + parseInt(minutes);
    const endMinutes = startMinutes + 30; // 30 Minuten Dauer
    const endHour = Math.floor(endMinutes / 60).toString().padStart(2, '0');
    const endMinute = (endMinutes % 60).toString().padStart(2, '0');
    const endDateTimeString = `${appointmentDate}T${endHour}:${endMinute}:00`;

    // 🔒 FINAL OVERLAP CHECK - Prevent double bookings
    console.log('[create-booking] 🔍 Performing final overlap check...');
    const { DateTime } = await import("npm:luxon@3.4.4");
    
    const bookingSlotStart = DateTime.fromISO(startDateTimeString, { zone: "Europe/Vienna" });
    const bookingSlotEnd = DateTime.fromISO(endDateTimeString, { zone: "Europe/Vienna" });
    
    const startOfDayVienna = DateTime.fromISO(appointmentDate, { zone: "Europe/Vienna" }).startOf("day");
    const endOfDayVienna = DateTime.fromISO(appointmentDate, { zone: "Europe/Vienna" }).endOf("day");
    
    const existingEventsResponse = await calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: startOfDayVienna.toUTC().toISO(),
      timeMax: endOfDayVienna.toUTC().toISO(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const existingEvents = existingEventsResponse.data.items || [];
    console.log(`[create-booking] 📋 Found ${existingEvents.length} existing events on ${appointmentDate}`);

    // Check if the requested slot overlaps with any existing event
    for (const event of existingEvents) {
      const eventStart = DateTime.fromISO(event.start?.dateTime || event.start?.date || "", { zone: "Europe/Vienna" });
      const eventEnd = DateTime.fromISO(event.end?.dateTime || event.end?.date || "", { zone: "Europe/Vienna" });

      // Check for overlap using comprehensive overlap formula
      if (
        (bookingSlotStart >= eventStart && bookingSlotStart < eventEnd) ||
        (bookingSlotEnd > eventStart && bookingSlotEnd <= eventEnd) ||
        (bookingSlotStart <= eventStart && bookingSlotEnd >= eventEnd)
      ) {
        console.log(`[create-booking] ❌ CONFLICT: Slot ${appointmentTime} overlaps with event "${event.summary}"`);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Diese Zeit wurde gerade von jemand anderem gebucht. Bitte wähle eine andere Zeit.',
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 409,
          }
        );
      }
    }
    
    console.log('[create-booking] ✅ No conflicts found, proceeding with booking...');

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
    const additionalInfoSection = healthData.additionalInfo?.trim() 
      ? `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n💬 ZUSÄTZLICHE INFORMATIONEN:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${healthData.additionalInfo.trim()}\n` 
      : '';

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
Stresslevel: ${getStressLabel(healthData.stressLevel)}${additionalInfoSection}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Gebucht am: ${new Date().toLocaleString("de-DE")}
    `.trim();

    // 🎫 Create Google Calendar Event
    const event = {
      summary: `🏋️ Coaching: ${firstName} ${lastName}`,
      description: description,
      start: {
        dateTime: startDateTimeString,
        timeZone: 'Europe/Vienna',
      },
      end: {
        dateTime: endDateTimeString,
        timeZone: 'Europe/Vienna',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'email', minutes: 60 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID,
      sendUpdates: 'none',
      requestBody: event,
    });

    const eventLink = response.data.htmlLink || '';

    return new Response(
      JSON.stringify({
        success: true,
        eventId: response.data.id,
        eventLink: eventLink,
        message: 'Termin erfolgreich erstellt! Der Coach wird dich zum vereinbarten Zeitpunkt telefonisch kontaktieren.',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('[create-booking]', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
