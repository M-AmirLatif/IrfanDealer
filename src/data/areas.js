/**
 * Kasur Localities & Areas Dataset
 * NOTE: The property dealer owner should verify and update these locality descriptions
 * and exact coordinates with exact municipal landmarks before official deployment.
 */

export const AREAS = [
  {
    id: 'lahore-road',
    slug: 'lahore-road',
    name: 'Lahore Road',
    description:
      'The prime residential and commercial artery connecting Kasur directly to Lahore. Features rapid development, gated communities, brand-new houses, and top educational institutions.',
    coverImage:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    location: { lat: 31.135, lng: 74.455 },
    postalCode: '55050',
    highlights: ['Gated Societies', 'Direct Highway Access', 'Modern Amenities', 'Schools Nearby'],
  },
  {
    id: 'model-town',
    slug: 'model-town',
    name: 'Model Town',
    description:
      'Kasur’s most sought-after upscale residential neighborhood. Boasts wide carpeted roads, planned parks, clean water filtration plants, and luxury double-storey family residences.',
    coverImage:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    location: { lat: 31.121, lng: 74.438 },
    postalCode: '55050',
    highlights: ['Planned Sector', 'Parks & Playgrounds', 'Security Patrols', 'Prime Residential'],
  },
  {
    id: 'kasur-city-center',
    slug: 'kasur-city-center',
    name: 'Kasur City Center',
    description:
      'The vibrant historic core around Bulleh Shah shrine and bustling main bazaars. High commercial footfall, retail shops, wholesale markets, and mature central residences.',
    coverImage:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    location: { lat: 31.1179, lng: 74.4461 },
    postalCode: '55050',
    highlights: [
      'Historic District',
      'Heavy Commercial Footfall',
      'Wholesale Markets',
      'Banks & Hubs',
    ],
  },
  {
    id: 'railway-road',
    slug: 'railway-road',
    name: 'Railway Road',
    description:
      'Strategic commercial strip running toward Kasur Junction Railway Station. Ideal for wholesale shops, corporate offices, rental apartments, and accessible transport links.',
    coverImage:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    location: { lat: 31.114, lng: 74.441 },
    postalCode: '55050',
    highlights: ['Railway Station Proximity', 'Retail Plazas', 'Transport Hub', 'Commercial Value'],
  },
  {
    id: 'bypass-road',
    slug: 'bypass-road',
    name: 'Bypass Road',
    description:
      'Fast-expanding corridor surrounding Kasur with huge potential for warehouses, industrial plots, spacious modern farmhouses, and newly demarcated housing schemes.',
    coverImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    location: { lat: 31.145, lng: 74.422 },
    postalCode: '55050',
    highlights: [
      'Heavy Vehicle Access',
      'Warehousing Hub',
      'New Housing Projects',
      'Spacious Plots',
    ],
  },
  {
    id: 'chunian',
    slug: 'chunian',
    name: 'Chunian',
    description:
      'Historic tehsil headquarters known for fertile agricultural land, tube-well irrigated farmland, grain market proximity, and affordable residential options.',
    coverImage:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    location: { lat: 30.963, lng: 73.98 },
    postalCode: '55100',
    highlights: ['Fertile Agri Land', 'Tube-Well Water', 'Affordable Plots', 'Grain Market'],
  },
  {
    id: 'pattoki',
    slug: 'pattoki',
    name: 'Pattoki',
    description:
      'Famous as Pakistan’s city of flowers and a vital logistics hub on Multan Road. Excellent for commercial godowns, nurseries, farmhouses, and roadside commercial sites.',
    coverImage:
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    location: { lat: 31.021, lng: 73.85 },
    postalCode: '55300',
    highlights: [
      'National Highway GT Road',
      'Floral Nurseries',
      'Industrial Zone',
      'Commercial Land',
    ],
  },
  {
    id: 'kot-radha-kishan',
    slug: 'kot-radha-kishan',
    name: 'Kot Radha Kishan',
    description:
      'Rapidly urbanizing town in Kasur district with direct train links to Raiwind and Lahore. Popular for peaceful family living, budget-friendly plots, and agricultural investments.',
    coverImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    location: { lat: 31.171, lng: 74.099 },
    postalCode: '55180',
    highlights: ['Rail Connection', 'Raiwind Proximity', 'Budget Residential', 'Safe Environment'],
  },
  {
    id: 'khudian-khas',
    slug: 'khudian-khas',
    name: 'Khudian Khas',
    description:
      'Emerging sub-district hub with lush green agricultural lands, poultry farm facilities, peaceful rural charm, and developing local road networks.',
    coverImage:
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=80',
    location: { lat: 30.985, lng: 74.288 },
    postalCode: '55010',
    highlights: ['Agri Farmland', 'Poultry Farms', 'Sweet Water Quality', 'Serene Surroundings'],
  },
  {
    id: 'raja-jang',
    slug: 'raja-jang',
    name: 'Raja Jang',
    description:
      'Strategically positioned between Kasur and Raiwind, offering fast access to Lahore southern ring road. Great for forward-looking land investors and peaceful farmhouses.',
    coverImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    location: { lat: 31.221, lng: 74.256 },
    postalCode: '55070',
    highlights: ['Raiwind Road Access', 'Investment Hotspot', 'Farmhouse Land', 'High Growth'],
  },
  {
    id: 'circular-road',
    slug: 'circular-road',
    name: 'Circular Road',
    description:
      'Encircles old Kasur city with continuous commercial plazas, medical clinics, hardware markets, and multi-storey commercial-residential buildings.',
    coverImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    location: { lat: 31.119, lng: 74.452 },
    postalCode: '55050',
    highlights: ['High Rental Yield', 'Retail Showrooms', 'Dense Footfall', 'Central Location'],
  },
  {
    id: 'ferozepur-road',
    slug: 'ferozepur-road',
    name: 'Ferozepur Road',
    description:
      'Major industrial and residential link stretching towards the border and Ganda Singh Wala. Excellent for industrial mills, logistics facilities, and large plots.',
    coverImage:
      'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=800&q=80',
    location: { lat: 31.095, lng: 74.49 },
    postalCode: '55050',
    highlights: ['Heavy Industry Zone', 'Large Acreages', 'Border Trade Route', 'Highway Frontage'],
  },
];
