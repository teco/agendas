# Event Agenda PWA — Client Playbook

A reusable build guide for the mobile-first Progressive Web App agenda we built for Inter @ Salesforce Connections 2026. Follow this to reproduce the project for a new client attending any Salesforce event.

---

## What This Is

A zero-backend, installable PWA that gives a client's account team a private, offline-capable agenda for a Salesforce event. Features:

- Filterable event list (All / Sessions / 1:1s / Get Togethers / My Schedule)
- Event detail bottom-sheet with calendar export (Google Calendar + Outlook) and Google Maps deep-links
- Favorites (star to save) — persisted in localStorage, survives reload and offline
- Online/offline awareness — calendar/map links disable gracefully; amber banner; offline toast on tapped links
- WhatsApp floating button + header contact row — one tap to message any account team member
- "Add to Home Screen" hint banner — passive, dismissible, hidden in standalone mode
- Service worker precache — full offline browsing after first load
- Custom domain via Cloudflare + GitHub Pages

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| UI | React 18 + Vite 5 | Fast dev cycle; no SSR complexity |
| Styling | Tailwind CSS v3 (PostCSS + Autoprefixer) | Utility-first, no runtime CSS |
| PWA | vite-plugin-pwa + Workbox | Manifest + service worker with zero config |
| Routing | None | Single-page; detail is a state-controlled bottom sheet |
| Backend | None | All data is static JS; no API calls |
| Hosting | GitHub Pages (gh-pages branch) | Free; CI/CD via GitHub Actions |
| DNS | Cloudflare | Custom subdomain, SSL termination |

---

## Stage-by-Stage Build Plan

### Stage 1 — Scaffold

Create the full project skeleton. Nothing dynamic yet.

**Files to create:**

| File | Notes |
|------|-------|
| `package.json` | React 18, Vite 5, Tailwind v3, vite-plugin-pwa |
| `vite.config.js` | `base: '/'`; React plugin; VitePWA plugin |
| `tailwind.config.js` | content glob `src/**/*.{js,jsx}` |
| `postcss.config.js` | tailwindcss + autoprefixer |
| `index.html` | title, viewport, theme-color meta |
| `src/main.jsx` | createRoot render |
| `src/App.jsx` | renders `<Header />` + stub `<main>` |
| `src/index.css` | Tailwind directives |
| `src/config.js` | all copy, contacts, colors — see schema below |
| `src/data/events.js` | schema comment + `export const events = []` |
| `src/components/Header.jsx` | 5-row header (see below) |
| `src/assets/.gitkeep` | preserve empty dir in git |

**Header — 5 rows:**
1. Logos row — Salesforce logo left, client logo right (`justify-between`)
2. Title — centered bold, from `agendaTitle` config
3. Instructions — plain string from `instructions` config
4. Team contacts — WhatsApp `wa.me` links for each `teamContacts` entry
5. Hero image — `<img>` when `heroImage` is set, grey placeholder when null

**Acceptance:** `npm run dev` starts, header renders, no console errors, no horizontal scroll at 390px.

---

### Stage 2 — Event List + Detail Modal

**New files:** `EventCard.jsx`, `EventDetail.jsx`, `FilterBar.jsx`, `useFavorites.js`, `utils/date.js`

**Key decisions:**
- **Flat card model** (not grouped containers): grouped containers break when a parent event is hidden by a filter. Each card carries its own color independently.
- **Filter tabs:** All / Sessions / 1:1s / Get Togethers / My Schedule. "Sessions" shows both `suggested` and `also` categories.
- **`formatEventDate()`** — always use this instead of `new Date(isoString)`. ISO date strings parse as UTC midnight, which renders as the previous day in Chicago (CDT, UTC−5) and São Paulo (BRT, UTC−3). The utility splits the string and constructs a local Date explicitly.
- **Favorites** — `useFavorites` hook; key `"cnx-favorites"`; stores `Array.from(Set)` in localStorage; returns `[Set, toggleFn]`.
- **Bottom sheet** — fixed overlay, `maxHeight: 90vh`, `overflow-y-auto`. Body scroll locked (`document.body.style.overflow = 'hidden'`) while open.

---

### Stage 3 — Online/Offline + WhatsApp + Calendar

**New files:** `OfflineBanner.jsx`, `WhatsAppButton.jsx`, `Toast.jsx`, `useOnlineStatus.js`

