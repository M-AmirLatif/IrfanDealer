import { createClient } from '@supabase/supabase-js';
import { PROPERTIES } from '../src/data/properties.js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://gjnakewmyeerfecrxrsw.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbmFrZXdteWVlcmZlY3J4cnN3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5Mzg4MjAzMywiZXhwIjoyMTA5NDU4MDMzfQ.I-qJE0WRZTn1x3DmgWexLLSNy4z3oNQLWlcyRmGEJ-Y';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function seed() {
  console.log(`Starting to seed ${PROPERTIES.length} properties...`);

  // Transform properties if needed to match database column names
  const records = PROPERTIES.map((p) => ({
    id: p.id,
    code: p.code,
    slug: p.slug,
    title: p.title,
    description: p.description,
    listing_type: p.listingType,
    property_type: p.propertyType,
    price: p.price,
    price_unit: p.priceUnit || 'total',
    is_price_negotiable: Boolean(p.isPriceNegotiable),
    security_deposit: p.securityDeposit || null,
    area_id: p.areaId,
    address: p.address,
    location: p.location || { lat: 31.1179, lng: 74.4461 },
    nearby: p.nearby || [],
    size: p.size,
    bedrooms: p.bedrooms || 0,
    bathrooms: p.bathrooms || 0,
    kitchens: p.kitchens || 0,
    floors: p.floors || 1,
    parking: p.parking || 0,
    furnishing: p.furnishing || 'unfurnished',
    year_built: p.yearBuilt || null,
    facing: p.facing || null,
    condition: p.condition || null,
    amenities: p.amenities || [],
    documents: p.documents || null,
    cover_image: p.coverImage || null,
    images: p.images || [],
    video: p.video || null,
    is_featured: Boolean(p.isFeatured),
    status: p.status || 'available',
    dealer_id: p.dealerId || 'irfan-umri',
    views: p.views || 0,
  }));

  const { data, error } = await supabase.from('properties').upsert(records, {
    onConflict: 'id',
  });

  if (error) {
    console.error('Error seeding properties:', error);
    process.exit(1);
  }

  console.log(`Successfully seeded ${records.length} properties into Supabase!`);
}

seed();
