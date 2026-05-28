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
