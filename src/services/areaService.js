/**
 * Area Data Service Layer
 * Computes area statistics dynamically from properties data.
 */

import { AREAS } from '../data/areas.js';
import { PROPERTIES } from '../data/properties.js';

const SIMULATED_DELAY_MS = 0;

function delay(ms = SIMULATED_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get all areas with live calculated property counts
 * @returns {Promise<Array>}
 */
export async function getAreas() {
  await delay();

  return AREAS.map((area) => {
    const areaProps = PROPERTIES.filter((p) => p.areaId === area.id && p.status === 'available');
    const saleCount = areaProps.filter((p) => p.listingType === 'sale').length;
    const rentCount = areaProps.filter((p) => p.listingType === 'rent').length;

    return {
      ...area,
      totalListings: areaProps.length,
      saleCount,
      rentCount,
    };
  });
}

/**
 * Get single area by slug
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getAreaBySlug(slug) {
  await delay();
  if (!slug) return null;
  const area = AREAS.find((a) => a.slug === slug || a.id === slug);
  if (!area) return null;

  const areaProps = PROPERTIES.filter((p) => p.areaId === area.id && p.status === 'available');
  const saleProps = areaProps.filter((p) => p.listingType === 'sale');
  const rentProps = areaProps.filter((p) => p.listingType === 'rent');

  // Compute average price per Marla for sales (if any)
  let totalMarlaPrice = 0;
  let marlaCount = 0;
  saleProps.forEach((p) => {
    if (p.size && p.size.areaSqft && p.price) {
      const marlas = p.size.areaSqft / 272.25;
      if (marlas > 0) {
        totalMarlaPrice += p.price / marlas;
        marlaCount += 1;
      }
    }
  });

  const avgPricePerMarla = marlaCount > 0 ? Math.round(totalMarlaPrice / marlaCount) : null;

  return {
    ...area,
    totalListings: areaProps.length,
    saleCount: saleProps.length,
    rentCount: rentProps.length,
    avgPricePerMarla,
  };
}
