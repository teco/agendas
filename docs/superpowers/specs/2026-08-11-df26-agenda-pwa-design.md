# Design: Dreamforce 2026 Agenda PWA (`agendas/df26/`)

**Date:** 2026-08-11  
**Status:** Approved

---

## Overview

A mobile-first PWA at `df26.agendas.terencereis.com.br` serving as a pre-event planning tool for Dreamforce 2026 (Sep 15–17, San Francisco). Built as a self-contained instance of the Connections 2026 template, scaffolded at `agendas/df26/`. No files outside that subfolder are modified.

---

## Structure

`agendas/df26/` is an independent Vite project with its own `package.json`, `vite.config.js`, `index.html`, `public/`, and `src/`.

```
agendas/df26/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── public/
│   ├── .nojekyll
│   ├── CNAME                      ← df26.agendas.terencereis.com.br
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
└── src/
    ├── main.jsx
    ├── index.css
    ├── config.js
    ├── App.jsx
    ├── assets/
    │   ├── salesforce-logo.svg
    │   └── hero.png               ← placeholder; dropped in before first build
    ├── components/
    │   ├── Header.jsx
    │   ├── FilterBar.jsx
    │   ├── EventCard.jsx
    │   ├── EventDetail.jsx
    │   ├── OfflineBanner.jsx
    │   ├── InstallHint.jsx
    │   └── Toast.jsx
    ├── data/
    │   └── events.js
    ├── hooks/
    │   ├── useFavorites.js
    │   └── useOnlineStatus.js
    └── utils/
        └── date.js
```

---

## Component changes from Connections 2026

| File | Change |
|------|--------|
| `config.js` | 5 new category colors; new title/instructions; `heroImage = null` until asset provided |
| `App.jsx` | Remove `groupByDate` + date-header render; flat list. New filter cases. Remove `WhatsAppButton` |
| `FilterBar.jsx` | New FILTERS: All, Unified Data, Agentforce Mktg, AI Journeys, Media & Attribution, Efficiency, Interested |
| `EventCard.jsx` | Remove time row. Add `type` subtitle. New `CATEGORY_LABELS` for 5 categories |
| `EventDetail.jsx` | Replace date/time/location block with venue string "Dreamforce 2026 · Sep 15–17 · San Francisco". Remove calendar export buttons. Remove `toUtcComponents`. Remove location block |
| `Header.jsx` | Remove right logo slot. Remove contacts row (Row 4) |
| `InstallHint.jsx` | Update copy. Change localStorage key to `df26-install-hint-dismissed` |
| `useFavorites.js` | Change `STORAGE_KEY` to `'df26-favorites'` |
| `index.html` | Updated title and theme-color (`#032D60`) |
| `vite.config.js` | Updated manifest; `base: '/'` |

---

## Filter tabs

| Tab label | eventCategory filter |
|-----------|---------------------|
| All | all |
| Unified Data | `unified-data` |
| Agentforce Mktg | `agentforce-mktg` |
| AI Journeys | `ai-journeys` |
| Media & Attribution | `media-attribution` |
| Efficiency | `efficiency` |
| Interested | favorites Set |

---

## Category colors

| eventCategory | Accent | Tint | Label |
|---------------|--------|------|-------|
| `unified-data` | `#0176D3` | `#EBF5FB` | `#032D60` |
| `agentforce-mktg` | `#6B40C4` | `#F4F0FB` | `#032D60` |
| `ai-journeys` | `#0B827C` | `#E8F7F6` | `#032D60` |
| `media-attribution` | `#DD7A01` | `#FDF3E3` | `#032D60` |
| `efficiency` | `#2E844A` | `#EBF5EE` | `#032D60` |

---

## GitHub Actions deploy

New file: `.github/workflows/deploy-df26.yml`  
- Trigger: push to `main`  
- Working directory: `agendas/df26`  
- Publishes `agendas/df26/dist` to **`gh-pages-df26`** branch  
- CNAME: `df26.agendas.terencereis.com.br`  
- No conflict with existing `deploy.yml` (which targets `gh-pages`)

---

## What is NOT in scope

- No icon generation (existing icons reused — neutral)
- No changes to files outside `agendas/df26/`
- `hero.png` not bundled; `config.js` ships with `heroImage = null`
