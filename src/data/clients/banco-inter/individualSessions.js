/**
 * INDIVIDUAL SESSIONS DATA FILE — src/data/intersessions.js
 * Banco Inter — Dreamforce 2026 private sessions
 *
 * Executive meetings, customer sessions and benchmarks scheduled outside the
 * public catalog: Mini-CABs, SICs, Benchmark meetings and LATAM Lounge
 * sessions. Not in any Salesforce export, so `url` is null throughout and
 * nothing here can be verified against the catalog.
 *
 * NOTE ON DATES: this file may contain MONDAY, SEPTEMBER 14 — a day the public
 * agenda does not cover. Any component that hardcodes Sep 15-17 will drop those
 * rows.
 *
 * Same field schema as events.js, with two fixed differences:
 * - eventCategory is "oneOnOne" for meetings and "social" for lunch
 * - endTime is null when only the start time has been provided
 * - registrationRequired is always false; attendance is by invitation
 *
 * No conflict warnings or priority messages are displayed.
 *
 * EXPORT NAME IS `individualSessions` in every per-client file, so the
 * rendering component stays identical across deployments.
 */
export const individualSessions = [
  {
    "id": "ind-mon-lunch-johns-grill",
    "eventCategory": "social",
    "title": "Lunch at John’s Grill",
    "date": "2026-09-14",
    "startTime": "12:00",
    "endTime": null,
    "room": "John’s Grill, 63 Ellis St, San Francisco, CA 94102",
    "area": null,
    "type": "Lunch",
    "topic": null,
    "summary": "Historic, old-school San Francisco steakhouse renowned for its nightly live jazz, wood-paneled “power lunch” atmosphere, and its literary connection to Dashiell Hammett’s The Maltese Falcon.",
    "participants": null,
    "registrationRequired": false,
    "transitionWarning": null,
    "mapsUrl": "https://www.google.com/maps/dir/?api=1&destination=63%20Ellis%20Street%2C%20San%20Francisco%2C%20CA%2094102",
    "url": null,
    "spotifyUrl": null
  },
  // ============================================================
  // MONDAY, SEPTEMBER 14, 2026
  // ============================================================
  {
    id: "ind-mon-marketing-goals-agent-mini-cab",
    eventCategory: "oneOnOne",
    title: "Marketing Goals Agent Mini-CAB",
    date: "2026-09-14",
    startTime: "15:30",
    endTime: "16:30",
    room: "C18 · 23rd Floor · Salesforce Tower",
    area: null,
    type: "Mini-CAB",
    topic: null,
    summary: null,
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: "https://maps.google.com/?q=Salesforce+Tower,+415+Mission+St,+San+Francisco,+CA+94105",
    url: null,
    spotifyUrl: null,
  },

  // ============================================================
  // TUESDAY, SEPTEMBER 15, 2026
  // ============================================================
  {
    id: "ind-tue-sic-inter",
    eventCategory: "oneOnOne",
    title: "SIC Inter",
    date: "2026-09-15",
    startTime: "16:00",
    endTime: "16:55",
    room: "Executive Meeting Suite 094 · Upper Mezzanine, Esplanade Ballrooms · Moscone South",
    area: null,
    type: "SIC",
    topic: null,
    summary: null,
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "ind-tue-sic-inter-2",
    eventCategory: "oneOnOne",
    title: "SIC Inter",
    date: "2026-09-15",
    startTime: "17:00",
    endTime: "17:55",
    room: "LATAM Lounge 3 · The Aviary, 135 Fourth Street, Suite 4000",
    area: null,
    type: "SIC",
    topic: null,
    summary: null,
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: "https://maps.google.com/?q=The+Aviary,+135+Fourth+Street,+Suite+4000,+San+Francisco,+CA+94103",
    url: null,
    spotifyUrl: null,
  },
  {
    id: "ind-thu-salesforce-personalization-with-inter",
    eventCategory: "oneOnOne",
    title: "Salesforce Personalization with Inter",
    date: "2026-09-17",
    startTime: "12:30",
    endTime: "13:20",
    room: "LATAM Lounge · The Aviary, 135 Fourth Street, Suite 4000",
    area: null,
    type: "Customer session",
    topic: null,
    summary: null,
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: "https://maps.google.com/?q=The+Aviary,+135+Fourth+Street,+Suite+4000,+San+Francisco,+CA+94103",
    url: null,
    spotifyUrl: null,
  },
  {
    "id": "ind-tue-benchmark-meet-ifood-agents",
    "eventCategory": "oneOnOne",
    "title": "Benchmark: Meet iFood Agents",
    "date": "2026-09-15",
    "startTime": "12:30",
    "endTime": "13:30",
    "room": "Moscone Center South, Level 1, Room 101",
    "area": null,
    "type": "Benchmark",
    "topic": null,
    "summary": "<b>Product Focus:</b> Agentforce &amp; Data 360",
    "participants": "André Aparecido (Cidão), CRM Manager & Denize Leite (Pimenta), CRM Coordinator",
    "registrationRequired": false,
    "transitionWarning": null,
    "mapsUrl": "https://maps.google.com/?q=Moscone+Center+South,+San+Francisco",
    "url": null,
    "spotifyUrl": null
  },
  {
    "id": "ind-wed-benchmark-meet-agibank",
    "eventCategory": "oneOnOne",
    "title": "Benchmark: Meet Agibank",
    "date": "2026-09-16",
    "startTime": "12:00",
    "endTime": "13:00",
    "room": "Moscone Center South, Level 1, Room 101",
    "area": null,
    "type": "Benchmark",
    "topic": null,
    "summary": "Agibank's Agentforce Superagent routes to subagents for FAQs, loan status, and lead qualification — autonomously resolving 80% of loan inquiries and 30% of FAQs, while an SDR subagent qualifies and hands off high-intent leads with full context.",
    "participants": "Matheus Girardi, Chief Sales and Marketing Officer, Banco Agibank",
    "registrationRequired": false,
    "transitionWarning": null,
    "mapsUrl": "https://maps.google.com/?q=Moscone+Center+South,+San+Francisco",
    "url": null,
    "spotifyUrl": null
  },
];
