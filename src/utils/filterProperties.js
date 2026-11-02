/**
 * Pure filtering logic for property listings
 * Used both client-side and ready for direct server-side translation.
 */

/**
 * Filters array of properties matching criteria using AND logic
 * @param {Array} properties
 * @param {Object} filters
 * @returns {Array}
 */
export function filterProperties(properties, filters = {}) {
  if (!Array.isArray(properties)) return [];

  return properties.filter((prop) => {
    // 1. Listing Type (sale | rent | all)
    if (filters.listingType && filters.listingType !== 'all') {
      if (prop.listingType !== filters.listingType) return false;
    }

    // 2. Keyword Search (title, code, address, area, description)
    if (filters.keyword && filters.keyword.trim() !== '') {
      const q = filters.keyword.toLowerCase().trim();
      const codeMatch = prop.code ? prop.code.toLowerCase().includes(q) : false;
      const titleMatch = prop.title ? prop.title.toLowerCase().includes(q) : false;
      const addressMatch = prop.address ? prop.address.toLowerCase().includes(q) : false;
      const descMatch = prop.description ? prop.description.toLowerCase().includes(q) : false;
      const areaMatch = prop.areaId ? prop.areaId.toLowerCase().includes(q) : false;

      if (!codeMatch && !titleMatch && !addressMatch && !descMatch && !areaMatch) {
        return false;
      }
    }

    // 3. Area filtering (array or single string)
    if (filters.area) {
      const selectedAreas = Array.isArray(filters.area)
        ? filters.area
        : filters.area.split(',').filter(Boolean);

      if (selectedAreas.length > 0 && !selectedAreas.includes('all')) {
        if (!selectedAreas.includes(prop.areaId)) return false;
      }
    }

    // 4. Property Type (array or single string)
    if (filters.type) {
      const selectedTypes = Array.isArray(filters.type)
        ? filters.type
        : filters.type.split(',').filter(Boolean);

      if (selectedTypes.length > 0 && !selectedTypes.includes('all')) {
        if (!selectedTypes.includes(prop.propertyType)) return false;
      }
    }

    // 5. Price Range (PKR)
    if (filters.minPrice !== undefined && filters.minPrice !== null && filters.minPrice !== '') {
      const minP = Number(filters.minPrice);
      if (!isNaN(minP) && minP > 0) {
        if (prop.price < minP) return false;
      }
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice !== '') {
      const maxP = Number(filters.maxPrice);
      if (!isNaN(maxP) && maxP > 0) {
        if (prop.price > maxP) return false;
      }
    }

    // 6. Bedrooms
    if (
      filters.beds !== undefined &&
      filters.beds !== null &&
      filters.beds !== 'any' &&
      filters.beds !== ''
    ) {
      const minBeds = Number(filters.beds);
      if (!isNaN(minBeds) && minBeds > 0) {
        if (!prop.bedrooms || prop.bedrooms < minBeds) return false;
      }
    }

    // 7. Bathrooms
    if (
      filters.baths !== undefined &&
      filters.baths !== null &&
      filters.baths !== 'any' &&
      filters.baths !== ''
    ) {
      const minBaths = Number(filters.baths);
      if (!isNaN(minBaths) && minBaths > 0) {
        if (!prop.bathrooms || prop.bathrooms < minBaths) return false;
      }
    }

    // 8. Size in sqft (minSqft / maxSqft normalized)
    if (filters.minSqft !== undefined && filters.minSqft !== null && filters.minSqft !== '') {
      const minS = Number(filters.minSqft);
      if (!isNaN(minS) && minS > 0) {
        if (!prop.size || prop.size.areaSqft < minS) return false;
      }
    }
    if (filters.maxSqft !== undefined && filters.maxSqft !== null && filters.maxSqft !== '') {
      const maxS = Number(filters.maxSqft);
      if (!isNaN(maxS) && maxS > 0) {
        if (!prop.size || prop.size.areaSqft > maxS) return false;
      }
    }

    // 9. Extra toggles
    if (filters.featuredOnly === true || filters.featuredOnly === 'true') {
      if (!prop.isFeatured) return false;
    }
    if (filters.hasVideo === true || filters.hasVideo === 'true') {
      if (!prop.video) return false;
    }
    if (filters.furnished === true || filters.furnished === 'true') {
      if (prop.furnishing !== 'furnished') return false;
    }

    // 10. Status check (by default, show available; or if explicitly queried)
    if (filters.includeUnavailable !== true && filters.includeUnavailable !== 'true') {
      // In listings view, hide sold/rented unless requested
      if (prop.status === 'sold' || prop.status === 'rented') return false;
    }

    return true;
  });
}