**Key decisions:**
- **`useOnlineStatus` initialises to `true`**, not `navigator.onLine`. `navigator.onLine` returns false on localhost and behind VPNs, which broke the calendar buttons during development.
- **Calendar URL timezone fix** — events.js times are America/Chicago wall-clock (CDT, UTC−5). Convert to UTC deterministically by adding 5 hours via `Date.UTC(y, mo-1, d, h+5, mi)` and emitting a `Z` suffix. Never use `Date.toISOString()` on a locally-parsed date — that applies the host device's offset and breaks for Brazilian attendees (UTC−3). Hardcode `+5` for the June 2–4 window; no DST transition occurs then.
- **WhatsApp button** — use an SVG icon, not text. "WA" text is not recognizable to all users.
- **Offline tap** — links become disabled spans/buttons; tapping shows a 3-second Toast.

**Calendar deep-link format:**
```js
// Google Calendar
'https://calendar.google.com/calendar/render?action=TEMPLATE'
  + '&text='    + encodeURIComponent(title)
  + '&dates='   + startCompact + '/' + endCompact   // e.g. 20260603T150000Z
  + '&details=' + encodeURIComponent(stripHtml(summary))
  + '&location='+ encodeURIComponent(location)

// Outlook Live
'https://outlook.live.com/calendar/0/deeplink/compose'
  + '?subject=' + encodeURIComponent(title)
  + '&startdt=' + startIso    // e.g. 2026-06-03T15:00:00Z
  + '&enddt='   + endIso
  + '&body='    + encodeURIComponent(stripHtml(summary))
  + '&location='+ encodeURIComponent(location)
```

---

### Stage 4 — PWA + Deployment

**New files:** `public/manifest.webmanifest`, `public/icons/icon-192.png`, `public/icons/icon-512.png`, `public/CNAME`, `public/.nojekyll`, `.github/workflows/deploy.yml`

**Vite PWA config:**
```js
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: agendaTitle,
    short_name: clientName,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#032D60',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'] },
})
```

**GitHub Actions deploy:**
```yaml
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: <subdomain>.<yourdomain>
```

**Custom domain:** Create a `CNAME` record in Cloudflare pointing `<subdomain>.<yourdomain>` to `<org>.github.io`. Set the custom domain in the GitHub repo → Settings → Pages.

**`public/.nojekyll`** — required. Without it, GitHub Pages strips files and directories whose names start with `_`, breaking the Vite JS chunks.

---

### Stage 5 — Real Data + Polish

**What this stage covers:**
- Replace stub `events.js` with real event objects
- Category color system (teal / amber / purple / white)
- WCAG AA contrast fixes
- Wire real logo SVGs and hero image
- Calendar timezone fix (Stage 3 revisit)
- Spotify button for social events with a playlist
- "Add to Home Screen" install hint banner

**Category color tokens** (edit in `config.js` → `categoryColors`):

| Category | Card label | Accent (left border) | Tint (bg) |
|----------|-----------|----------------------|-----------|
| `suggested` | *(none)* | none | `#ffffff` |
| `also` | Alternative session | `#19a7b3` teal | `#f0fbfc` |
| `oneOnOne` | Confirmed 1:1 | `#ff9200` amber | `#fff8ec` |
| `social` | Get together | `#8a4fd3` purple | `#f7f2fd` |

**WCAG AA contrast — rules that bit us:**
- Never use accent colors as text — they fail on their own tints. Use `#032D60` (8.4:1) for all category labels.
- White on `#D97706` (amber) for "Reg. required" badge = 2.52:1 ❌ → fix: `#92400E` on `#FEF3C7` = 6.53:1 ✅
- Contact links `#00A1E0` on white = 2.9:1 ❌ → use `#032D60`
- `#6B7280` text on colored card tints can dip below 4.5:1 → use `#374151`

**Spotify button** — render in event detail when `spotifyUrl` is non-null:
```jsx
<a href={event.spotifyUrl} style={{ background: '#1A7F43', color: '#fff' }}>
  Party playlist ♪
</a>
```
Use `#1A7F43` (darker Spotify green) — `#1DB954` on white is only 2.9:1 and fails AA.

---

## Events Data Schema

Every object in `src/data/events.js` must include all fields. Set inapplicable optional fields to `null` — never omit them.

```js
{
  id: string,                      // unique, e.g. "evt-001"
  eventCategory: "suggested" | "also" | "oneOnOne" | "social",
  title: string,
  date: string,                    // "YYYY-MM-DD" — event timezone wall-clock date
  startTime: string,               // "HH:MM" 24-hour — event timezone wall-clock
  endTime: string,                 // "HH:MM" 24-hour
  room: string|null,
  area: string|null,
  type: string|null,               // e.g. "Keynote", "Breakout", "Confirmed 1:1 Meeting"
  topic: string|null,
  summary: string|null,            // basic HTML: <b>, <i>, <a href="..."> only
  participants: string|null,       // oneOnOne only; null for all other categories
  registrationRequired: boolean,
  transitionWarning: string|null,  // short travel-time note shown in detail modal
  mapsUrl: string|null,            // null for main venue; Google Maps deep-link for off-site
  url: string|null,                // public session catalog URL; null for private sessions
  spotifyUrl: string|null,         // playlist link; null unless event has one
}
```

