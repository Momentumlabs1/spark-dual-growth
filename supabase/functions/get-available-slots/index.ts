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
    console.log("[get-available-slots] 🚀 Function called");

    const { date } = await req.json();
    console.log("[get-available-slots] 📆 Requested date:", date);

    // Environment variables check
    let GOOGLE_CLIENT_EMAIL = Deno.env.get("GOOGLE_CLIENT_EMAIL");
    let GOOGLE_PRIVATE_KEY = Deno.env.get("GOOGLE_PRIVATE_KEY");
    const GOOGLE_CALENDAR_ID = Deno.env.get("GOOGLE_CALENDAR_ID");

    console.log("[get-available-slots] 🔐 Checking credentials...");
    console.log("[get-available-slots]   - GOOGLE_CLIENT_EMAIL:", GOOGLE_CLIENT_EMAIL ? "✅" : "❌");
    console.log("[get-available-slots]   - GOOGLE_PRIVATE_KEY:", GOOGLE_PRIVATE_KEY ? "✅" : "❌");
    console.log("[get-available-slots]   - GOOGLE_CALENDAR_ID:", GOOGLE_CALENDAR_ID ? "✅" : "❌");

    if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CALENDAR_ID) {
      const missingVars = [];
      if (!GOOGLE_PRIVATE_KEY) missingVars.push("GOOGLE_PRIVATE_KEY");
      if (!GOOGLE_CALENDAR_ID) missingVars.push("GOOGLE_CALENDAR_ID");
      
      console.error("[get-available-slots] ❌ Missing:", missingVars.join(", "));
      throw new Error("Kalender-Konfiguration fehlt. Bitte Support kontaktieren.");
    }

    // Handle both full JSON and private_key-only formats
    console.log("[get-available-slots] 🔍 Parsing credentials...");
    let privateKey = GOOGLE_PRIVATE_KEY;
    let clientEmail = GOOGLE_CLIENT_EMAIL;

    try {
      const parsed = JSON.parse(GOOGLE_PRIVATE_KEY);
      if (parsed.private_key) {
        console.log("[get-available-slots] ✅ Detected full JSON service account format");
        privateKey = parsed.private_key;
        clientEmail = parsed.client_email;
      }
    } catch (e) {
      console.log("[get-available-slots] ✅ Detected private_key-only format");
    }

    if (!clientEmail) {
      console.error("[get-available-slots] ❌ No client_email found!");
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

    console.log("[get-available-slots] ✅ Private key validated");
    console.log("[get-available-slots] 📧 Using client email:", clientEmail);
    console.log("[get-available-slots] 📅 Using calendar ID:", GOOGLE_CALENDAR_ID);

    // Initialize Google Calendar
    console.log("[get-available-slots] 🔧 Initializing Google Calendar API...");
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });
    console.log("[get-available-slots] ✅ Google Calendar API initialized");

    // Calculate time boundaries in Europe/Vienna timezone
    const { DateTime } = await import("npm:luxon@3.4.4");
    
    const startOfDayVienna = DateTime.fromISO(date, { zone: "Europe/Vienna" }).startOf("day");
    const endOfDayVienna = DateTime.fromISO(date, { zone: "Europe/Vienna" }).endOf("day");
    
    const startOfDayUTC = startOfDayVienna.toUTC().toISO();
    const endOfDayUTC = endOfDayVienna.toUTC().toISO();

    console.log("[get-available-slots] ⏰ Time boundaries:");
    console.log("[get-available-slots]   - Vienna:", startOfDayVienna.toISO(), "to", endOfDayVienna.toISO());
    console.log("[get-available-slots]   - UTC:", startOfDayUTC, "to", endOfDayUTC);

    // Fetch events from Google Calendar
    console.log("[get-available-slots] 📡 Fetching events from Google Calendar...");
    let calendarResponse;
    try {
      calendarResponse = await calendar.events.list({
        calendarId: GOOGLE_CALENDAR_ID,
        timeMin: startOfDayUTC,
        timeMax: endOfDayUTC,
        singleEvents: true,
        orderBy: "startTime",
      });
      console.log("[get-available-slots] ✅ Calendar API response status:", calendarResponse.status);
    } catch (calendarError: any) {
      console.error("[get-available-slots] ❌ Calendar API Error:", calendarError.message);
      throw calendarError;
    }

    const events = calendarResponse.data.items || [];
    console.log(`[get-available-slots] 📋 Found ${events.length} events`);

    if (events.length > 0) {
      console.log("[get-available-slots] 📅 Events:");
      events.forEach((event, index) => {
        console.log(`[get-available-slots]   ${index + 1}. ${event.summary || "No title"}`);
        console.log(`[get-available-slots]      Start: ${event.start?.dateTime || event.start?.date}`);
        console.log(`[get-available-slots]      End: ${event.end?.dateTime || event.end?.date}`);
      });
    }

    // Generate all time slots (09:00 - 17:30, every 30 minutes)
    const allTimeSlots: string[] = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 17 && minute > 30) break;
        allTimeSlots.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
      }
    }

    // Check each slot for overlaps
    const bookedSlots = new Set<string>();
    
    events.forEach((event) => {
      const eventStart = DateTime.fromISO(event.start?.dateTime || event.start?.date || "", { zone: "Europe/Vienna" });
      const eventEnd = DateTime.fromISO(event.end?.dateTime || event.end?.date || "", { zone: "Europe/Vienna" });
      
      const slotsBlockedByThisEvent: string[] = [];

      allTimeSlots.forEach((slot) => {
        const slotStartVienna = DateTime.fromISO(`${date}T${slot}:00`, { zone: "Europe/Vienna" });
        const slotEndVienna = slotStartVienna.plus({ minutes: 30 });

        // ✅ COMPREHENSIVE OVERLAP CHECK
        // Block slot if ANY of these conditions are true:
        // 1. Slot starts within event
        // 2. Slot ends within event
        // 3. Slot completely encompasses event
        if (
          (slotStartVienna >= eventStart && slotStartVienna < eventEnd) ||
          (slotEndVienna > eventStart && slotEndVienna <= eventEnd) ||
          (slotStartVienna <= eventStart && slotEndVienna >= eventEnd)
        ) {
          bookedSlots.add(slot);
          slotsBlockedByThisEvent.push(slot);
        }
      });

      if (slotsBlockedByThisEvent.length > 0) {
        console.log(`[get-available-slots]   → "${event.summary}" blocked ${slotsBlockedByThisEvent.length} slots:`, slotsBlockedByThisEvent);
      }
    });

    console.log('[get-available-slots] 🚫 Booked time slots:', {
      count: bookedSlots.size,
      slots: Array.from(bookedSlots)
    });

    // Filter available slots
    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.has(slot));

    console.log('[get-available-slots] ✅ Available time slots:', {
      count: availableSlots.length,
      slots: availableSlots
    });

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
