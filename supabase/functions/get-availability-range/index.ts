import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { google } from "npm:googleapis@164.1.0";
import { DateTime } from "npm:luxon@3.4.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory cache with TTL
const cache = new Map<string, { expires: number; data: any }>();
const CACHE_TTL = 60_000; // 60 seconds

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { startDate, days = 14 } = await req.json();
    const cacheKey = `${startDate}:${days}`;
    const nowMs = Date.now();

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && cached.expires > nowMs) {
      return new Response(
        JSON.stringify({ success: true, days: cached.data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get credentials
    const GOOGLE_CALENDAR_ID = Deno.env.get('GOOGLE_CALENDAR_ID');
    const GOOGLE_CLIENT_EMAIL = Deno.env.get('GOOGLE_CLIENT_EMAIL');
    const GOOGLE_PRIVATE_KEY = Deno.env.get('GOOGLE_PRIVATE_KEY');

    if (!GOOGLE_CALENDAR_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      throw new Error('Missing Google credentials');
    }

    // Parse private key
    let privateKey = GOOGLE_PRIVATE_KEY;
    let clientEmail = GOOGLE_CLIENT_EMAIL;
    
    if (privateKey.trim().startsWith('{')) {
      try {
        const serviceAccount = JSON.parse(privateKey);
        privateKey = serviceAccount.private_key;
        clientEmail = serviceAccount.client_email || clientEmail;
      } catch (e) {
        throw new Error('Invalid service account JSON');
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

    // Create auth
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: formattedKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Calculate date range
    const startVienna = DateTime.fromISO(startDate, { zone: "Europe/Vienna" }).startOf("day");
    const endVienna = startVienna.plus({ days }).endOf("day");

    // Single API call for entire range
    const resp = await calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: startVienna.toUTC().toISO(),
      timeMax: endVienna.toUTC().toISO(),
      singleEvents: true,
      orderBy: "startTime",
      fields: "items(start,end,summary)",
    });

    const events = resp.data.items || [];

    // Generate all possible slots
    const allSlots = [];
    for (let h = 9; h <= 17; h++) {
      for (let m = 0; m < 60; m += 30) {
        if (h === 17 && m > 30) break;
        allSlots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      }
    }

    // 18-hour cutoff
    const cutoff = DateTime.now().setZone("Europe/Vienna").plus({ hours: 18 });

    // Group events by day
    const eventsByDay: Record<string, Array<{ start: DateTime; end: DateTime }>> = {};
    for (const ev of events) {
      const s = DateTime.fromISO(ev.start?.dateTime || ev.start?.date || "", { zone: "Europe/Vienna" });
      const e = DateTime.fromISO(ev.end?.dateTime || ev.end?.date || "", { zone: "Europe/Vienna" });
      const keyDay = s.toISODate();
      if (!keyDay) continue;
      (eventsByDay[keyDay] ||= []).push({ start: s, end: e });
    }

    // Calculate available slots per day
    const result: Record<string, string[]> = {};
    for (let i = 0; i < days; i++) {
      const d = startVienna.plus({ days: i });
      
      // Skip weekends
      if (d.weekday === 6 || d.weekday === 7) continue;
      
      const ds = d.toISODate();
      if (!ds) continue;
      
      const dayEvents = eventsByDay[ds] || [];
      
      const daySlots = allSlots.filter(slot => {
        const s = DateTime.fromISO(`${ds}T${slot}:00`, { zone: "Europe/Vienna" });
        const e = s.plus({ minutes: 30 });
        
        // Check 18-hour cutoff
        if (s < cutoff) return false;
        
        // Check for overlaps with existing events
        return !dayEvents.some(ev =>
          (s >= ev.start && s < ev.end) ||
          (e > ev.start && e <= ev.end) ||
          (s <= ev.start && e >= ev.end)
        );
      });
      
      if (daySlots.length > 0) {
        result[ds] = daySlots;
      }
    }

    // Cache the result
    cache.set(cacheKey, { expires: nowMs + CACHE_TTL, data: result });

    return new Response(
      JSON.stringify({ success: true, days: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[get-availability-range] ERROR:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Fehler beim Laden der Termine' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
