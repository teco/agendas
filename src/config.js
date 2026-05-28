// src/config.js
// All customer-facing text, contact info, and brand colors live here.
// Edit this file to update copy, contacts, or colors. Never put these values in components.

export const agendaTitle = "Inter @ Salesforce Connections 2026";
export const clientName = "Inter";

// Paragraph displayed in the app header. Rendered verbatim — no HTML.
export const instructions =
  "Tap any session to read details. Star events to save them to My Schedule. Tap a name below to message the account team.";

// Persistent floating WhatsApp button — generic team inbox.
// Phone in international format, no spaces, no symbols, no leading +.
export const whatsappNumber = "15551234567";

// Header contact row — three named team members, each opens a personalized wa.me link.
// Phone in international format, no spaces, no symbols, no leading +.
export const teamContacts = [
  { name: "Alex Johnson", phone: "15551234567" },
  { name: "Maria Santos", phone: "15557654321" },
  { name: "David Park",   phone: "15559876543" },
];

// Hero image displayed in the header between the contact row and the event list.
// Set to the imported asset once you drop the file into src/assets/.
// Example: import heroImg from './assets/hero.jpg'; then set heroImage = heroImg.
// Leave as null to show the placeholder.
export const heroImage = null;

// Brand color tokens. Also mirrored as CSS custom properties in index.css.
export const colors = {
  salesforceBlue:  "#00A1E0",
  neutralDark:     "#032D60",
  white:           "#FFFFFF",
  badgeSuggested:  "#00A1E0",   // Salesforce blue
  badgeAlso:       "#5B8FA8",   // muted grey-blue — secondary weight
  badgeOneOnOne:   "#D97706",   // amber — fixed commitment
  badgeSocial:     "#7C3AED",   // purple — festive/social
};
