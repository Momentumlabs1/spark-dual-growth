import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { google } from "npm:googleapis@^144.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AvailableSlotsRequest {
  date: string; // Format: YYYY-MM-DD
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📅 Fetching available slots...');

    const requestData: AvailableSlotsRequest = await req.json();
    const { date } = requestData;

    if (!date) {
      throw new Error('Date is required');
    }

    console.log('📅 Checking availability for date:', date);

    // 🔐 Google Calendar API Setup
    const GOOGLE_CALENDAR_ID = Deno.env.get('GOOGLE_CALENDAR_ID');
    const GOOGLE_CLIENT_EMAIL = Deno.env.get('GOOGLE_CLIENT_EMAIL');
    const GOOGLE_PRIVATE_KEY = Deno.env.get('GOOGLE_PRIVATE_KEY');

    if (!GOOGLE_CALENDAR_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error('❌ Missing Google credentials');
      throw new Error('Calendar credentials not configured');
    }

    // 🔑 Create JWT Auth Client with robust key handling
    let privateKey = GOOGLE_PRIVATE_KEY;
    let clientEmail = GOOGLE_CLIENT_EMAIL;
    
    if (privateKey.trim().startsWith('{')) {
      const serviceAccount = JSON.parse(privateKey);
      privateKey = serviceAccount.private_key;
      clientEmail = serviceAccount.client_email || clientEmail;
    }
    
    // Format private key
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

    console.log('🔍 Querying calendar from', startOfDay, 'to', endOfDay);

    const response = await calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: startOfDay,
      timeMax: endOfDay,
      timeZone: 'Europe/Vienna',
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    console.log(`📋 Found ${events.length} events on ${date}`);

    // 🚫 Extract booked time slots
    const bookedSlots = new Set<string>();
    
    events.forEach((event) => {
      if (event.start?.dateTime) {
        // Extract time from ISO string (format: YYYY-MM-DDTHH:mm:ss)
        const startTime = event.start.dateTime.substring(11, 16); // Extract HH:mm
        bookedSlots.add(startTime);
        console.log('⛔ Booked slot:', startTime);
      }
    });

    // ✅ Filter available slots
    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.has(slot));

    console.log(`✅ Available slots: ${availableSlots.length}/${allTimeSlots.length}`);

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
    console.error('❌ Error fetching available slots:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Fehler beim Abrufen der verfügbaren Zeiten',
        details: error.toString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
