## Problem

Die Buchung von Alex Jung um **12:00–13:00** (statt 12:30–13:30) ist passiert, weil eine zweite Edge Function (`get-availability-range`) noch nicht angepasst wurde. Diese Funktion wird beim Vorladen des Kalenders verwendet und gibt dem User noch die alten Slots zur Auswahl.

Aktueller Stand der drei Funktionen:

| Funktion | Slots | Dauer | Status |
|---|---|---|---|
| `get-available-slots` | 08:30–17:30 (60min Schritte) | 60 min | ✅ korrekt |
| `create-booking` | (Dauer) | 60 min | ✅ korrekt |
| `get-availability-range` | **09:00, 09:30, 10:00 … 17:30** | **30 min** | ❌ falsch |

Da der Funnel den Kalender vor-lädt, sieht der User die Slots aus `get-availability-range` — also auch 12:00. Klickt er drauf, wird gebucht.

## Fix

`supabase/functions/get-availability-range/index.ts` anpassen:

1. Slot-Generierung ändern auf **08:30 bis 17:30 in 60-Minuten-Schritten** (genau wie in `get-available-slots`):
   ```ts
   const allSlots = [];
   for (let h = 8; h <= 17; h++) {
     allSlots.push(`${String(h).padStart(2,'0')}:30`);
   }
   // → 08:30, 09:30, 10:30, …, 17:30
   ```

2. Slot-Dauer in der Overlap-Prüfung von `{ minutes: 30 }` auf **`{ minutes: 60 }`** ändern.

3. In-Memory-Cache bleibt (60s TTL leert sich von selbst).

Keine weiteren Änderungen — `create-booking` und `get-available-slots` sind bereits korrekt.

## Hinweis zum Alex-Jung-Termin

Der bestehende Eintrag 12:00–13:00 bleibt im Google Kalender stehen. Nach dem Fix blockt er korrekt die Slots **11:30–12:30** und **12:30–13:30** (Overlap-Check greift bereits richtig).
