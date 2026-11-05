/**
 * Property Data Service Layer
 * Reads live from Supabase PostgreSQL database with fallback to static data.
 * Supports complete CRUD for Admin Panel and real-time updates for public visitors.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { PROPERTIES as FALLBACK_PROPERTIES } from '../data/properties.js';
import { filterProperties } from '../utils/filterProperties.js';
import { sortProperties } from '../utils/sortProperties.js';

/**
 * Map database snake_case row to frontend camelCase object
 */
export function mapDbToProperty(row) {
  if (!row) return null;
  return {
    id: row.id,
    code: row.code,
    slug: row.slug,
    title: row.title,
    description: row.description,
    listingType: row.listing_type,
    propertyType: row.property_type,
    price: Number(row.price),
    priceUnit: row.price_unit || 'total',
    isPriceNegotiable: Boolean(row.is_price_negotiable),
    securityDeposit: row.security_deposit ? Number(row.security_deposit) : null,
    areaId: row.area_id,
    address: row.address,
    location: row.location || { lat: 31.1179, lng: 74.4461 },
    nearby: Array.isArray(row.nearby) ? row.nearby : [],
    size: row.size,
    bedrooms: row.bedrooms ?? 0,
    bathrooms: row.bathrooms ?? 0,
    kitchens: row.kitchens ?? 0,
    floors: row.floors ?? 1,
    parking: row.parking ?? 0,
    furnishing: row.furnishing || 'unfurnished',
    yearBuilt: row.year_built,
    facing: row.facing,
    condition: row.condition,
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    documents: row.documents,
    coverImage: row.cover_image,
    images: Array.isArray(row.images) ? row.images : [],
    video: Array.isArray(row.video) ? row.video[0] : row.video,
    videos: Array.isArray(row.video)
      ? row.video
      : (row.video && row.video.url ? [row.video] : []),
    isFeatured: Boolean(row.is_featured),
    status: row.status || 'available',
    dealerId: row.dealer_id || 'irfan-umri',
    views: row.views ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Map frontend camelCase object to database snake_case row
 */
export function mapPropertyToDb(p) {
  return {
    ...(p.id ? { id: p.id } : {}),
    code: p.code,
    slug: p.slug,
    title: p.title,
    description: p.description,
    listing_type: p.listingType,
    property_type: p.propertyType,
    price: Number(p.price),
    price_unit: p.priceUnit || 'total',
    is_price_negotiable: Boolean(p.isPriceNegotiable),
    security_deposit: p.securityDeposit ? Number(p.securityDeposit) : null,
    area_id: p.areaId,
    address: p.address,
    location: p.location || { lat: 31.1179, lng: 74.4461 },
    nearby: Array.isArray(p.nearby) ? p.nearby : [],
    size: p.size,
    bedrooms: Number(p.bedrooms || 0),
    bathrooms: Number(p.bathrooms || 0),
    kitchens: Number(p.kitchens || 0),
    floors: Number(p.floors || 1),
    parking: Number(p.parking || 0),
    furnishing: p.furnishing || 'unfurnished',
    year_built: p.yearBuilt ? Number(p.yearBuilt) : null,
    facing: p.facing || null,
    condition: p.condition || null,
    amenities: Array.isArray(p.amenities) ? p.amenities : [],
    documents: p.documents || null,
    cover_image: p.coverImage || null,
    images: Array.isArray(p.images) ? p.images : [],
    video: Array.isArray(p.videos) && p.videos.length > 0
      ? p.videos
      : (p.video ? (Array.isArray(p.video) ? p.video : [p.video]) : []),
    is_featured: Boolean(p.isFeatured),
    status: p.status || 'available',
    dealer_id: p.dealerId || 'irfan-umri',
    views: Number(p.views || 0),
  };
}

/**
 * Fetch all properties from Supabase (or fallback to static data)
 */
async function fetchAllLiveProperties() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map(mapDbToProperty);
      }
      if (error) {
        console.warn('Supabase fetch error, using fallback data:', error.message);
      }
    } catch (err) {
      console.warn('Network error fetching from Supabase, using fallback data:', err);
    }
  }
  return FALLBACK_PROPERTIES;
}

/**
 * Fetch filtered, sorted, paginated properties for public catalog
 */
export async function getProperties({
  filters = {},
  sort = 'newest',
  page = 1,
  pageSize = 12,
} = {}) {
  const all = await fetchAllLiveProperties();
  const availableOnly = all.filter((p) => p.status === 'available');

  const filtered = filterProperties(availableOnly, filters);
  const sorted = sortProperties(filtered, sort);

  const total = sorted.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const startIndex = (page - 1) * pageSize;
  const items = sorted.slice(startIndex, startIndex + pageSize);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * Get single property by URL slug or ID
 */
export async function getPropertyBySlug(slug) {
  if (!slug) return null;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .maybeSingle();

      if (!error && data) {
        return mapDbToProperty(data);
      }
    } catch (err) {
      console.warn('Supabase lookup failed, falling back to static data', err);
    }
  }

  const all = await fetchAllLiveProperties();
  return all.find((p) => p.slug === slug || p.id === slug) || null;
}

