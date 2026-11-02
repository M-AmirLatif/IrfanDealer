/**
 * Property Data Service Layer
 * Simulates async network requests reading from static data.
 *
 * NOTE FOR BACKEND INTEGRATION:
 * When migrating to a real REST API or TanStack Query:
 * 1. Replace the simulateDelay() and in-memory filter calls with:
 *    `const res = await fetch(`${API_BASE}/properties?...`); return await res.json();`
 * 2. Keep the function signatures identical so components require zero changes.
 */

import { PROPERTIES } from '../data/properties.js';
import { filterProperties } from '../utils/filterProperties.js';
import { sortProperties } from '../utils/sortProperties.js';

const SIMULATED_DELAY_MS = 0;

function delay(ms = SIMULATED_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch filtered, sorted, paginated properties
 * @param {Object} [params]
 * @param {Object} [params.filters]
 * @param {string} [params.sort='newest']
 * @param {number} [params.page=1]
 * @param {number} [params.pageSize=12]
 * @returns {Promise<{ items: Array, total: number, page: number, pageSize: number, totalPages: number }>}
 */
export async function getProperties({
  filters = {},
  sort = 'newest',
  page = 1,
  pageSize = 12,
} = {}) {
  await delay();

  // 1. Filter
  const filtered = filterProperties(PROPERTIES, filters);

  // 2. Sort
  const sorted = sortProperties(filtered, sort);

  // 3. Paginate
  const total = sorted.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const startIndex = (page - 1) * pageSize;
  const items = sorted.slice(startIndex, startIndex + pageSize);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * Get single property by URL slug
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getPropertyBySlug(slug) {
  await delay();
  if (!slug) return null;
  const match = PROPERTIES.find((p) => p.slug === slug || p.id === slug);
  return match || null;
}

/**
 * Get featured properties for homepage
 * @param {number} [limit=6]
 * @returns {Promise<Array>}
 */
export async function getFeaturedProperties(limit = 6) {
  await delay();
  const featured = PROPERTIES.filter((p) => p.isFeatured && p.status === 'available');
  return featured.slice(0, limit);
}

/**
 * Get latest properties
 * @param {number} [limit=6]
 * @returns {Promise<Array>}
 */
export async function getLatestProperties(limit = 6) {
  await delay();
  const available = PROPERTIES.filter((p) => p.status === 'available');
  const sorted = sortProperties(available, 'newest');
  return sorted.slice(0, limit);
}

/**
 * Get similar properties (same area, or same propertyType + listingType)
 * @param {Object} currentProperty
 * @param {number} [limit=4]
 * @returns {Promise<Array>}
 */
export async function getSimilarProperties(currentProperty, limit = 4) {
  await delay();
  if (!currentProperty) return [];

  const candidates = PROPERTIES.filter(
    (p) => p.id !== currentProperty.id && p.status === 'available'
  );

  // Match priority: same area and same listing type > same property type
  const scored = candidates.map((item) => {
    let score = 0;
    if (item.areaId === currentProperty.areaId) score += 3;
    if (item.listingType === currentProperty.listingType) score += 2;
    if (item.propertyType === currentProperty.propertyType) score += 2;
    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}

/**
 * Get properties handled by a specific dealer
 * @param {string} dealerId
 * @param {Object} [params]
 * @returns {Promise<{ items: Array, total: number }>}
 */
export async function getPropertiesByDealer(dealerId, params = {}) {
  await delay();
  const dealerProps = PROPERTIES.filter((p) => p.dealerId === dealerId && p.status === 'available');
  return {
    items: dealerProps,
    total: dealerProps.length,
  };
}

/**
 * Get properties located in a specific area
 * @param {string} areaSlug
 * @param {Object} [params]
 * @returns {Promise<{ items: Array, total: number, forSale: number, forRent: number }>}
 */
export async function getPropertiesByArea(areaSlug, params = {}) {
  await delay();
  const areaProps = PROPERTIES.filter((p) => p.areaId === areaSlug);
  const forSale = areaProps.filter((p) => p.listingType === 'sale').length;
  const forRent = areaProps.filter((p) => p.listingType === 'rent').length;

  return {
    items: areaProps,
    total: areaProps.length,
    forSale,
    forRent,
  };
}
