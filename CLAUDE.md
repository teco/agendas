# Inter @ Salesforce Connections 2026 — Agenda PWA

Mobile-first progressive web app for the Inter account team at Salesforce Connections 2026 in Chicago. Displays a filterable event agenda, supports offline browsing, and surfaces WhatsApp contact links and calendar export.

## Stack

- React 18 + Vite 5
- Tailwind CSS v3 (PostCSS + Autoprefixer)
- No routing library — event detail is a state-controlled bottom-sheet modal
- No backend — all data is static JS; no API calls at runtime

## Commands

```bash
npm run dev      # dev server → http://localhost:5173/agendas/
npm run build    # production build → dist/
npm run preview  # serve dist/ locally
```

## Project Layout

```
src/
  config.js          ← brand copy, contacts, colors — edit here, never in components
  data/
    events.js        ← all event objects (the only file the account team edits)
  components/
    Header.jsx       ← 5-row header: logos, title, instructions, contacts, hero image
    FilterBar.jsx    ← horizontal tab bar (All / Sessions / 1:1s / Get Togethers / My Schedule)
    EventCard.jsx    ← card in the event list
    EventDetail.jsx  ← bottom-sheet modal; wires Google Calendar + Outlook deep-links
    OfflineBanner.jsx← amber strip below filter bar when offline
    WhatsAppButton.jsx ← fixed floating button, bottom-right
    Toast.jsx        ← transient offline-tap feedback
  hooks/
    useFavorites.js  ← localStorage-backed Set; key "cnx-favorites"
    useOnlineStatus.js ← window online/offline event listener; defaults true
  utils/
    date.js          ← formatEventDate() — always use this, never new Date(isoString)
  assets/            ← drop logo SVGs and hero image here
```

## Editing Events — src/data/events.js

This is the only file the account team needs to touch. Every object in the `events` array must include all fields; set inapplicable optional fields to `null` (never omit them).

### Schema

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | Unique, e.g. `"evt-001"` |
| `eventCategory` | `"suggested"` \| `"also"` \| `"oneOnOne"` \| `"social"` | Controls badge color and filter tab |
| `title` | string | |
| `date` | string | `"YYYY-MM-DD"` |
| `startTime` | string | `"HH:MM"` 24-hour |
| `endTime` | string | `"HH:MM"` 24-hour |
| `room` | string\|null | |
| `area` | string\|null | |
| `type` | string\|null | e.g. `"Keynote"`, `"Breakout"` |
| `topic` | string\|null | Track/topic |
| `summary` | string\|null | Basic HTML allowed: `<b>`, `<i>`, `<a href="...">`. No `<script>` or `<style>`. |
| `participants` | string\|null | `oneOnOne` only; `null` for all other categories |
| `registrationRequired` | boolean | |
| `transitionWarning` | string\|null | Short travel-time note shown in detail modal |
| `mapsUrl` | string\|null | `null` for McCormick Place main venue; deep-link URL for off-site |
| `url` | string\|null | Salesforce Connections session page URL |

### Category colors

| Category | Badge label | Accent color |
|----------|-------------|--------------|
| `suggested` | Session | `#00A1E0` (Salesforce blue) — no left border on card |
| `also` | Alt. Session | `#5B8FA8` muted blue |
| `oneOnOne` | 1:1 | `#D97706` amber |
| `social` | Social | `#7C3AED` purple |

## Editing Config — src/config.js

All user-visible copy and contact info lives here. Never hardcode these values in components.

| Export | Purpose |
|--------|---------|
| `agendaTitle` | App title in header row 2 |
| `clientName` | Client short name |
| `instructions` | Instructional text in header row 3 (plain string, no HTML) |
| `whatsappNumber` | Floating WA button destination — international format, no `+`, no spaces |
| `teamContacts` | Array of `{ name, phone }` — header row 4 contact links |
| `heroImage` | Import the asset and set here, or leave `null` for placeholder |
| `colors` | Brand color tokens mirrored as CSS custom properties in `index.css` |

## Key Invariants

**Timezone-safe dates**: Never call `new Date(event.date)` directly. ISO date strings parse as UTC midnight and render as the previous day in Chicago (CDT, UTC−5) and São Paulo (BRT, UTC−3). Always use `formatEventDate(event.date)` from `src/utils/date.js`.

**Null safety**: Every optional event field can be `null` at runtime. Always null-check before rendering — `{event.room && <span>{event.room}</span>}`. No exceptions.

**Online/offline**: `useOnlineStatus` defaults to `true` and flips only on actual browser `online`/`offline` events. `navigator.onLine` is not used because it returns false unreliably on localhost and behind VPNs.

**No values in components**: All copy, phone numbers, and colors come from `src/config.js`. Components read from config; they do not define these values.

## Logos and Hero Image

Drop files into `src/assets/`, then update `src/components/Header.jsx` (rows 1 and 5):

- Salesforce logo: replace the grey placeholder `<div>` with `<img src={salesforceLogo} alt="Salesforce" className="h-7" />`
- Inter logo: same pattern
- Hero image: import the file in `config.js` and assign to `heroImage` — `Header.jsx` will render it automatically

## Deployment

The app builds to `dist/` and is served from the `/agendas/` sub-path (set in `vite.config.js`). To deploy:

```bash
npm run build
# push dist/ to the gh-pages branch, or let CI handle it
```

After a push to `main`, GitHub Actions redeploys in approximately 2 minutes.

## Branch

All development goes on `claude/inspiring-volta-u820u`. Do not push directly to `main`.
