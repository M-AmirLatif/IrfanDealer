/**
 * JSDoc Schema Definitions for Umri Properties
 * Reflects future REST API / Database schema for easy backend integration.
 */

/**
 * @typedef {Object} GeoLocation
 * @property {number} lat - Latitude
 * @property {number} lng - Longitude
 */

/**
 * @typedef {Object} NearbyLandmark
 * @property {string} label - Name or category of landmark (e.g. "Govt High School")
 * @property {string} distance - Distance string (e.g. "400 m", "1.5 km")
 */

/**
 * @typedef {Object} PropertySize
 * @property {number} value - Numeric dimension value (e.g. 5, 10, 1)
 * @property {'marla' | 'kanal' | 'sqft'} unit - Unit of measurement
 * @property {number} areaSqft - Normalized square footage (1 Marla = 272.25 sq ft, 1 Kanal = 5,445 sq ft)
 */

/**
 * @typedef {Object} PropertyImage
 * @property {string} url - Direct web URL or asset path
 * @property {string} alt - Descriptive image text
 */

/**
 * @typedef {Object} PropertyVideo
 * @property {'youtube' | 'mp4'} type - Video provider
 * @property {string} url - YouTube video ID or MP4 video URL
 * @property {string} [poster] - Video thumbnail poster
 */

/**
 * @typedef {'sale' | 'rent'} ListingType
 * @typedef {'house' | 'plot' | 'flat' | 'shop' | 'commercial' | 'agricultural' | 'farmhouse' | 'office'} PropertyType
 * @typedef {'available' | 'sold' | 'rented'} PropertyStatus
 * @typedef {'unfurnished' | 'semi-furnished' | 'furnished'} FurnishingStatus
 *
 * @typedef {Object} Property
 * @property {string} id - Unique identifier (e.g. "p001")
 * @property {string} code - Display code (e.g. "P001")
 * @property {string} slug - URL slug (e.g. "5-marla-double-storey-house-lahore-road-kasur-p001")
 * @property {string} title - Property title
 * @property {string} description - Comprehensive multi-paragraph description
 * @property {ListingType} listingType - Whether property is for Sale or Rent
 * @property {PropertyType} propertyType - Specific property classification
 * @property {number} price - Numeric price in PKR (total for sale; monthly rent for rent)
 * @property {'total' | 'per_month'} priceUnit - Pricing period unit
 * @property {boolean} isPriceNegotiable - Indicates whether price is open to offers
 * @property {number|null} [securityDeposit] - Security deposit in PKR (for rent only)
 * @property {string} areaId - Reference to Area slug/id
 * @property {string} address - Physical street address in Kasur
 * @property {GeoLocation} location - Approximate coordinates
 * @property {NearbyLandmark[]} nearby - Nearby facilities and distances
 * @property {PropertySize} size - Structured size and normalized sq ft
 * @property {number} [bedrooms] - Bedroom count (for residential)
 * @property {number} [bathrooms] - Bathroom count (for residential)
 * @property {number} [kitchens] - Kitchen count
 * @property {number} [floors] - Number of storeys
 * @property {number} [parking] - Vehicle parking spaces
 * @property {FurnishingStatus|null} [furnishing] - Furnishing level
 * @property {number} [yearBuilt] - Construction year or age
 * @property {string} [facing] - Compass orientation (e.g. "North", "Park Facing")
 * @property {string} [condition] - Physical state ("Brand New", "Well Maintained", "Recently Renovated")
 * @property {string[]} amenities - Array of amenity keys matching amenities.js
 * @property {string} documents - Ownership docs (e.g. "Registry & Intiqal Available")
 * @property {PropertyImage[]} images - Array of gallery images
 * @property {string} coverImage - Primary high-resolution preview image
 * @property {PropertyVideo|null} video - Video walkthrough metadata
 * @property {boolean} isFeatured - Whether highlighted on homepage/featured badges
 * @property {PropertyStatus} status - Listing availability
 * @property {string} dealerId - Reference to dealer
 * @property {string} createdAt - ISO 8601 creation timestamp
 * @property {string} updatedAt - ISO 8601 update timestamp
 * @property {number} views - Demo view count
 */

/**
 * @typedef {Object} Area
 * @property {string} id - Area slug
 * @property {string} slug - URL slug
 * @property {string} name - Area name (e.g. "Lahore Road")
 * @property {string} description - Brief summary of residential/commercial character
 * @property {string} coverImage - Header photo
 * @property {GeoLocation} location - Coordinates
 * @property {string} postalCode - Postcode
 * @property {string[]} highlights - Key neighborhood attractions
 */

/**
 * @typedef {Object} Dealer
 * @property {string} id - Unique identifier (e.g. "irfan-umri")
 * @property {string} slug - URL slug
 * @property {string} name - Dealer's full name
 * @property {string} agencyName - Agency title
 * @property {string} phone - International format for tel: link (+923016803398)
 * @property {string} phoneDisplay - Human-readable phone display (+92 301 6803398)
 * @property {string} whatsapp - WhatsApp number digits (923016803398)
 * @property {string} email - Email address
 * @property {string} photo - Portrait image URL
 * @property {string} bio - Professional biography
 * @property {number} experienceYears - Years active in Kasur real estate
 * @property {string[]} specialization - Areas of expertise (e.g. ["Houses", "Agricultural Land"])
 * @property {string[]} areasServed - Primary areas handled
 * @property {string} address - Office location
 * @property {string} workingHours - Operating hours
 * @property {boolean} isActive - Active status (1 active in v1, 4 inactive ready to toggle)
 */

export const SCHEMA_DOC = true;