**Calendar timezone rule:** Times in `events.js` are always the event venue's wall-clock time. Hard-code the UTC offset for the specific event dates (e.g. Chicago CDT = UTC−5, so add 5h). Do not rely on the host device's timezone.

---

## Config.js Schema

All user-visible copy and brand values live here. Components read from config; they never define these values.

```js
export const agendaTitle = "Client @ Event Name Year";
export const clientName  = "Client";
export const instructions = "Tap any session to read details. Star events to save them to My Schedule. Tap a name below to message the account team.";
export const whatsappNumber = "5511999999999";  // international, no +, no spaces
export const teamContacts = [
  { name: "Name",  phone: "5511999999999" },
  // ...
];
export const heroImage = null;  // or: import heroImg from './assets/hero.png'; then heroImg
export const colors = {
  salesforceBlue: "#00A1E0",
  neutralDark:    "#032D60",
  white:          "#FFFFFF",
};
export const categoryColors = {
  suggested: { accent: null,      tint: '#ffffff' },
  also:      { accent: '#19a7b3', tint: '#f0fbfc' },
  oneOnOne:  { accent: '#ff9200', tint: '#fff8ec' },
  social:    { accent: '#8a4fd3', tint: '#f7f2fd' },
};
```

---

## Asset Handling

All images must be **Vite imports**, not raw string paths. Vite content-hashes and bundles them; the service worker precaches them automatically.

```js
// config.js
import heroImg from './assets/hero.png'
export const heroImage = heroImg
```

```jsx
// Header.jsx
import salesforceLogo from '../assets/salesforce-logo.svg'
import interLogo from '../assets/inter-logo.svg'
```

**PWA icons** go in `public/icons/` (not `src/assets/`). They are referenced by the manifest by path and copied verbatim to `dist/` — no import needed.

**Required assets per client:**
- `src/assets/salesforce-logo.svg` — Salesforce cloud mark (use official SVG)
- `src/assets/<client>-logo.svg` — client wordmark or mark
- `src/assets/hero.png` — event banner, ideally 1080×570 or similar landscape ratio; rendered at 120px height with `object-cover`
- `public/icons/icon-192.png` — 192×192 PWA icon (client brand on solid background)
- `public/icons/icon-512.png` — 512×512 same

---

## New Client Checklist

- [ ] Fork or copy this repo to a new repo under the client/org
- [ ] Update `config.js`: `agendaTitle`, `clientName`, `instructions`, `whatsappNumber`, `teamContacts`
- [ ] Drop logo SVGs and hero PNG into `src/assets/`; wire `heroImage` in `config.js`
- [ ] Generate PWA icons (192 + 512) and drop into `public/icons/`
- [ ] Populate `src/data/events.js` with real event objects (follow schema above)
- [ ] Update timezone offset in `EventDetail.jsx` `toUtcComponents()` to match event venue UTC offset
- [ ] Update `public/CNAME` to the new subdomain
- [ ] Set the custom domain in GitHub repo → Settings → Pages
- [ ] Add Cloudflare CNAME record pointing the subdomain to `<org>.github.io`
- [ ] Push to `main` — GitHub Actions builds and deploys in ~2 minutes
- [ ] Verify on mobile: logos, hero, events, filters, favorites, calendar export, WhatsApp links, offline mode

---

## Common Gotchas

| Problem | Cause | Fix |
|---------|-------|-----|
| Calendar event is in the wrong timezone | `Date.toISOString()` applies device timezone | Use `Date.UTC(y, mo-1, d, h+offset, mi)` and emit `Z` suffix with hardcoded venue offset |
| Date displays as previous day | `new Date("YYYY-MM-DD")` parses as UTC midnight | Use `formatEventDate()` from `utils/date.js` which splits the string |
| Calendar/map buttons disabled on localhost | `navigator.onLine` returns false behind VPN | Initialize `useOnlineStatus` to `true`; flip only on browser `online`/`offline` events |
| Lighthouse fails contrast on category pills | White text on colored backgrounds | Use `#032D60` text on tint background; never text-on-accent |
| `_` prefixed JS chunks 404 on GitHub Pages | Jekyll strips `_` files | Add `public/.nojekyll` |
| Grouped card layout breaks when filtering | Parent event hidden, child still shows | Use flat per-card model — each card carries its own color |
| Install hint shows in standalone mode | Banner not checking display mode | Check `window.matchMedia('(display-mode: standalone)').matches` and `navigator.standalone` |
