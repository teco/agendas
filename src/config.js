// src/config.js
// All customer-facing text, contact info, and brand colors live here.
// Edit this file to update copy, contacts, or colors. Never put these values in components.
import heroImg from './assets/hero.png'

export const agendaTitle = "Inter @ Salesforce Connections 2026";
export const clientName = "Inter";

// Paragraph displayed in the app header. Rendered verbatim — no HTML.
export const instructions =
  "Tap any session to read details. Star events to save them to My Schedule. Tap a name below to message the account team.";

// Persistent floating WhatsApp button — generic team inbox.
// Phone in international format, no spaces, no symbols, no leading +.
export const whatsappNumber = "5511934079641";

// Header contact row — three named team members, each opens a personalized wa.me link.
// Phone in international format, no spaces, no symbols, no leading +.
export const teamContacts = [
  { name: "Terence Reis",    phone: "5511934079641" },
  { name: "Fabiana Maniero", phone: "5511930227247" },
  { name: "Léo Boaventura",  phone: "5511989214117" },
];

// Hero image displayed in the header between the contact row and the event list.
// Vite import ensures the asset is bundled and precached by the service worker.
export const heroImage = heroImg;

// Brand color tokens. Also mirrored as CSS custom properties in index.css.
export const colors = {
  salesforceBlue:  "#00A1E0",
  neutralDark:     "#032D60",
  white:           "#FFFFFF",
};

// Per-category color tokens matching the PDF agenda palette.
// accent: left-border color on cards and badge border in detail modal.
// tint:   card background fill.
// Labels must be rendered in dark text (#032D60) — accent colors fail WCAG AA on their tints.
export const categoryColors = {
  suggested: { accent: null,      tint: '#ffffff' },
  also:      { accent: '#19a7b3', tint: '#f0fbfc' },  // teal
  oneOnOne:  { accent: '#ff9200', tint: '#fff8ec' },  // amber
  social:    { accent: '#8a4fd3', tint: '#f7f2fd' },  // purple
};
