/** Parse a string into a finite number, or return null if it isn't one. */
export function toFiniteNumber(value) {
  if (value === "" || value === null || value === undefined) return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

/** Round to a fixed number of decimals, trimming trailing zeros for display. */
export function formatNumber(value, decimals = 2) {
  if (!Number.isFinite(value)) return "—";
  const rounded = Number(value.toFixed(decimals));
  return rounded.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

let idCounter = 0;
export function uid(prefix = "id") {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}
