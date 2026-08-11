# DF26 Agenda PWA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold `agendas/df26/` as a self-contained Vite + React 18 PWA for the Dreamforce 2026 agenda, adapted from the Connections 2026 app at the repo root.

**Architecture:** Independent Vite project under `agendas/df26/`; no files outside that folder are modified. All 30 sessions use one of five `eventCategory` values. Cards render a flat list with no date grouping; no dates, times, rooms, or calendar buttons appear anywhere in the UI.

**Tech Stack:** React 18, Vite 5, Tailwind CSS v3, vite-plugin-pwa, Workbox

## Global Constraints

- Do NOT modify any file outside `agendas/df26/`
- Do NOT run `npm run build` — scaffold only; build is gated on hero.png being provided
- `npm run dev` must start without errors at the end of the plan
- All 30 sessions must render; each under the correct filter tab
- localStorage key for favorites: `"df26-favorites"` (not `"cnx-favorites"`)
- localStorage key for install hint: `"df26-install-hint-dismissed"`
- No WhatsApp floating button rendered anywhere
- No team contacts row rendered in header
- No calendar export buttons in EventDetail
- No date, time, room, or location shown on EventCard or EventDetail
- Venue string in detail sheet: `"Dreamforce 2026 · Sep 15–17 · San Francisco"` — grey, same position as time row was
- All category label text: `#032D60` — never use accent color as text (WCAG AA)
- `public/.nojekyll` must exist
- `public/CNAME` must contain exactly: `df26.agendas.terencereis.com.br`
- Hero image: `config.js` ships with `heroImage = null`; the import line is commented out until asset is dropped in
- Deploy workflow targets `gh-pages-df26` branch (not `gh-pages`)

---

## File Map

**Create (new files):**
- `agendas/df26/package.json`
- `agendas/df26/vite.config.js`
- `agendas/df26/tailwind.config.js`
- `agendas/df26/postcss.config.js`
- `agendas/df26/index.html`
- `agendas/df26/public/.nojekyll`
- `agendas/df26/public/CNAME`
- `agendas/df26/public/icons/icon-192.png` — copied from `public/icons/icon-192.png`
- `agendas/df26/public/icons/icon-512.png` — copied from `public/icons/icon-512.png`
- `agendas/df26/src/main.jsx`
- `agendas/df26/src/index.css`
- `agendas/df26/src/config.js`
- `agendas/df26/src/App.jsx`
- `agendas/df26/src/assets/salesforce-logo.svg` — copied from `src/assets/salesforce-logo.svg`
- `agendas/df26/src/data/events.js`
- `agendas/df26/src/hooks/useFavorites.js`
- `agendas/df26/src/hooks/useOnlineStatus.js`
- `agendas/df26/src/utils/date.js`
- `agendas/df26/src/components/Header.jsx`
- `agendas/df26/src/components/FilterBar.jsx`
- `agendas/df26/src/components/EventCard.jsx`
- `agendas/df26/src/components/EventDetail.jsx`
- `agendas/df26/src/components/OfflineBanner.jsx`
- `agendas/df26/src/components/InstallHint.jsx`
- `agendas/df26/src/components/Toast.jsx`
- `.github/workflows/deploy-df26.yml`

**No files modified outside `agendas/df26/` or `.github/workflows/`.**

---

### Task 1: Project scaffold — package.json, config files, public assets

**Files:**
- Create: `agendas/df26/package.json`
- Create: `agendas/df26/vite.config.js`
- Create: `agendas/df26/tailwind.config.js`
- Create: `agendas/df26/postcss.config.js`
- Create: `agendas/df26/index.html`
- Create: `agendas/df26/public/.nojekyll`
- Create: `agendas/df26/public/CNAME`
- Copy:   `agendas/df26/public/icons/icon-192.png`
- Copy:   `agendas/df26/public/icons/icon-512.png`

**Interfaces:**
- Produces: runnable Vite project skeleton; `npm ci` installs cleanly; `npm run dev` will work once src files exist

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p agendas/df26/public/icons agendas/df26/src
```

- [ ] **Step 2: Write package.json**

```json
{
  "name": "df26-agenda",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.40",
    "tailwindcss": "^3.4.4",
    "vite": "^5.4.0",
    "vite-plugin-pwa": "^1.3.0"
  }
}
```

- [ ] **Step 3: Write vite.config.js**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'You @ Dreamforce 2026',
        short_name: 'DF26',
        description: 'Dreamforce 2026 session guide',
        theme_color: '#032D60',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,woff,woff2}'],
      },
    }),
  ],
});
```

