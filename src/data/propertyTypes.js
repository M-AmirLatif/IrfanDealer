/**
 * Property Types & Taxonomy for Umri Properties
 */

export const PROPERTY_TYPES = [
  {
    id: 'house',
    label: 'House / Villa',
    shortLabel: 'House',
    isResidential: true,
    description: 'Independent single & double-storey houses, villas, and bangalows.',
    iconName: 'Home',
  },
  {
    id: 'plot',
    label: 'Residential Plot',
    shortLabel: 'Plot',
    isResidential: true,
    description: 'Demarcated residential plots, files, and corner plots.',
    iconName: 'Map',
  },
  {
    id: 'flat',
    label: 'Flat / Apartment',
    shortLabel: 'Flat',
    isResidential: true,
    description: 'Multi-storey modern apartments and studio flats.',
    iconName: 'Building',
  },
  {
    id: 'shop',
    label: 'Commercial Shop',
    shortLabel: 'Shop',
    isResidential: false,
    description: 'Bazaar retail shops, main road commercial booths, and showrooms.',
    iconName: 'Store',
  },
  {
    id: 'commercial',
    label: 'Commercial Building / Plaza',
    shortLabel: 'Commercial',
    isResidential: false,
    description: 'Complete commercial plazas, godowns, and office complexes.',
    iconName: 'Building2',
  },
  {
    id: 'agricultural',
    label: 'Agricultural Land',
    shortLabel: 'Agri Land',
    isResidential: false,
    description: 'Fertile crop lands, canal/tube-well irrigated acreage in Kasur.',
    iconName: 'Tractor',
  },
  {
    id: 'farmhouse',
    label: 'Farmhouse',
    shortLabel: 'Farmhouse',
    isResidential: true,
    description: 'Spacious weekend farmhouses with lawns, pools, and orchards.',
    iconName: 'Trees',
  },
  {
    id: 'office',
    label: 'Office Space',
    shortLabel: 'Office',
    isResidential: false,
    description: 'Corporate offices, consultancy chambers, and bank spaces.',
    iconName: 'Briefcase',
  },
];
