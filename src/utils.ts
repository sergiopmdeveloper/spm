/**
 * Format a date
 * @param {string} date - The date to format
 * @returns {string} The formatted date string
 */
export function formatDate(date: Date): string {
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
}
