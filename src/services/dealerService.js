/**
 * Dealer Data Service Layer
 * Supports single-dealer (v1) and automatic multi-dealer (5 dealers) expansion.
 */

import { DEALERS } from '../data/dealers.js';
import { PROPERTIES } from '../data/properties.js';

const SIMULATED_DELAY_MS = 0;

function delay(ms = SIMULATED_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get authorized dealers with computed listing counts
 * @param {Object} [options]
 * @param {boolean} [options.includeInactive=false]
 * @returns {Promise<Array>}
 */
export async function getDealers({ includeInactive = false } = {}) {
  await delay();

  const activePool = includeInactive ? DEALERS : DEALERS.filter((d) => d.isActive);

  return activePool.map((dealer) => {
    const listingCount = PROPERTIES.filter(
      (p) => p.dealerId === dealer.id && p.status === 'available'
    ).length;
    return {
      ...dealer,
      totalListings: listingCount,
    };
  });
}

/**
 * Get dealer by slug or id
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getDealerBySlug(slug) {
  await delay();
  if (!slug) return null;
  const dealer = DEALERS.find((d) => d.slug === slug || d.id === slug);
  if (!dealer) return null;

  const listingCount = PROPERTIES.filter(
    (p) => p.dealerId === dealer.id && p.status === 'available'
  ).length;
  return {
    ...dealer,
    totalListings: listingCount,
  };
}

/**
 * Get dealer by ID directly (used by PropertyCard and details)
 * Synchronous or fast fallback for immediate rendering
 * @param {string} dealerId
 * @returns {Object}
 */
export function getDealerByIdSync(dealerId) {
  const match = DEALERS.find((d) => d.id === dealerId);
  return match || DEALERS[0]; // fallback to Irfan Umri
}
