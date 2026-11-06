/**
 * contentHelpers.js
 * Formatting and category grouping helpers for UI cards and components.
 */

export function truncateText(text, maxLength = 140) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function filterByCategory(items, selectedCategory, categoryKey = 'category') {
  if (!selectedCategory || selectedCategory === 'All') return items;
  return items.filter((item) => item[categoryKey] === selectedCategory);
}

export function getUniqueCategories(items, categoryKey = 'category') {
  const set = new Set();
  items.forEach((item) => {
    if (item[categoryKey]) set.add(item[categoryKey]);
  });
  return ['All', ...Array.from(set)];
}

