/**
 * Pure sorting logic for property listings
 * @param {Array} properties
 * @param {string} sortKey - 'newest' | 'price_asc' | 'price_desc' | 'size_desc'
 * @returns {Array}
 */
export function sortProperties(properties, sortKey = 'newest') {
  if (!Array.isArray(properties)) return [];
  const copy = [...properties];

  switch (sortKey) {
    case 'price_asc':
      return copy.sort((a, b) => (a.price || 0) - (b.price || 0));

    case 'price_desc':
      return copy.sort((a, b) => (b.price || 0) - (a.price || 0));

    case 'size_desc':
      return copy.sort(
        (a, b) => ((b.size && b.size.areaSqft) || 0) - ((a.size && a.size.areaSqft) || 0)
      );

    case 'newest':
    default:
      return copy.sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
  }
}
