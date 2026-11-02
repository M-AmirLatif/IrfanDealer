/**
 * Amenities & Property Features Taxonomy
 */

export const AMENITIES = [
  { id: 'gas', label: 'Sui Gas Supply', icon: 'Flame' },
  { id: 'electricity', label: 'WAPDA Electricity', icon: 'Zap' },
  { id: 'water', label: 'Clean Water Supply', icon: 'Droplets' },
  { id: 'sewerage', label: 'Underground Sewerage', icon: 'Waves' },
  { id: 'boundary-wall', label: 'Boundary Wall', icon: 'Shield' },
  { id: 'corner-plot', label: 'Corner Plot', icon: 'Compass' },
  { id: 'park-facing', label: 'Park Facing', icon: 'Trees' },
  { id: 'main-road', label: 'Main Road Frontage', icon: 'Navigation' },
  { id: 'servant-quarter', label: 'Servant Quarter', icon: 'UserCheck' },
  { id: 'garage', label: 'Car Parking / Garage', icon: 'Car' },
  { id: 'lawn', label: 'Private Lawn / Garden', icon: 'Flower2' },
  { id: 'security', label: '24/7 Society Security', icon: 'ShieldCheck' },
  { id: 'mosque-nearby', label: 'Jamia Mosque Nearby', icon: 'CheckCircle2' },
  { id: 'school-nearby', label: 'Reputed School Nearby', icon: 'GraduationCap' },
  { id: 'market-nearby', label: 'Bazaar / Market Nearby', icon: 'ShoppingBag' },
  { id: 'hospital-nearby', label: 'Hospital / Clinic Nearby', icon: 'HeartPulse' },
];

export const AMENITY_MAP = AMENITIES.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {});
