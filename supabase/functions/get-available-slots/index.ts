import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { google } from "npm:googleapis@128";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { date } = await req.json();

    // Environment variables check
    let GOOGLE_CLIENT_EMAIL = Deno.env.get("GOOGLE_CLIENT_EMAIL");
    let GOOGLE_PRIVATE_KEY = Deno.env.get("GOOGLE_PRIVATE_KEY");
    const GOOGLE_CALENDAR_ID = Deno.env.get("GOOGLE_CALENDAR_ID");

    if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CALENDAR_ID) {
      throw new Error("Kalender-Konfiguration fehlt. Bitte Support kontaktieren.");
    }

    // Handle both full JSON and private_key-only formats
    let privateKey = GOOGLE_PRIVATE_KEY;
    let clientEmail = GOOGLE_CLIENT_EMAIL;

    try {
      const parsed = JSON.parse(GOOGLE_PRIVATE_KEY);
      if (parsed.private_key) {
        privateKey = parsed.private_key;
        clientEmail = parsed.client_email;
      }
    } catch (e) {
      // Already in private_key-only format
    }

    if (!clientEmail) {
      throw new Error("GOOGLE_CLIENT_EMAIL fehlt.");
    }

    // Clean up the private key
    privateKey = privateKey.replace(/\\n/g, "\n");
    
    if (!privateKey.includes("BEGIN PRIVATE KEY")) {
      throw new Error("GOOGLE_PRIVATE_KEY ist ungültig (BEGIN header fehlt)");
    }
    if (!privateKey.includes("END PRIVATE KEY")) {
      throw new Error("GOOGLE_PRIVATE_KEY ist ungültig (END footer fehlt)");
    }

    privateKey = privateKey.trim().replace(/^["']|["']$/g, "");

    // Initialize Google Calendar
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // Calculate time boundaries in Europe/Vienna timezone
    const { DateTime } = await import("npm:luxon@3.4.4");
    
    const startOfDayVienna = DateTime.fromISO(date, { zone: "Europe/Vienna" }).startOf("day");
    const endOfDayVienna = DateTime.fromISO(date, { zone: "Europe/Vienna" }).endOf("day");
    
    const startOfDayUTC = startOfDayVienna.toUTC().toISO();
    const endOfDayUTC = endOfDayVienna.toUTC().toISO();

    // Fetch events from Google Calendar
    const calendarResponse = await calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: startOfDayUTC,
      timeMax: endOfDayUTC,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = calendarResponse.data.items || [];

    // Generate all time slots (08:30 - 17:30, every 60 minutes, 60min duration)
    const allTimeSlots: string[] = [];
    for (let hour = 8; hour <= 17; hour++) {
      const slot = `${hour.toString().padStart(2, "0")}:30`;
      allTimeSlots.push(slot);
    }

    // Calculate 18-hour lead time requirement
    const nowVienna = DateTime.now().setZone("Europe/Vienna");
    const cutoffVienna = nowVienna.plus({ hours: 18 });

    // Check each slot for overlaps
    const bookedSlots = new Set<string>();
    const filteredByLeadTime = new Set<string>();
    
    events.forEach((event) => {
      const eventStart = DateTime.fromISO(event.start?.dateTime || event.start?.date || "", { zone: "Europe/Vienna" });
      const eventEnd = DateTime.fromISO(event.end?.dateTime || event.end?.date || "", { zone: "Europe/Vienna" });

      allTimeSlots.forEach((slot) => {
        const slotStartVienna = DateTime.fromISO(`${date}T${slot}:00`, { zone: "Europe/Vienna" });
        const slotEndVienna = slotStartVienna.plus({ minutes: 60 });

        // Check 18-hour lead time requirement
        if (slotStartVienna < cutoffVienna) {
          filteredByLeadTime.add(slot);
          return;
        }

        // Comprehensive overlap check
        if (
          (slotStartVienna >= eventStart && slotStartVienna < eventEnd) ||
          (slotEndVienna > eventStart && slotEndVienna <= eventEnd) ||
          (slotStartVienna <= eventStart && slotEndVienna >= eventEnd)
        ) {
          bookedSlots.add(slot);
        }
      });
    });

    // Filter available slots (exclude booked AND lead-time filtered)
    const availableSlots = allTimeSlots.filter(slot => 
      !bookedSlots.has(slot) && !filteredByLeadTime.has(slot)
    );

    return new Response(
      JSON.stringify({
        success: true,
        availableSlots,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error("[get-available-slots] ❌ ERROR:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    
    return new Response(
      JSON.stringify({
        success: false,
        error: "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.",
        details: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
