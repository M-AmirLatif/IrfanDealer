import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Tag,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Calendar,
  Share2,
  FileCheck,
  AlertTriangle,
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PropertyGallery from '../components/property/PropertyGallery';
import PropertySpecs from '../components/property/PropertySpecs';
import AmenitiesList from '../components/property/AmenitiesList';
import ContactCard from '../components/property/ContactCard';
import StickyMobileBar from '../components/property/StickyMobileBar';
import PropertyCard from '../components/property/PropertyCard';
import ShareButton from '../components/common/ShareButton';
import PriceTag from '../components/property/PriceTag';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { SkeletonPropertyCard } from '../components/ui/Skeleton';
import { getPropertyBySlug, getSimilarProperties, incrementPropertyViews } from '../services/propertyService';
import { getDealerByIdSync } from '../services/dealerService';
import { AREAS } from '../data/areas';
import { formatPrice, formatPriceFull } from '../utils/formatPrice';
import { timeAgo } from '../utils/timeAgo';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function PropertyDetails() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [similarProps, setSimilarProps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const item = await getPropertyBySlug(slug);
        setProperty(item);

        if (item) {
          incrementPropertyViews(item.id);
          const similar = await getSimilarProperties(item, 3);
          setSimilarProps(similar);
        }
      } catch (err) {
        console.error('Failed to load property details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  // Dynamic SEO title
  const areaObj = property ? AREAS.find((a) => a.id === property.areaId) : null;
  const areaName = areaObj ? areaObj.name : 'Kasur';
  const pageTitle = property ? `${property.title} in ${areaName}, Kasur` : 'Property Details';

  useDocumentTitle(pageTitle, property?.description?.slice(0, 160));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-6">
        <div className="h-6 bg-slate-200 rounded w-1/4"></div>
        <div className="aspect-[16/9] max-h-[500px] bg-slate-200 rounded-3xl w-full"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/2"></div>
            <div className="h-40 bg-slate-200 rounded-2xl"></div>
          </div>
          <div className="h-80 bg-slate-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!property) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold font-heading text-slate-900">
          Property Not Found or Sold
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          The property listing you requested may have been finalized, sold, or the link has expired.
        </p>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-primary-900 text-white font-bold text-sm shadow hover:bg-primary-800 transition-colors min-h-tap"
        >
          Browse Available Kasur Properties
        </Link>
      </div>
    );
  }

  const dealer = getDealerByIdSync(property.dealerId);
  const isRent = property.listingType === 'rent';

  // Compute price per Marla for sales
  const marlaSize = property.size?.areaSqft ? property.size.areaSqft / 272.25 : null;
  const pricePerMarla =
    !isRent && marlaSize && marlaSize > 0 ? Math.round(property.price / marlaSize) : null;

  // Google Maps link with coordinates
  const mapQuery = property.location
    ? `${property.location.lat},${property.location.lng}`
    : `${encodeURIComponent(property.address || 'Kasur')}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* 1. BREADCRUMBS */}
        <Breadcrumbs
          items={[
            { label: 'Properties', path: '/properties' },
            { label: areaName, path: `/areas/${property.areaId}` },
            { label: property.title },
          ]}
        />

        {/* 2. GALLERY & MEDIA */}
        <PropertyGallery
          images={property.images}
          video={property.video}
          videos={property.videos}
          coverImage={property.coverImage}
        />

        {/* MAIN 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
          {/* LEFT 2-COLUMNS: PROPERTY DETAILS */}
          <div className="lg:col-span-2 space-y-8">
            {/* 4. HEADER BLOCK */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-soft space-y-4">
              {/* Badges & Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={isRent ? 'rent' : 'sale'} size="md">
                    {isRent ? 'For Rent' : 'For Sale'}
                  </Badge>
                  {property.isFeatured && (
                    <Badge variant="featured" size="md">
                      ★ Featured Listing
                    </Badge>
                  )}
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    ID: {property.code}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{timeAgo(property.createdAt)}</span>
                  </span>
                  <ShareButton title={property.title} url={window.location.href} />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 tracking-tight leading-snug">
                {property.title}
              </h1>

              {/* Location */}
              <div className="flex items-start gap-2 text-sm sm:text-base text-slate-600">
                <MapPin className="w-5 h-5 text-accent-700 shrink-0 mt-0.5" />
                <span className="font-medium">{property.address}</span>
              </div>

              {/* Price Banner */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 bg-primary-50/50 p-4 rounded-2xl border border-primary-100/60">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-900 block mb-0.5">
                    {isRent ? 'Monthly Rental Demand' : 'Asking Price'}
                  </span>
                  <div className="text-2xl sm:text-4xl font-extrabold font-heading text-primary-950">
                    {formatPrice(property.price, { isRent })}
                  </div>
                  {!isRent && (
                    <span className="text-xs text-slate-500 font-medium block mt-1">
                      Full: {formatPriceFull(property.price)}
                    </span>
                  )}
                </div>

                {property.isPriceNegotiable && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full self-start sm:self-auto">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Negotiable Price</span>
                  </span>
                )}
              </div>
            </div>

            {/* 5. KEY FACTS GRID */}
            <PropertySpecs property={property} />

            {/* 6. DESCRIPTION */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-soft space-y-4">
              <h2 className="text-xl font-bold font-heading text-slate-900 pb-3 border-b border-slate-100">
                Property Overview & Details
              </h2>
              <div
                className={`text-slate-700 leading-relaxed space-y-4 text-base ${
                  !showFullDesc && property.description.length > 400 ? 'line-clamp-4' : ''
                }`}
              >
                {property.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              {property.description.length > 400 && (
                <button
                  type="button"
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="text-sm font-bold text-primary-900 hover:text-primary-700 underline pt-1 focus:outline-none"
                >
                  {showFullDesc ? 'Show less' : 'Read full description...'}
                </button>
              )}
            </div>

            {/* 7. FEATURES & AMENITIES */}
            <AmenitiesList amenities={property.amenities} />

            {/* 8. LOCATION & NEARBY LANDMARKS */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-soft space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-xl font-bold font-heading text-slate-900">
                  Location & Nearby Landmarks
                </h2>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-bold text-primary-900 hover:text-primary-700 inline-flex items-center gap-1.5"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-sm text-slate-600 font-medium">
                <strong>Address:</strong> {property.address}
              </p>

              {/* Nearby list */}
              {property.nearby && property.nearby.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Proximity & Distances:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {property.nearby.map((place, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between"
                      >
                        <span className="text-xs font-bold text-slate-800">{place.label}</span>
                        <span className="text-xs font-semibold text-primary-900 bg-primary-100 px-2 py-0.5 rounded">
                          {place.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Zero-SDK Map Placeholder Box */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/7] bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-primary-900 text-white rounded-full flex items-center justify-center mb-3 shadow-md">
                  <MapPin className="w-6 h-6 text-accent-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Location: {areaName}, Kasur
                </h3>
                <p className="text-xs text-slate-700 max-w-sm mb-4">
                  Precise coordinates: {property.location?.lat}, {property.location?.lng}
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-xs transition-colors min-h-tap"
                >
                  <ExternalLink className="w-4 h-4 text-primary-900" />
                  <span>Navigate with Google Maps</span>
                </a>
              </div>
            </div>

            {/* 9. PRICING & FINANCIAL BREAKDOWN */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-soft space-y-4">
              <h2 className="text-xl font-bold font-heading text-slate-900 pb-3 border-b border-slate-100">
                Financial Details & Ownership Verification
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <span className="text-xs text-slate-500 font-semibold block">Total Demand:</span>
                  <span className="text-base font-bold text-slate-900">
                    {formatPrice(property.price, { isRent })}
                  </span>
                </div>

                {!isRent && pricePerMarla && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    <span className="text-xs text-slate-500 font-semibold block">
                      Estimated Rate Per Marla:
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      {formatPrice(pricePerMarla)} / Marla
                    </span>
                  </div>
                )}

                {isRent && property.securityDeposit && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    <span className="text-xs text-slate-500 font-semibold block">
                      Security Deposit:
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      PKR {property.securityDeposit.toLocaleString()} (Refundable)
                    </span>
                  </div>
                )}

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <span className="text-xs text-slate-500 font-semibold block">
                    Price Negotiability:
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    {property.isPriceNegotiable
                      ? 'Open to reasonable counter-offers'
                      : 'Fixed price'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 sm:col-span-2">
                  <span className="text-xs text-slate-500 font-semibold block">
                    Legal Ownership Record:
                  </span>
                  <span className="text-base font-bold text-emerald-800 flex items-center gap-1.5 mt-0.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span>{property.documents}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 1-COLUMN: STICKY CONTACT CARD (DESKTOP) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <ContactCard property={property} dealer={dealer} />
            </div>
          </div>
        </div>

        {/* 13. SIMILAR PROPERTIES */}
        {similarProps.length > 0 && (
          <div className="pt-12 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-heading text-slate-900">
                  Similar Properties in Kasur
                </h2>
                <p className="text-sm text-slate-500">
                  Other verified listings you may be interested in
                </p>
              </div>
              <Link
                to="/properties"
                className="text-sm font-bold text-primary-900 hover:text-primary-700 flex items-center gap-1"
              >
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProps.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 11. MOBILE STICKY BOTTOM BAR */}
      <StickyMobileBar property={property} dealer={dealer} />
    </div>
  );
}
