/**
 * Utilities for phone, WhatsApp, and external links
 */

/**
 * Format phone string for tel: URI
 * @param {string} phone
 * @returns {string}
 */
export function buildTelLink(phone) {
  if (!phone) return 'tel:';
  // Strip non-digit characters except leading plus
  const cleaned = phone.replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
}

/**
 * Build WhatsApp web/app link with prefilled URL-encoded message
 * @param {string} phone - international digits only, e.g. "923016803398"
 * @param {string} [message] - message text to pre-fill
 * @returns {string}
 */
export function buildWhatsAppLink(phone, message = '') {
  if (!phone) return '#';
  // Remove spaces, plus, hyphens
  const cleanNumber = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}${encodedText ? `?text=${encodedText}` : ''}`;
}

/**
 * Validates Pakistani mobile phone format
 * Accepts:
 *  - 03XXXXXXXXX (11 digits, starts with 03)
 *  - +923XXXXXXXXX (13 chars, starts with +923)
 *  - 923XXXXXXXXX (12 digits, starts with 923)
 * @param {string} phone
 * @returns {boolean}
 */
export function validatePakistaniPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s-]/g, '');
  const pattern = /^((\+92)|(0092)|(92))?3[0-9]{9}$|^03[0-9]{9}$/;
  return pattern.test(cleaned);
}
