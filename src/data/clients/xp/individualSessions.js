/**
 * INDIVIDUAL SESSIONS DATA FILE — src/data/xpsessions.js
 * XP — Dreamforce 2026 private sessions
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
  // WEDNESDAY, SEPTEMBER 16, 2026
  // ============================================================
  {
    id: "ind-wed-benchmark-meet-agibank",
    eventCategory: "oneOnOne",
    title: "Benchmark: Meet Agibank",
    date: "2026-09-16",
    startTime: "12:00",
    endTime: "13:00",
    room: "Moscone Center South, Level 1, Room 101",
    area: null,
    type: "Benchmark",
    topic: null,
    summary: "Agibank's Agentforce Superagent routes to subagents for FAQs, loan status, and lead qualification — autonomously resolving 80% of loan inquiries and 30% of FAQs, while an SDR subagent qualifies and hands off high-intent leads with full context.",
    participants: "Matheus Girardi, Chief Sales and Marketing Officer, Banco Agibank",
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: "https://maps.google.com/?q=Moscone+Center+South,+San+Francisco",
    url: null,
    spotifyUrl: null,
  },
  {
    id: "ind-wed-sic-xp-investimentos",
    eventCategory: "oneOnOne",
    title: "SIC XP INVESTIMENTOS",
    date: "2026-09-16",
    startTime: "15:00",
    endTime: "15:55",
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

  // ============================================================
  // THURSDAY, SEPTEMBER 17, 2026
  // ============================================================
  {
    id: "ind-thu-benchmark-meet-sammons-financial-group",
    eventCategory: "oneOnOne",
    title: "Benchmark: Meet Sammons Financial Group",
    date: "2026-09-17",
    startTime: "09:00",
    endTime: "10:00",
    room: "Moscone Center South, Level 1, Room 101",
    area: null,
    type: "Benchmark",
    topic: null,
    summary: null,
    participants: "Andrew Walling, AVP, Capability Planning and Delivery; Aaron Witt, VP, Chief Digital & Corporate Solutions Officer",
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: "https://maps.google.com/?q=Moscone+Center+South,+San+Francisco",
    url: null,
    spotifyUrl: null,
  },
];
