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
export const categoryLabels = {
  "unified-data":       "Unified Customer Data",
  "agentforce-mktg":   "Agentforce Marketing",
  "ai-journeys":       "AI Journeys",
  "media-attribution": "Media & Attribution",
  "efficiency":        "Operational Efficiency",
};
