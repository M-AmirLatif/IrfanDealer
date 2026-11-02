import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Phone,
  MessageCircle,
  Video,
  Camera,
  CheckCircle,
} from 'lucide-react';
import Badge from '../ui/Badge';
import { formatPrice } from '../../utils/formatPrice';
import { formatSize } from '../../utils/formatSize';
import { buildTelLink, buildWhatsAppLink } from '../../utils/linkUtils';
import { getDealerByIdSync } from '../../services/dealerService';
import { AREAS } from '../../data/areas';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';

export default function PropertyCard({
  property,
  className = '',
  headingLevel = 'h3',
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const HeadingTag = headingLevel;

  if (!property) return null;

  // Retrieve assigned dealer
  const dealer = getDealerByIdSync(property.dealerId);

  // Area name resolution
  const areaObj = AREAS.find((a) => a.id === property.areaId);
  const areaName = areaObj ? areaObj.name : property.areaId || 'Kasur';

  const isRent = property.listingType === 'rent';
  const isResidential = property.propertyType === 'house' || property.propertyType === 'flat';
  const isPlotOrLand = property.propertyType === 'plot' || property.propertyType === 'agricultural';

  const photoCount = property.images?.length || 1;
  const propertyUrl = `${window.location.origin}/properties/${property.slug}`;

  const whatsappMessage = `Hello ${dealer.name}, I am interested in: ${property.title} (ID: ${property.code}). Link: ${propertyUrl}`;

  return (
    <div
      className={`group bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-elevated hover:border-slate-300 transition-all duration-200 flex flex-col overflow-hidden ${className}`}
    >
      {/* Clickable Image Section */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-100">
        <Link
          to={`/properties/${property.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block w-full h-full"
        >
          {/* Shimmer skeleton before image is loaded */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          )}

          <img
            src={imageError ? FALLBACK_IMAGE : property.coverImage || FALLBACK_IMAGE}
            alt={property.title}
            loading="lazy"
            width={600}
            height={400}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </Link>

        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant={isRent ? 'rent' : 'sale'} size="sm">
              {isRent ? 'For Rent' : 'For Sale'}
            </Badge>

            {property.isFeatured && (
              <Badge variant="featured" size="sm">
                ★ Featured
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {property.video && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[11px] font-bold text-white shadow-xs"
                title="Video walkthrough available"
              >
                <Video className="w-3 h-3 text-red-400" />
                <span className="hidden sm:inline">Video</span>
              </span>
            )}

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[11px] font-medium text-white shadow-xs">
              <Camera className="w-3 h-3 text-slate-300" />
              <span>{photoCount}</span>
            </span>
          </div>
        </div>

        {/* Property Code Pill on bottom-left of image */}
        <div className="absolute bottom-2.5 left-3 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-slate-900/75 backdrop-blur-xs text-[11px] font-mono font-bold text-slate-200">
            {property.code}
          </span>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Price Header */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xl sm:text-2xl font-extrabold text-primary-950 font-heading tracking-tight">
              {formatPrice(property.price, { isRent })}
            </span>
            {property.isPriceNegotiable && (
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Negotiable
              </span>
            )}
          </div>

          {/* Title as accessible primary link */}
          <HeadingTag className="text-base sm:text-lg font-bold font-heading text-slate-900 line-clamp-2 leading-snug group-hover:text-primary-900 transition-colors">
            <Link
              to={`/properties/${property.slug}`}
              className="focus:outline-none focus-visible:underline"
            >
              {property.title}
            </Link>
          </HeadingTag>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium">
            <MapPin className="w-4 h-4 text-accent-700 shrink-0" />
            <span className="line-clamp-1">{areaName}, Kasur</span>
          </div>

          {/* Specs Row */}
          <div className="pt-2 pb-1 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-700">
            {/* Size */}
            <span className="flex items-center gap-1.5 font-semibold text-slate-900">
              <Maximize2 className="w-4 h-4 text-primary-800" />
              <span>{formatSize(property.size)}</span>
            </span>

            {/* Bedrooms & Bathrooms for residential */}
            {isResidential && property.bedrooms ? (
              <>
                <span className="flex items-center gap-1 text-slate-600">
                  <Bed className="w-4 h-4 text-slate-400" />
                  <span>{property.bedrooms} Beds</span>
                </span>
                {property.bathrooms && (
                  <span className="flex items-center gap-1 text-slate-600">
                    <Bath className="w-4 h-4 text-slate-400" />
                    <span>{property.bathrooms} Baths</span>
                  </span>
                )}
              </>
            ) : isPlotOrLand ? (
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded">
                {property.propertyType === 'agricultural' ? 'Farmland' : 'Residential Plot'}
              </span>
            ) : (
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded">
                {property.propertyType}
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions (Call & WhatsApp) */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Dealer Name info */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="line-clamp-1 truncate max-w-[100px] sm:max-w-[120px]">
              {dealer.name}
            </span>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex items-center gap-1.5">
            <a
              href={buildTelLink(dealer.phone)}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-btn text-xs font-bold text-primary-900 bg-primary-50 hover:bg-primary-100 border border-primary-200 transition-colors min-h-tap"
              aria-label={`Call dealer ${dealer.name} for ${property.code}`}
            >
              <Phone className="w-3.5 h-3.5 text-primary-900" />
              <span>Call</span>
            </a>

            <a
              href={buildWhatsAppLink(dealer.whatsapp, whatsappMessage)}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-btn text-xs font-bold text-slate-950 bg-whatsapp hover:bg-whatsapp-hover transition-colors shadow-xs min-h-tap"
              aria-label={`WhatsApp dealer ${dealer.name} regarding ${property.code}`}
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
