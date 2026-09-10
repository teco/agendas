/**
 * INDIVIDUAL SESSIONS DATA FILE — src/data/acertosessions.js
 * Acerto — Dreamforce 2026 private sessions
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
 * - eventCategory is always "oneOnOne"; these are private commitments, not
 *   catalog sessions the attendee chooses between
 * - registrationRequired is always false; attendance is by invitation
 *
 * No conflict warnings or priority messages are displayed.
 *
 * EXPORT NAME IS `individualSessions` in every per-client file, so the
 * rendering component stays identical across deployments.
 */
export const individualSessions = [
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
    id: "ind-tue-sic-acerto",
    eventCategory: "oneOnOne",
    title: "SIC Acerto",
    date: "2026-09-15",
    startTime: "16:00",
    endTime: "16:55",
    room: "LATAM Lounge 2 · The Aviary, 135 Fourth Street, Suite 4000",
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

  // ============================================================
  // THURSDAY, SEPTEMBER 17, 2026
  // ============================================================
  {
    id: "ind-thu-salesforce-personalization-with-acerto",
    eventCategory: "oneOnOne",
    title: "Salesforce Personalization with Acerto",
    date: "2026-09-17",
    startTime: "14:00",
    endTime: "14:50",
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
