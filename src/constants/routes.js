/**
 * Application Route Constants
 */
export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAILS: '/properties/:slug',
  AREAS: '/areas',
  AREA_DETAILS: '/areas/:areaSlug',
  DEALERS: '/dealers',
  DEALER_PROFILE: '/dealers/:dealerSlug',
  ABOUT: '/about',
  CONTACT: '/contact',
  BUY: '/buy', // redirects to /properties?listingType=sale
  RENT: '/rent', // redirects to /properties?listingType=rent
};

export const NAV_LINKS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Buy', path: '/properties?listingType=sale' },
  { label: 'Rent', path: '/properties?listingType=rent' },
  { label: 'Areas', path: ROUTES.AREAS },
  { label: 'Dealers', path: ROUTES.DEALERS },
  { label: 'About', path: ROUTES.ABOUT },
  { label: 'Contact', path: ROUTES.CONTACT },
];
