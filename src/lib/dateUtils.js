/**
 * dateUtils.js
 * Comprehensive date parsing, formatting, and calculation utilities.
 * Handles comparison against current date (2026-11-04) to resolve event & discussion statuses.
 */

const REFERENCE_NOW = new Date('2026-11-04T23:15:00');

/**
 * Returns the reference or current Date object
 */
export function getNow() {
  return typeof window !== 'undefined' ? new Date() : REFERENCE_NOW;
}

/**
 * Check if a date string is in the future
 * @param {string} dateStr - ISO date string (YYYY-MM-DD or full ISO)
 */
export function isUpcoming(dateStr) {
  if (!dateStr) return false;
  const target = new Date(dateStr);
  if (isNaN(target.getTime())) return false;
  // End of the day for date-only strings
  target.setHours(23, 59, 59, 999);
  return target.getTime() >= getNow().getTime();
}

/**
 * Check if a date string is in the past
 * @param {string} dateStr
 */
export function isPast(dateStr) {
  if (!dateStr) return false;
  const target = new Date(dateStr);
  if (isNaN(target.getTime())) return false;
  target.setHours(23, 59, 59, 999);
  return target.getTime() < getNow().getTime();
}

/**
 * Format a date string into an editorial readable string
 * e.g., "Nov 14, 2026" or "14 November 2026"
 */
export function formatDate(dateStr, format = 'medium') {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const options =
    format === 'short'
      ? { month: 'short', day: 'numeric' }
      : format === 'full'
      ? { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }
      : { month: 'short', day: 'numeric', year: 'numeric' };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Calculate human-friendly time remaining or elapsed
 */
export function getRelativeTimeString(dateStr) {
  if (!dateStr) return '';
  const target = new Date(dateStr);
  if (isNaN(target.getTime())) return '';

  const now = getNow();
  const diffMs = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays > 7 && diffDays <= 30) return `In ${Math.ceil(diffDays / 7)} weeks`;
  if (diffDays < 0 && diffDays >= -1) return 'Yesterday';
  if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;

  return formatDate(dateStr);
}

