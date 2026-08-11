# Clients @ Salesforce Events 2026

Mobile-first PWA event agenda app for clients account team at Salesforce events.

## Stack

- **React 18** — UI components
- **Vite 5** — dev server and build tool
- **Tailwind CSS v3** — utility-first styling via PostCSS + Autoprefixer
- No routing library — event detail is a state-controlled modal
- No backend, no API calls — all data lives in `src/data/events.js`

## Run Locally

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (typically `http://localhost:5173/agendas/`).

## Project Structure

```
src/
  config.js          ← brand colors, agenda title, team contacts, hero image path
  data/
    events.js        ← all event objects (edit this to update the agenda)
  components/
    Header.jsx       ← five-row app header
  assets/            ← drop logo SVGs and hero image here
```

## How to Update Events

Edit `src/data/events.js`. Every object in the `events` array follows this schema:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | yes | Unique identifier, e.g. `"evt-001"` |
| `eventCategory` | string | yes | `"suggested"` \| `"also"` \| `"oneOnOne"` \| `"social"` |
| `title` | string | yes | Session title |
| `date` | string | yes | `"YYYY-MM-DD"` |
| `startTime` | string | yes | `"HH:MM"` 24-hour |
| `endTime` | string | yes | `"HH:MM"` 24-hour |
| `room` | string\|null | yes | Room name, or `null` |
| `area` | string\|null | yes | Area/hall, or `null` |
| `type` | string\|null | yes | Session type (e.g. `"Keynote"`), or `null` |
| `topic` | string\|null | yes | Topic/track, or `null` |
| `summary` | string\|null | yes | Basic HTML allowed (`<b>`, `<i>`, `<a href="...">`). No `<script>` or `<style>`. Rendered with `dangerouslySetInnerHTML`. |
| `participants` | string\|null | yes | `oneOnOne` only — list of attendees. `null` for all other categories. |
| `registrationRequired` | boolean | yes | `true` or `false` |
| `transitionWarning` | string\|null | yes | Short note about travel time, or `null` |
| `mapsUrl` | string\|null | yes | `null` for McCormick Place main venue; deep-link URL for off-site locations |
| `url` | string\|null | yes | Salesforce Connections session page URL, or `null` |

> **Important:** Set inapplicable optional fields to `null` — never omit them entirely.

### Example event object

```js
{
  id: "evt-001",
  eventCategory: "suggested",
  title: "The Future of CRM AI",
  date: "2026-06-10",
  startTime: "10:00",
  endTime: "11:00",
  room: "Hall A, Room 101",
  area: "Innovation Zone",
  type: "Keynote",
  topic: "Artificial Intelligence",
  summary: "A deep dive into <b>Agentforce</b> and what's next for AI in CRM.",
  participants: null,
  registrationRequired: false,
  transitionWarning: null,
  mapsUrl: null,
  url: "https://www.salesforce.com/connections/sessions/evt-001",
}
```

After editing, push to `main`. GitHub Actions redeploys the site in approximately 2 minutes.
