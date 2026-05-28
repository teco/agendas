/**
 * EVENTS DATA FILE — src/data/events.js
 *
 * BEFORE EDITING:
 * - The `summary` field supports basic HTML (<b>, <i>, <a href="...">).
 *   Rendered with dangerouslySetInnerHTML — no <script> or <style> tags.
 * - To update events: edit this file, push to main. GitHub Actions redeploys in ~2 minutes.
 * - Do NOT rename field keys — components depend on the exact schema.
 * - Set any inapplicable optional field to null — never omit it entirely.
 * - `eventCategory` must be one of: "suggested" | "also" | "oneOnOne" | "social"
 *
 * SCHEMA (all fields required; optional fields must be null, not omitted):
 * {
 *   id: string,
 *   eventCategory: "suggested" | "also" | "oneOnOne" | "social",
 *   title: string,
 *   date: string,              // "YYYY-MM-DD"
 *   startTime: string,         // "HH:MM" 24-hour
 *   endTime: string,           // "HH:MM" 24-hour
 *   room: string|null,
 *   area: string|null,
 *   type: string|null,
 *   topic: string|null,
 *   summary: string|null,      // basic HTML allowed; render with dangerouslySetInnerHTML
 *   participants: string|null,  // oneOnOne only; null for all other categories
 *   registrationRequired: bool,
 *   transitionWarning: string|null,
 *   mapsUrl: string|null,      // null for McCormick Place main venue; deep link for off-site
 *   url: string|null,          // Salesforce Connections session page URL; null if not available
 * }
 */

export const events = [];
