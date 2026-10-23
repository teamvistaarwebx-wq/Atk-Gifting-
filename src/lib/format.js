const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export const rupees = (n) => `₹${inr.format(n)}`;

export const pad2 = (n) => String(n).padStart(2, "0");

export function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// yyyy-mm-dd in local time, for <input type="date"> min values.
export function toDateInput(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
