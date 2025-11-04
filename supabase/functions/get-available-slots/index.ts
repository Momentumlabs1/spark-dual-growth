import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { google } from "npm:googleapis@^144.0.0";
import { z } from "npm:zod@^3.25.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// 🔒 Simple rate limiting using in-memory store
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10; // max 10 requests
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
const AvailableSlotsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ungültiges Datumsformat"),
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
    const validation = AvailableSlotsSchema.safeParse(requestData);
    
    if (!validation.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Ungültiges Datum.',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    const { date } = validation.data;

    // 🔐 Google Calendar API Setup
    const GOOGLE_CALENDAR_ID = Deno.env.get('GOOGLE_CALENDAR_ID');
    const GOOGLE_CLIENT_EMAIL = Deno.env.get('GOOGLE_CLIENT_EMAIL');
    const GOOGLE_PRIVATE_KEY = Deno.env.get('GOOGLE_PRIVATE_KEY');

    if (!GOOGLE_CALENDAR_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error('[get-available-slots] Missing Google credentials');
      throw new Error('Configuration error');
    }

    // 🔑 Create JWT Auth Client with robust key handling
    let privateKey = GOOGLE_PRIVATE_KEY;
    let clientEmail = GOOGLE_CLIENT_EMAIL;
    
    if (privateKey.trim().startsWith('{')) {
      const serviceAccount = JSON.parse(privateKey);
      privateKey = serviceAccount.private_key;
      clientEmail = serviceAccount.client_email || clientEmail;
    }
    
    let formattedKey = privateKey.trim().replace(/^["']|["']$/g, '').replace(/\r\n/g, '\n');
    if (formattedKey.includes('\\n')) {
      formattedKey = formattedKey.replace(/\\n/g, '\n');
    }
    
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: formattedKey,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // 📅 Generate all possible time slots (9:00 - 17:30, 30-minute intervals)
    const allTimeSlots = [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
      "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    ];

    // 📆 Query Google Calendar for events on this day
    const startOfDay = `${date}T00:00:00`;
    const endOfDay = `${date}T23:59:59`;

    const response = await calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: startOfDay,
      timeMax: endOfDay,
      timeZone: 'Europe/Vienna',
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];

    // 🚫 Extract booked time slots
    const bookedSlots = new Set<string>();
    
    events.forEach((event) => {
      if (event.start?.dateTime) {
        const startTime = event.start.dateTime.substring(11, 16);
        bookedSlots.add(startTime);
      }
    });

    // ✅ Filter available slots
    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.has(slot));

    return new Response(
      JSON.stringify({
        success: true,
        date,
        availableSlots,
        bookedSlots: Array.from(bookedSlots),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('[get-available-slots]', error);
    
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
