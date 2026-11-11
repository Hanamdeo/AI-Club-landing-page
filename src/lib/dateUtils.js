/**
 * dateUtils.js
 * Comprehensive date parsing, formatting, and calculation utilities.
 * Anchored to Asia/Kolkata (IST: UTC+5:30) calendar days to avoid timezone shifts.
 */

/**
 * Returns the current Date object
 */
export function getNow() {
  return new Date();
}

/**
 * Parse YYYY-MM-DD or ISO date string into an IST end-of-day Date object
 * @param {string} dateStr 
 */
export function getEndOfDayIST(dateStr) {
  if (!dateStr) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split('-').map(Number);
    // 23:59:59.999 IST = 18:29:59.999 UTC
    return new Date(Date.UTC(year, month - 1, day, 18, 29, 59, 999));
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Check if an event or date is in the future or currently running
 * @param {string} dateStr - Start date (YYYY-MM-DD)
 * @param {string} [endDateStr] - Optional end date (YYYY-MM-DD) for multi-day events
 */
export function isUpcoming(dateStr, endDateStr) {
  const targetEnd = getEndOfDayIST(endDateStr || dateStr);
  if (!targetEnd) return false;
  return targetEnd.getTime() >= getNow().getTime();
}

/**
 * Check if an event or date is completely concluded
 * @param {string} dateStr - Start date (YYYY-MM-DD)
 * @param {string} [endDateStr] - Optional end date (YYYY-MM-DD) for multi-day events
 */
export function isPast(dateStr, endDateStr) {
  const targetEnd = getEndOfDayIST(endDateStr || dateStr);
  if (!targetEnd) return false;
  return targetEnd.getTime() < getNow().getTime();
}

/**
 * Format a calendar date string into a consistent editorial string in Asia/Kolkata
 * e.g., "15 Nov 2026" or "15 November 2026"
 */
export function formatDate(dateStr, format = 'medium') {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthsLong = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    if (format === 'short') return `${day} ${monthsShort[month - 1]}`;
    if (format === 'full') return `${day} ${monthsLong[month - 1]} ${year}`;
    return `${day} ${monthsShort[month - 1]} ${year}`;
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: format === 'full' ? 'long' : 'short',
    year: format === 'short' ? undefined : 'numeric',
  }).format(date);
}

/**
 * Format a multi-day event range, e.g., "15–17 Nov 2026"
 */
export function formatEventDateRange(startDateStr, endDateStr) {
  if (!startDateStr) return '';
  if (!endDateStr || startDateStr === endDateStr) return formatDate(startDateStr);

  if (/^\d{4}-\d{2}-\d{2}$/.test(startDateStr) && /^\d{4}-\d{2}-\d{2}$/.test(endDateStr)) {
    const [sYear, sMonth, sDay] = startDateStr.split('-').map(Number);
    const [eYear, eMonth, eDay] = endDateStr.split('-').map(Number);
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (sYear === eYear && sMonth === eMonth) {
      return `${sDay}–${eDay} ${monthsShort[sMonth - 1]} ${sYear}`;
    }
  }

  return `${formatDate(startDateStr)} – ${formatDate(endDateStr)}`;
}

/**
 * Calculate human-friendly time remaining or elapsed
 */
export function getRelativeTimeString(dateStr, endDateStr) {
  if (!dateStr) return '';
  const target = getEndOfDayIST(endDateStr || dateStr);
  if (!target) return '';

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
