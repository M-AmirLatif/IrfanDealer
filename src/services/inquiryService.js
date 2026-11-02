/**
 * Inquiry & Lead Submission Service
 * Simulates API submissions with optimistic resolution.
 * Ready for REST endpoint integration.
 */

const SIMULATED_DELAY_MS = 600;

function delay(ms = SIMULATED_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Submit general contact inquiry
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.phone
 * @param {string} data.intent - 'buy' | 'rent' | 'sell' | 'other'
 * @param {string} [data.message]
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitInquiry(data) {
  await delay();
  console.log('[Inquiry Submitted - Demo Mode]:', data);

  return {
    success: true,
    message: 'Thank you! Irfan Umri has received your inquiry and will contact you shortly.',
  };
}

/**
 * Submit property-specific callback request
 * @param {Object} data
 * @param {string} data.propertyId
 * @param {string} data.propertyTitle
 * @param {string} data.name
 * @param {string} data.phone
 * @param {string} [data.preferredTime]
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function requestCallback(data) {
  await delay();
  console.log('[Callback Request Submitted - Demo Mode]:', data);

  return {
    success: true,
    message:
      'Callback request registered. Irfan Umri will call you directly at your provided phone number.',
  };
}
