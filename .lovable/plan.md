## Kontext

Der Security-Scanner meldet "Database Has No Security Policies". In diesem Projekt gibt es jedoch **keine einzige Tabelle** in der Datenbank – die Terminbuchung läuft vollständig über Google Calendar (Edge Functions `create-booking`, `get-available-slots`, `get-availability-range`). Es gibt also nichts zu schützen.

## Plan

1. Befund `database_missing_all_rls` (Scanner `supabase_lov`) als **ignoriert** markieren mit Begründung: keine Tabellen vorhanden, Daten liegen ausschließlich in Google Calendar.
2. Security Memory aktualisieren, damit zukünftige Scans diesen Hinweis nicht erneut als Problem werten, solange das Projekt tabellenlos bleibt.
3. Hinweis hinterlegen: Sobald eine erste Tabelle im Backend angelegt wird (z. B. für Kunden, Lead-Erfassung, Buchungs-Log), muss **RLS direkt beim Anlegen aktiviert** und mit einer passenden Policy versehen werden.

## Was sich nicht ändert

- Keine Codeänderungen
- Keine neuen Tabellen, keine Migrations
- Edge Functions bleiben wie bisher (eigener Befund ist bereits als "by design" mit Rate Limiting akzeptiert)