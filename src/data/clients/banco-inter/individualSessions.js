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
];
