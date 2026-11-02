/**
 * Global Site Configuration & Contact Details
 * Centralizes all dealer contact info, business hours, and brand metadata.
 * Note: Never hard-code phone numbers or addresses in UI components.
 */
export const SITE_CONFIG = {
  brandName: 'Umri Properties',
  tagline: 'Trusted Property Dealers in Kasur',
  shortDescription:
    'Kasur’s premier real estate consultancy. Helping families and investors buy, sell, and rent houses, plots, and agricultural land with 100% transparency.',
  dealerName: 'Irfan Umri',
  phoneDisplay: '+92 301 6803398',
  phoneRaw: '+923016803398',
  whatsappNumber: '923016803398',
  email: 'info@umriproperties.pk',
  address: 'Shop # 12, Umri Commercial Plaza, Lahore Road, near Railway Crossing, Kasur, Punjab',
  city: 'Kasur',
  district: 'Kasur',
  province: 'Punjab',
  country: 'Pakistan',
  workingHours: 'Mon – Sat: 9:00 AM – 8:00 PM | Sun: By Appointment',
  fridayBreak: 'Friday Prayer Break: 1:00 PM – 3:00 PM',
  mapCoordinates: {
    lat: 31.1179,
    lng: 74.4461,
  },
  disclaimer:
    'Property details and dimensions are provided by the dealer. Clients are advised to physically inspect properties and verify title deeds/ownership records before making any financial commitment.',
  socialLinks: {
    facebook: 'https://facebook.com/umriproperties',
    youtube: 'https://youtube.com/@umriproperties',
    instagram: 'https://instagram.com/umriproperties',
  },
  quickLinks: [
    { label: 'Featured Houses', path: '/properties?type=house' },
    { label: 'Residential Plots', path: '/properties?type=plot' },
    { label: 'Commercial Shops', path: '/properties?type=shop' },
    { label: 'Agricultural Land', path: '/properties?type=agricultural' },
    { label: 'Rental Properties', path: '/properties?listingType=rent' },
  ],
};
