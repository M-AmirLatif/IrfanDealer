/**
 * Land & property area conversion utilities
 * Punjab standard:
 *  1 Marla = 272.25 sq ft
 *  1 Kanal = 20 Marla = 5,445 sq ft
 *  1 Acre  = 8 Kanal = 160 Marla = 43,560 sq ft
 */

export const SQFT_PER_MARLA = 272.25;
export const MARLA_PER_KANAL = 20;
export const SQFT_PER_KANAL = SQFT_PER_MARLA * MARLA_PER_KANAL; // 5445

/**
 * Convert value between Marla, Kanal, and Sq Ft
 * @param {number} value
 * @param {'marla'|'kanal'|'sqft'} fromUnit
 * @param {'marla'|'kanal'|'sqft'} toUnit
 * @returns {number}
 */
export function convertArea(value, fromUnit, toUnit) {
  if (!value || isNaN(value)) return 0;
  const val = Number(value);
  if (fromUnit === toUnit) return val;

  // Convert to base sqft
  let sqft = 0;
  if (fromUnit === 'sqft') sqft = val;
  else if (fromUnit === 'marla') sqft = val * SQFT_PER_MARLA;
  else if (fromUnit === 'kanal') sqft = val * SQFT_PER_KANAL;

  // Convert from sqft to target unit
  if (toUnit === 'sqft') return Math.round(sqft * 100) / 100;
  if (toUnit === 'marla') return Math.round((sqft / SQFT_PER_MARLA) * 100) / 100;
  if (toUnit === 'kanal') return Math.round((sqft / SQFT_PER_KANAL) * 100) / 100;

  return val;
}

/**
 * Helper to build standard property size object
 * @param {number} value
 * @param {'marla'|'kanal'|'sqft'} unit
 * @returns {{ value: number, unit: string, areaSqft: number }}
 */
export function createSize(value, unit = 'marla') {
  let areaSqft = 0;
  if (unit === 'marla') areaSqft = value * SQFT_PER_MARLA;
  else if (unit === 'kanal') areaSqft = value * SQFT_PER_KANAL;
  else areaSqft = value;

  return {
    value,
    unit,
    areaSqft: Math.round(areaSqft * 100) / 100,
  };
}

/**
 * Human-readable size display
 * e.g., "5 Marla", "1 Kanal", "5 Marla (1,361 sq ft)"
 * @param {{ value: number, unit: string, areaSqft?: number }} size
 * @param {Object} [options]
 * @param {boolean} [options.includeSqft=false]
 * @returns {string}
 */
export function formatSize(size, { includeSqft = false } = {}) {
  if (!size || size.value === undefined) return 'N/A';
  const unitLabel =
    size.unit === 'marla'
      ? size.value === 1
        ? 'Marla'
        : 'Marla'
      : size.unit === 'kanal'
        ? size.value === 1
          ? 'Kanal'
          : 'Kanal'
        : 'Sq. Ft';

  const baseStr = `${size.value} ${unitLabel}`;
  if (includeSqft && size.areaSqft) {
    const formattedSqft = Math.round(size.areaSqft).toLocaleString('en-US');
    return `${baseStr} (${formattedSqft} sq ft)`;
  }

  return baseStr;
}
