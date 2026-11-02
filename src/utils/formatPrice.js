/**
 * Price formatting utilities following Pakistani real estate standards (Lakh & Crore)
 */

/**
 * Format a number into standard Pakistani comma grouped string
 * Format: 1,25,00,000 (last 3 digits, then pairs of 2 digits)
 * @param {number|string} amount
 * @returns {string}
 */
export function formatPriceFull(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return 'PKR 0';
  const num = Math.round(Number(amount));
  const str = num.toString();

  if (str.length <= 3) {
    return `PKR ${str}`;
  }

  const lastThree = str.substring(str.length - 3);
  const otherNumbers = str.substring(0, str.length - 3);
  const withCommas = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');

  return `PKR ${withCommas},${lastThree}`;
}

/**
 * Formats price into human-friendly Lakh / Crore strings
 * Examples:
 *  12,500,000 -> "PKR 1.25 Crore"
 *  4,500,000  -> "PKR 45 Lakh"
 *  85,000     -> "PKR 85,000"
 *  Rent (35,000, { isRent: true }) -> "PKR 35,000 / month"
 *
 * @param {number} amount
 * @param {Object} [options]
 * @param {boolean} [options.isRent=false]
 * @param {boolean} [options.hidePrefix=false]
 * @returns {string}
 */
export function formatPrice(amount, { isRent = false, hidePrefix = false } = {}) {
  if (amount === null || amount === undefined || isNaN(amount)) return 'PKR 0';
  const num = Number(amount);
  const prefix = hidePrefix ? '' : 'PKR ';

  // If rent, display monthly rate
  if (isRent) {
    if (num >= 10000000) {
      const croreVal = (num / 10000000)
        .toFixed(2)
        .replace(/\.00$/, '')
        .replace(/(\.[1-9])0$/, '$1');
      return `${prefix}${croreVal} Crore / month`;
    }
    if (num >= 100000) {
      const lakhVal = (num / 100000)
        .toFixed(2)
        .replace(/\.00$/, '')
        .replace(/(\.[1-9])0$/, '$1');
      return `${prefix}${lakhVal} Lakh / month`;
    }
    return `${prefix}${num.toLocaleString('en-US')} / month`;
  }

  // Sale pricing
  if (num >= 10000000) {
    const croreVal = (num / 10000000)
      .toFixed(2)
      .replace(/\.00$/, '')
      .replace(/(\.[1-9])0$/, '$1');
    return `${prefix}${croreVal} Crore`;
  }

  if (num >= 100000) {
    const lakhVal = (num / 100000)
      .toFixed(2)
      .replace(/\.00$/, '')
      .replace(/(\.[1-9])0$/, '$1');
    return `${prefix}${lakhVal} Lakh`;
  }

  return `${prefix}${num.toLocaleString('en-US')}`;
}
