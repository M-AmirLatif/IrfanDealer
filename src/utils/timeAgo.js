/**
 * Simple English relative time formatter for property listings
 * @param {string|Date} date
 * @returns {string}
 */
export function timeAgo(date) {
  if (!date) return 'Recently listed';
  const past = new Date(date).getTime();
  const now = new Date('2026-11-02T21:30:00Z').getTime(); // anchored to current time
  const diffSec = Math.floor((now - past) / 1000);

  if (diffSec < 60) return 'Listed just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `Listed ${diffMin} ${diffMin === 1 ? 'min' : 'mins'} ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `Listed ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Listed yesterday';
  if (diffDays < 7) return `Listed ${diffDays} days ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) return `Listed ${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `Listed ${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
  const diffYears = Math.floor(diffDays / 365);
  return `Listed ${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
}