/**
 * Increment view count for a property
 */
export async function incrementPropertyViews(id) {
  if (!isSupabaseConfigured || !supabase || !id) return;
  try {
    const { data } = await supabase.from('properties').select('views').eq('id', id).maybeSingle();
    if (data) {
      await supabase.from('properties').update({ views: (data.views || 0) + 1 }).eq('id', id);
    }
  } catch (e) {
    // Silent fail for analytics
  }
}

/**
 * Get featured properties for homepage
 */
export async function getFeaturedProperties(limit = 6) {
  const all = await fetchAllLiveProperties();
  const featured = all.filter((p) => p.isFeatured && p.status === 'available');
  return featured.slice(0, limit);
}

/**
 * Get latest properties for homepage
 */
export async function getLatestProperties(limit = 6) {
  const all = await fetchAllLiveProperties();
  const available = all.filter((p) => p.status === 'available');
  const sorted = sortProperties(available, 'newest');
  return sorted.slice(0, limit);
}

/**
 * Get similar properties
 */
export async function getSimilarProperties(currentProperty, limit = 4) {
  if (!currentProperty) return [];
  const all = await fetchAllLiveProperties();
  const candidates = all.filter(
    (p) => p.id !== currentProperty.id && p.status === 'available'
  );

  const scored = candidates.map((item) => {
    let score = 0;
    if (item.areaId === currentProperty.areaId) score += 3;
    if (item.listingType === currentProperty.listingType) score += 2;
    if (item.propertyType === currentProperty.propertyType) score += 2;
    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}

/**
 * Get properties handled by a specific dealer
 */
export async function getPropertiesByDealer(dealerId, params = {}) {
  const all = await fetchAllLiveProperties();
  const dealerProps = all.filter((p) => p.dealerId === dealerId && p.status === 'available');
  return {
    items: dealerProps,
    total: dealerProps.length,
  };
}

/**
 * Get properties located in a specific area
 */
export async function getPropertiesByArea(areaSlug, params = {}) {
  const all = await fetchAllLiveProperties();
  const areaProps = all.filter((p) => p.areaId === areaSlug);
  const forSale = areaProps.filter((p) => p.listingType === 'sale').length;
  const forRent = areaProps.filter((p) => p.listingType === 'rent').length;

  return {
    items: areaProps,
    total: areaProps.length,
    forSale,
    forRent,
  };
}

/* =====================================================================
 * ADMIN CRUD METHODS (Requires Supabase Authenticated Session)
 * ===================================================================== */

/**
 * Get all properties for Admin management (including sold, rented, inactive)
 */
export async function getAdminProperties() {
  if (!isSupabaseConfigured || !supabase) {
    return FALLBACK_PROPERTIES;
  }
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(mapDbToProperty);
}

/**
 * Create a new property
 */
export async function createProperty(propertyData) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured');
  }

  // Generate code if not provided
  if (!propertyData.code) {
    const randomNum = Math.floor(100 + Math.random() * 900);
    propertyData.code = `P${randomNum}`;
  }

  // Generate unique slug
  if (!propertyData.slug) {
    const baseSlug = (propertyData.title || 'property')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    propertyData.slug = `${baseSlug}-${Date.now().toString(36)}`;
  }

  const dbRow = mapPropertyToDb(propertyData);
  delete dbRow.id; // Let database generate id or auto-assign

  const { data, error } = await supabase
    .from('properties')
    .insert([dbRow])
    .select()
    .single();

  if (error) throw error;
  return mapDbToProperty(data);
}

/**
 * Update an existing property
 */
export async function updateProperty(id, propertyData) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured');
  }

  const dbRow = mapPropertyToDb(propertyData);
  delete dbRow.id; // Do not overwrite id

  const { data, error } = await supabase
    .from('properties')
    .update(dbRow)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapDbToProperty(data);
}

/**
 * Delete a property
 */
export async function deleteProperty(id) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured');
  }

  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

/**
 * Upload an image or video file to Supabase Storage
 * @param {File} file
 * @param {string} [folder='listings']
 * @returns {Promise<string>} Public URL of uploaded media
 */
export async function uploadMediaFile(file, folder = 'listings') {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase storage is not configured');
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${extension}`;

  const { data, error } = await supabase.storage
    .from('property-media')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data: publicData } = supabase.storage
    .from('property-media')
    .getPublicUrl(fileName);

  return publicData.publicUrl;
}