- [ ] **Step 4: Write tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

- [ ] **Step 5: Write postcss.config.js**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 6: Write index.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#032D60" />
    <title>You @ Dreamforce 2026</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Write public/.nojekyll (empty file)**

```bash
touch agendas/df26/public/.nojekyll
```

- [ ] **Step 8: Write public/CNAME**

File contents (one line, no trailing newline issues — use Write tool):
```
df26.agendas.terencereis.com.br
```

- [ ] **Step 9: Copy icons from root public/icons/**

```bash
cp public/icons/icon-192.png agendas/df26/public/icons/icon-192.png
cp public/icons/icon-512.png agendas/df26/public/icons/icon-512.png
```

- [ ] **Step 10: Install dependencies**

```bash
cd agendas/df26 && npm install
```

- [ ] **Step 11: Commit**

```bash
git add agendas/df26/package.json agendas/df26/package-lock.json agendas/df26/vite.config.js agendas/df26/tailwind.config.js agendas/df26/postcss.config.js agendas/df26/index.html agendas/df26/public/.nojekyll agendas/df26/public/CNAME agendas/df26/public/icons/
git commit -m "scaffold: df26 project skeleton with package.json and config files"
```

---

### Task 2: Static source files — main.jsx, index.css, utils, hooks, assets

**Files:**
- Create: `agendas/df26/src/main.jsx`
- Create: `agendas/df26/src/index.css`
- Create: `agendas/df26/src/utils/date.js`
- Create: `agendas/df26/src/hooks/useFavorites.js`
- Create: `agendas/df26/src/hooks/useOnlineStatus.js`
- Copy:   `agendas/df26/src/assets/salesforce-logo.svg`

**Interfaces:**
- Produces: `useFavorites()` → `[Set<string>, (id: string) => void]`
- Produces: `useOnlineStatus()` → `boolean`
- Produces: `formatEventDate(isoDate: string)` → `string`

- [ ] **Step 1: Copy salesforce logo**

```bash
mkdir -p agendas/df26/src/assets
cp src/assets/salesforce-logo.svg agendas/df26/src/assets/salesforce-logo.svg
```

- [ ] **Step 2: Write src/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 3: Write src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-sf-blue: #0176D3;
  --color-neutral-dark: #032D60;
}

body {
  background: #fff;
}
```

- [ ] **Step 4: Write src/utils/date.js**

Kept verbatim from the original — required by EventDetail even though date display is suppressed.

```js
// Timezone-safe date formatting.
// ISO date strings ("YYYY-MM-DD") parse as UTC midnight via `new Date(iso)`, which
// renders as the previous day in any timezone west of UTC (e.g. Chicago, São Paulo).
// Always split the string and construct a local Date instead.

export function formatEventDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
```

- [ ] **Step 5: Write src/hooks/useOnlineStatus.js**

Verbatim from original — initialises to `true`, browser events only, no `navigator.onLine`.

```js
import { useEffect, useState } from 'react'

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const up   = () => setIsOnline(true)
    const down = () => setIsOnline(false)
    window.addEventListener('online',  up)
    window.addEventListener('offline', down)
    return () => {
      window.removeEventListener('online',  up)
      window.removeEventListener('offline', down)
    }
  }, [])

  return isOnline
}
```

- [ ] **Step 6: Write src/hooks/useFavorites.js**

Only change from original: `STORAGE_KEY = 'df26-favorites'`.

```js
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'df26-favorites'

function readInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed)
  } catch {
    return new Set()
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)))
    } catch {
      // ignore quota / private-mode errors
    }
  }, [favorites])

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return [favorites, toggleFavorite]
}
```

- [ ] **Step 7: Commit**

```bash
git add agendas/df26/src/
git commit -m "scaffold: df26 static source files — main, css, hooks, utils, logo"
```

---

### Task 3: config.js and events.js

**Files:**
- Create: `agendas/df26/src/config.js`
- Create: `agendas/df26/src/data/events.js`

**Interfaces:**
- Produces: named exports from `config.js` consumed by all components
- Produces: `events` array (30 items) consumed by `App.jsx`

- [ ] **Step 1: Write src/config.js**

```js
// src/config.js
// heroImage is null until hero.png is dropped into src/assets/ and the import below is uncommented.
// import heroImg from './assets/hero.png'

export const agendaTitle   = "You @ Dreamforce 2026";
export const clientName    = "Dreamforce 2026";
export const instructions  = "Tap any session to read details. Star sessions to save them to Interested.";
export const whatsappNumber = "5511999999999"; // not rendered in this draft
export const teamContacts  = [
  { name: "Terence Reis", phone: "5511999999999" },
];
export const heroImage = null; // set to heroImg after dropping hero.png into src/assets/
export const colors = {
  salesforceBlue: "#0176D3",
  neutralDark:    "#032D60",
  white:          "#FFFFFF",
};
export const categoryColors = {
  "unified-data":       { accent: "#0176D3", tint: "#EBF5FB" },
  "agentforce-mktg":   { accent: "#6B40C4", tint: "#F4F0FB" },
  "ai-journeys":       { accent: "#0B827C", tint: "#E8F7F6" },
  "media-attribution": { accent: "#DD7A01", tint: "#FDF3E3" },
  "efficiency":        { accent: "#2E844A", tint: "#EBF5EE" },
};
export const labelText = "#032D60";
```

- [ ] **Step 2: Create src/data/ directory and write events.js**

```bash
mkdir -p agendas/df26/src/data
```

Write `agendas/df26/src/data/events.js` with the full 30-event array below. Every object must have every field; `null` for inapplicable optional fields.

```js
export const events = [

  // ── UNIFIED CUSTOMER DATA ──────────────────────────────────────────

  {
    id: "evt-001",
    eventCategory: "unified-data",
    title: "4 Ways Data 360 Turns Siloed Data Into Customer Value",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Unified Customer Data",
    topic: null,
    summary: "Direct answer to common core bottlenecks — disparate systems unified into seamless customer experiences.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-002",
    eventCategory: "unified-data",
    title: "Build a Unified Customer View with Data 360",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Unified Customer Data",
    topic: null,
    summary: "Data Cloud One for a single profile across all product lines — the foundation for every personalization and agentic use case downstream.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-003",
    eventCategory: "unified-data",
    title: "From 400M Consumers to One Profile: The Nestlé Data Story",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Unified Customer Data",
    topic: null,
    summary: "Nestlé unified 400M+ profiles across 51 markets for real-time segmentation and AI journeys — a compelling proof point at large scale.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-004",
    eventCategory: "unified-data",
    title: "How Salesforce Powers Its Own Lead Funnel with Data 360",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Unified Customer Data",
    topic: null,
    summary: "Solved internal data fragmentation with Data 360 + ML Models + Flows to automate contextual campaigns — Salesforce as Customer Zero.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-005",
    eventCategory: "unified-data",
    title: "How Salesforce Cut Opt-Outs by 50% with Data 360",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Unified Customer Data",
    topic: null,
    summary: "Data 360-powered Global Preference Center replacing all-or-nothing unsubscribe — directly relevant to notification fatigue and consent management.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-006",
    eventCategory: "unified-data",
    title: "Not Your Old CDP. Redefine What's Possible with Data 360.",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Unified Customer Data",
    topic: null,
    summary: "Data 360 CDP positioning against legacy CDPs — unified profiles powering instant personalization and agentic segmentation.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-007",
    eventCategory: "unified-data",
    title: "From Silos to Scale: U.S. Bank's Data 360 Transformation",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Unified Customer Data",
    topic: null,
    summary: "Financial services identity and data unification case study — directly transferable patterns for banking-sector data architecture conversations.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },

  // ── AGENTFORCE MARKETING ───────────────────────────────────────────

  {
    id: "evt-008",
    eventCategory: "agentforce-mktg",
    title: "Autonomy in Action: Campaign Execution Reimagined",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Agentforce Marketing",
    topic: null,
    summary: "Goals Agent — marketers define strategy, agent executes autonomously with Command Center oversight. The clearest demo of where agentic marketing is today.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-009",
    eventCategory: "agentforce-mktg",
    title: "How Salesforce is Transforming Marketing in the Agentic Era",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Agentforce Marketing",
    topic: null,
    summary: "Salesforce's own playbook for agentic marketing — strong narrative for C-suite conversations about the shift from campaign execution to agent orchestration.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-010",
    eventCategory: "agentforce-mktg",
    title: "Building the Case for Agentic Marketing",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Agentforce Marketing",
    topic: null,
    summary: "Addresses common internal challenges: how to justify the shift to agentic marketing while still solving legacy campaign, data, and workflow problems.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-011",
    eventCategory: "agentforce-mktg",
    title: "Agentforce Marketing Flow Fundamentals",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Agentforce Marketing",
    topic: null,
    summary: "Flow-based automation and personalization across every channel — foundational for ops teams building the execution layer under agentic campaigns.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-012",
    eventCategory: "agentforce-mktg",
    title: "Personalize and Scale Content with Agentforce Marketing",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Agentforce Marketing",
    topic: null,
    summary: "No-code personalized content at scale — targets the goal of eliminating engineering-dependent manual workflows for campaign content production.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-013",
    eventCategory: "agentforce-mktg",
    title: "Plan Smarter with the Marketing Planning & Operations Agent",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Agentforce Marketing",
    topic: null,
    summary: "Planning & Operations Agent replaces manual campaign hierarchy and approval workflows — directly supports efficiency targets by removing bottlenecks from the planning cycle.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-014",
    eventCategory: "agentforce-mktg",
    title: "Hidden Gems: Latest Agentforce Marketing Innovations",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Agentforce Marketing",
    topic: null,
    summary: "Newest features teams may not know exist — good for roadmap alignment and surfacing expansion conversation starters with product stakeholders.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-015",
    eventCategory: "agentforce-mktg",
    title: "The Agentic Marketing Lifecycle: Plan, Create, Execute",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Agentforce Marketing",
    topic: null,
    summary: "How the Planning & Operations Agent and Content Agent work together across the full campaign lifecycle — end-to-end view of the agentic stack in motion.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },

  // ── AI JOURNEYS & HYPERPERSONALIZATION ────────────────────────────

  {
    id: "evt-016",
    eventCategory: "ai-journeys",
    title: "Data to Delight: AI-Driven Customer Journeys",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "AI Journeys",
    topic: null,
    summary: "Informatica + Data 360 + Agentforce Marketing automating journeys at scale and reducing churn — directly mirrors engagement gap challenges in financial services.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-017",
    eventCategory: "ai-journeys",
    title: "From Data Foundation to Agentic Marketing",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "AI Journeys",
    topic: null,
    summary: "Novartis: 450% CTR lift and 28% fewer opt-outs after unifying data — compelling proof point in a regulated industry, directly transferable to financial services audiences.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-018",
    eventCategory: "ai-journeys",
    title: "From Activity to Intent: Turn Web Signals Into Sales Action",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "AI Journeys",
    topic: null,
    summary: "Connects behavioral signals to CRM via Data 360 + Salesforce Personalization — maps to closed-loop attribution and intent-driven journey activation.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-019",
    eventCategory: "ai-journeys",
    title: "Agents That Remember: Memory & Context for Every Interaction",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "AI Journeys",
    topic: null,
    summary: "Real-time context retention across chat and web — core to the vision of next best conversation and agentic customer orchestration at scale.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-020",
    eventCategory: "ai-journeys",
    title: "From Static Pages to Agentic Web Personalization",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "AI Journeys",
    topic: null,
    summary: "Real-time behavioral signals and agentic recommendations replacing static pages and manual rules — the practical path from rules-based to intent-driven personalization.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-021",
    eventCategory: "ai-journeys",
    title: "Closing the Loop: Proving AI Personalization Drives Revenue",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "AI Journeys",
    topic: null,
    summary: "Connecting AI-personalized web experiences to conversions, including through retail partners — a direct ROI proof point for personalization investment.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },

  // ── MEDIA & ATTRIBUTION ───────────────────────────────────────────

  {
    id: "evt-022",
    eventCategory: "media-attribution",
    title: "Advertising in the Agentic Era: What's Next for Paid",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Media & Attribution",
    topic: null,
    summary: "First-party data + agents to activate audiences, optimize spend autonomously, and close the loop on attribution — the strongest paid media session in the catalog.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-023",
    eventCategory: "media-attribution",
    title: "Build Lasting Loyalty That Keeps Shoppers Coming Back",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Media & Attribution",
    topic: null,
    summary: "Data 360 + Agentforce Marketing for loyalty and personalization at scale — bridges retail and banking worlds for clients operating across both.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-024",
    eventCategory: "media-attribution",
    title: "Converse with Your Data: Unified Analytics in Action",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Media & Attribution",
    topic: null,
    summary: "Conversational, cross-channel analytics replacing manual reporting — the closest session in this catalog to a Marketing Cloud Intelligence / Datorama deep dive.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-025",
    eventCategory: "media-attribution",
    title: "Maximizing ROI: Smarter Data 360 and Agentforce Pricing",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Media & Attribution",
    topic: null,
    summary: "Consumption pricing mechanics and credit optimization — directly relevant to controlling and forecasting spend as agentic workloads scale.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },

  // ── OPERATIONAL EFFICIENCY ────────────────────────────────────────

  {
    id: "evt-026",
    eventCategory: "efficiency",
    title: "5 Steps to Building Agents in Regulated Industries",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Operational Efficiency",
    topic: null,
    summary: "Practical framework for AI deployment in compliance-heavy environments — directly relevant to financial regulatory context and governance requirements.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-027",
    eventCategory: "efficiency",
    title: "3 Steps to Go From Manual Processes to AI-Driven Operations",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Operational Efficiency",
    topic: null,
    summary: "Iterative approach for replacing spreadsheet and email workflows — speaks directly to ops cost reduction goals without requiring a big-bang transformation.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-028",
    eventCategory: "efficiency",
    title: "4-Week Fix: How to Eliminate Duplicate Data & Enable AI Fast",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Operational Efficiency",
    topic: null,
    summary: "Quick-win methodology for data cleanup and AI readiness — ideal starting point for clients still dealing with engineering-dependent segmentation and data quality problems.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-029",
    eventCategory: "efficiency",
    title: "Delight Telco Teams and Customers with Agentic Service",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Operational Efficiency",
    topic: null,
    summary: "Telco AI agents handling billing and routine inquiries while unlocking personalized upsells — strong structural analogy for banking customer service and cross-sell strategy.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "evt-030",
    eventCategory: "efficiency",
    title: "Consent Management Built for AI and Scale",
    date: "2026-09-15",
    startTime: "00:00",
    endTime: "00:00",
    room: null,
    area: null,
    type: "Operational Efficiency",
    topic: null,
    summary: "Global Consent Manager for billions of consent records with real-time verifiable compliance — high relevance given financial-services regulatory exposure and data governance requirements.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },

];
```

- [ ] **Step 3: Commit**

```bash
git add agendas/df26/src/config.js agendas/df26/src/data/
git commit -m "scaffold: df26 config.js and 30-event events.js"
```

---

### Task 4: Components — Header, FilterBar, OfflineBanner, Toast, InstallHint

**Files:**
- Create: `agendas/df26/src/components/Header.jsx`
- Create: `agendas/df26/src/components/FilterBar.jsx`
- Create: `agendas/df26/src/components/OfflineBanner.jsx`
- Create: `agendas/df26/src/components/Toast.jsx`
- Create: `agendas/df26/src/components/InstallHint.jsx`

**Interfaces:**
- `Header` props: `{ onOfflineTap: () => void }`
- `FilterBar` props: `{ activeFilter: string, onFilterChange: (v: string) => void }`
- `OfflineBanner` props: none
- `Toast` props: `{ message: string, visible: boolean }`
- `InstallHint` props: none

- [ ] **Step 1: Write src/components/Header.jsx**

Row 1: Salesforce logo left, right side empty. Row 2: title. Row 3: instructions. Row 4: omitted. Row 5: hero image (null-safe placeholder).

```jsx
import { agendaTitle, instructions, heroImage } from '../config.js'
import salesforceLogo from '../assets/salesforce-logo.svg'

export default function Header() {
  return (
    <header className="w-full bg-white border-b-2" style={{ borderColor: '#032D60' }}>
      <div className="px-4 py-3 space-y-3">

        {/* Row 1 — Salesforce logo only; right side intentionally empty */}
        <div className="flex items-center justify-between">
          <img src={salesforceLogo} alt="Salesforce" className="h-7 w-auto" />
          <div />
        </div>

        {/* Row 2 — Agenda title */}
        <p className="text-center font-bold text-lg" style={{ color: '#032D60' }}>
          {agendaTitle}
        </p>

        {/* Row 3 — Instructions */}
        <p className="text-sm" style={{ color: '#6B7280' }}>
          {instructions}
        </p>

      </div>

      {/* Row 5 — Hero image */}
      {heroImage ? (
        <img
          src={heroImage}
          alt="Dreamforce 2026"
          className="w-full object-cover"
          style={{ height: 120 }}
        />
      ) : (
        <div
          className="w-full flex items-center justify-center"
          style={{ height: 120, background: '#E5E7EB' }}
        >
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>Dreamforce 2026</span>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Write src/components/FilterBar.jsx**

Seven tabs. "Interested" is the favorites tab (replaces "My Schedule").

```jsx
const FILTERS = [
  { value: 'all',               label: 'All' },
  { value: 'unified-data',      label: 'Unified Data' },
  { value: 'agentforce-mktg',  label: 'Agentforce Mktg' },
  { value: 'ai-journeys',      label: 'AI Journeys' },
  { value: 'media-attribution', label: 'Media & Attribution' },
  { value: 'efficiency',        label: 'Efficiency' },
  { value: 'interested',        label: '★ Interested' },
]

export default function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <nav
      className="w-full bg-white border-b border-gray-200"
      style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
    >
      <div className="flex">
        {FILTERS.map((f) => {
          const active = f.value === activeFilter
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => onFilterChange(f.value)}
              className="px-4 text-sm font-medium"
              style={{
                minHeight: 44,
                color: active ? '#032D60' : '#6B7280',
                borderBottom: active ? '2px solid #032D60' : '2px solid transparent',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
```

- [ ] **Step 3: Write src/components/OfflineBanner.jsx**

Verbatim from original.

```jsx
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'

export default function OfflineBanner() {
  const isOnline = useOnlineStatus()
  if (isOnline) return null
  return (
    <div
      className="w-full text-xs text-center py-1.5 px-4"
      style={{
        background: '#FFFBEB',
        borderBottom: '1px solid #FDE68A',
        color: '#92400E',
      }}
    >
      You are offline — schedule is available, some features are disabled
    </div>
  )
}
```

- [ ] **Step 4: Write src/components/Toast.jsx**

Verbatim from original.

```jsx
export default function Toast({ message, visible }) {
  if (!visible) return null
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm rounded-full px-4 py-2 z-50 pointer-events-none"
      style={{ bottom: 80 }}
    >
      {message}
    </div>
  )
}
```

- [ ] **Step 5: Write src/components/InstallHint.jsx**

Updated copy (English). localStorage key changed to `df26-install-hint-dismissed`.

```jsx
import { useState } from 'react'

const STORAGE_KEY = 'df26-install-hint-dismissed'

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    navigator.standalone === true
  )
}

export default function InstallHint() {
  const [dismissed, setDismissed] = useState(() => {
    if (isStandalone()) return true
    try { return localStorage.getItem(STORAGE_KEY) === '1' } catch { return false }
  })

  if (dismissed) return null

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* ignore */ }
    setDismissed(true)
  }

  return (
    <div
      className="w-full flex items-start justify-between gap-2 px-4 py-2 text-xs"
      style={{
        background: '#EFF6FF',
        borderBottom: '1px solid #BFDBFE',
        color: '#032D60',
      }}
    >
      <span>
        Add to your home screen for quick access offline. Tap Share (iPhone) or ⋮ (Android) and then "Add to Home Screen".
      </span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close"
        style={{
          flexShrink: 0,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: 18,
          lineHeight: 1,
          color: '#032D60',
          padding: '0 2px',
        }}
      >
        ×
      </button>
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add agendas/df26/src/components/Header.jsx agendas/df26/src/components/FilterBar.jsx agendas/df26/src/components/OfflineBanner.jsx agendas/df26/src/components/Toast.jsx agendas/df26/src/components/InstallHint.jsx
git commit -m "scaffold: df26 Header, FilterBar, OfflineBanner, Toast, InstallHint"
```

---

### Task 5: Components — EventCard and EventDetail

**Files:**
- Create: `agendas/df26/src/components/EventCard.jsx`
- Create: `agendas/df26/src/components/EventDetail.jsx`

**Interfaces:**
- `EventCard` props: `{ event: object, isFavorited: boolean, onToggleFavorite: (id: string) => void, onSelect: (event: object) => void }`
- `EventDetail` props: `{ event: object, isFavorited: boolean, onToggleFavorite: (id: string) => void, onClose: () => void }`

- [ ] **Step 1: Write src/components/EventCard.jsx**

Changes from original: no time row; `type` subtitle row added below title; `CATEGORY_LABELS` map for 5 new categories; fallback to empty object if category not found.

```jsx
import { categoryColors, labelText } from '../config.js'

const CATEGORY_LABELS = {
  "unified-data":       "Unified Customer Data",
  "agentforce-mktg":   "Agentforce Marketing",
  "ai-journeys":       "AI Journeys",
  "media-attribution": "Media & Attribution",
  "efficiency":        "Operational Efficiency",
}

export default function EventCard({ event, isFavorited, onToggleFavorite, onSelect }) {
  const { accent, tint } = categoryColors[event.eventCategory] || { accent: null, tint: '#ffffff' }
  const label = CATEGORY_LABELS[event.eventCategory] || null

  function handleStarClick(e) {
    e.stopPropagation()
    onToggleFavorite(event.id)
  }

  return (
    <div
      onClick={() => onSelect(event)}
      className="relative rounded-lg shadow-sm mb-2 px-4 py-3 cursor-pointer"
      style={{
        background: tint,
        borderLeft: accent ? `4px solid ${accent}` : undefined,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.97)' }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = '' }}
    >
      {/* Star — top-right */}
      <button
        type="button"
        onClick={handleStarClick}
        aria-label={isFavorited ? 'Remove from Interested' : 'Add to Interested'}
        className="absolute top-2 right-2 flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: 22,
          lineHeight: 1,
          color: isFavorited ? '#0176D3' : '#9CA3AF',
        }}
      >
        {isFavorited ? '★' : '☆'}
      </button>

      {/* Title */}
      <div className="pr-10 font-semibold" style={{ color: '#032D60' }}>
        {event.title}
      </div>

      {/* Category label */}
      {label && (
        <div className="text-xs mt-0.5" style={{ color: labelText, opacity: 0.75 }}>
          {label}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Write src/components/EventDetail.jsx**

Changes from original: date/time/location block replaced with venue string; no `toUtcComponents`; no calendar buttons; no location block; no mapsUrl; category labels updated for 5 categories.

```jsx
import { categoryColors, labelText } from '../config.js'

const CATEGORY_LABELS = {
  "unified-data":       "Unified Customer Data",
  "agentforce-mktg":   "Agentforce Marketing",
  "ai-journeys":       "AI Journeys",
  "media-attribution": "Media & Attribution",
  "efficiency":        "Operational Efficiency",
}

export default function EventDetail({ event, isFavorited, onToggleFavorite, onClose }) {
  const { accent, tint } = categoryColors[event.eventCategory] || { accent: null, tint: '#ffffff' }
  const label = CATEGORY_LABELS[event.eventCategory] || 'Session'

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.4)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full rounded-t-2xl overflow-y-auto"
        style={{ maxHeight: '90vh' }}
      >
        <div className="relative p-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-2 right-2 flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: 28,
              lineHeight: 1,
              color: '#6B7280',
            }}
          >
            ×
          </button>

          {/* Title + star */}
          <div className="flex items-start justify-between pr-10 gap-3">
            <h2 className="flex-1 text-xl font-bold m-0" style={{ color: '#032D60' }}>
              {event.title}
            </h2>
            <button
              type="button"
              onClick={() => onToggleFavorite(event.id)}
              aria-label={isFavorited ? 'Remove from Interested' : 'Add to Interested'}
              className="flex items-center justify-center shrink-0"
              style={{
                width: 44,
                height: 44,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 26,
                lineHeight: 1,
                color: isFavorited ? '#0176D3' : '#9CA3AF',
              }}
            >
              {isFavorited ? '★' : '☆'}
            </button>
          </div>

          {/* Category badge */}
          <div className="mt-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                color: labelText,
                background: tint,
                border: accent ? `1px solid ${accent}` : '1px solid #D1D5DB',
              }}
            >
              {label}
            </span>
          </div>

          {/* Venue string — replaces date/time/location row */}
          <div className="mt-3 text-sm" style={{ color: '#6B7280' }}>
            Dreamforce 2026 · Sep 15–17 · San Francisco
          </div>

          {/* Optional metadata */}
          <div className="mt-4 text-sm" style={{ color: '#374151' }}>
            {event.type && (
              <div className="mb-2">
                <span className="font-semibold">Track: </span>
                <span>{event.type}</span>
              </div>
            )}
            {event.topic && (
              <div className="mb-2">
                <span className="font-semibold">Topic: </span>
                <span>{event.topic}</span>
              </div>
            )}
          </div>

          {/* Summary */}
          {event.summary && (
            <div
              className="mt-3 text-sm leading-relaxed"
              style={{ color: '#374151' }}
              dangerouslySetInnerHTML={{ __html: event.summary }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add agendas/df26/src/components/EventCard.jsx agendas/df26/src/components/EventDetail.jsx
git commit -m "scaffold: df26 EventCard and EventDetail — no dates, venue string, no cal export"
```

---

### Task 6: App.jsx — flat list, new filter logic, wired components

**Files:**
- Create: `agendas/df26/src/App.jsx`

**Interfaces:**
- Consumes: all components and hooks defined in Tasks 2–5
- Produces: root application component

- [ ] **Step 1: Write src/App.jsx**

No `groupByDate`. No `WhatsAppButton`. Filter cases match the 7 FilterBar values. Flat `filteredEvents.map()` renders cards directly.

```jsx
import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import FilterBar from './components/FilterBar.jsx'
import EventCard from './components/EventCard.jsx'
import EventDetail from './components/EventDetail.jsx'
import OfflineBanner from './components/OfflineBanner.jsx'
import InstallHint from './components/InstallHint.jsx'
import Toast from './components/Toast.jsx'
import { events } from './data/events.js'
import { useFavorites } from './hooks/useFavorites.js'

function applyFilter(allEvents, filter, favorites) {
  switch (filter) {
    case 'unified-data':
    case 'agentforce-mktg':
    case 'ai-journeys':
    case 'media-attribution':
    case 'efficiency':
      return allEvents.filter((e) => e.eventCategory === filter)
    case 'interested':
      return allEvents.filter((e) => favorites.has(e.id))
    case 'all':
    default:
      return allEvents
  }
}

export default function App() {
  const [filter, setFilter] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [favorites, toggleFavorite] = useFavorites()
  const [toastVisible, setToastVisible] = useState(false)

  const filteredEvents = useMemo(
    () => applyFilter(events, filter, favorites),
    [filter, favorites]
  )

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedEvent])

  function showOfflineToast() {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  return (
    <>
      <Header />
      <InstallHint />
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />
      <OfflineBanner />

      <main className="px-3 py-4" style={{ background: '#F9FAFB', minHeight: '50vh' }}>
        {filteredEvents.length === 0 ? (
          <p className="text-center text-sm py-12" style={{ color: '#9CA3AF' }}>
            No sessions to show.
          </p>
        ) : (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isFavorited={favorites.has(event.id)}
              onToggleFavorite={toggleFavorite}
              onSelect={setSelectedEvent}
            />
          ))
        )}
      </main>

      {selectedEvent && (
        <EventDetail
          event={selectedEvent}
          isFavorited={favorites.has(selectedEvent.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <Toast message="Requires internet connection" visible={toastVisible} />
    </>
  )
}
```

- [ ] **Step 2: Verify dev server starts without errors**

```bash
cd agendas/df26 && npm run dev
```

Expected: Vite dev server starts on http://localhost:5173 (or next available port). No compilation errors in terminal. Browser shows all 30 sessions under "All" tab. Category filter tabs work. Star toggle persists on reload. No WhatsApp button. No contacts row. No dates or times on cards. Venue string visible in detail sheet.

- [ ] **Step 3: Commit**

```bash
git add agendas/df26/src/App.jsx
git commit -m "scaffold: df26 App.jsx — flat list, 7-tab filter, no WhatsApp button"
```

---

### Task 7: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy-df26.yml`

**Interfaces:**
- Produces: CI workflow that builds `agendas/df26/` and publishes to `gh-pages-df26`

- [ ] **Step 1: Write .github/workflows/deploy-df26.yml**

```yaml
name: Deploy DF26 to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: agendas/df26
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
          cache-dependency-path: agendas/df26/package-lock.json

      - run: npm ci

      - run: npm run build

      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./agendas/df26/dist
          publish_branch: gh-pages-df26
          cname: df26.agendas.terencereis.com.br
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy-df26.yml
git commit -m "ci: add deploy-df26 workflow targeting gh-pages-df26 branch"
```

---

## Hero image handoff note

`config.js` ships with `heroImage = null`. When you have the hero asset:

1. Drop `hero.png` into `agendas/df26/src/assets/`
2. In `agendas/df26/src/config.js`, uncomment the import line and change `heroImage = null` to `heroImage = heroImg`
3. Then run `npm run build`
