import React from 'react';
import { RotateCcw } from 'lucide-react';
import Chip from '../ui/Chip';
import { AREAS } from '../../data/areas';
import { PROPERTY_TYPES } from '../../data/propertyTypes';
import { formatPrice } from '../../utils/formatPrice';

export default function ActiveFilterChips({ filters, onRemove, onReset, className = '' }) {
  const chips = [];

  // Listing Type
  if (filters.listingType && filters.listingType !== 'all') {
    chips.push({
      key: 'listingType',
      label: filters.listingType === 'sale' ? 'For Sale' : 'For Rent',
    });
  }

  // Keyword
  if (filters.keyword) {
    chips.push({
      key: 'keyword',
      label: `"${filters.keyword}"`,
    });
  }

  // Areas
  if (Array.isArray(filters.area)) {
    filters.area.forEach((areaId) => {
      const areaObj = AREAS.find((a) => a.id === areaId);
      chips.push({
        key: 'area',
        specificValue: areaId,
        label: areaObj ? areaObj.name : areaId,
      });
    });
  }

  // Property Types
  if (Array.isArray(filters.type)) {
    filters.type.forEach((typeId) => {
      const typeObj = PROPERTY_TYPES.find((t) => t.id === typeId);
      chips.push({
        key: 'type',
        specificValue: typeId,
        label: typeObj ? typeObj.label : typeId,
      });
    });
  }

  // Price range
  if (filters.minPrice || filters.maxPrice) {
    const isRent = filters.listingType === 'rent';
    const minStr = filters.minPrice
      ? formatPrice(filters.minPrice, { isRent, hidePrefix: true })
      : '0';
    const maxStr = filters.maxPrice
      ? formatPrice(filters.maxPrice, { isRent, hidePrefix: true })
      : 'Any';
    chips.push({
      key: 'priceRange',
      label: `Price: ${minStr} - ${maxStr}`,
      handler: () => {
        onRemove('minPrice');
        onRemove('maxPrice');
      },
    });
  }

  // Bedrooms
  if (filters.beds && filters.beds !== 'any') {
    chips.push({
      key: 'beds',
      label: `${filters.beds}+ Bedrooms`,
    });
  }

  // Bathrooms
  if (filters.baths && filters.baths !== 'any') {
    chips.push({
      key: 'baths',
      label: `${filters.baths}+ Bathrooms`,
    });
  }

  // Extra toggles
  if (filters.featuredOnly) {
    chips.push({ key: 'featuredOnly', label: 'Featured Only' });
  }
  if (filters.hasVideo) {
    chips.push({ key: 'hasVideo', label: 'With Video Tour' });
  }
  if (filters.furnished) {
    chips.push({ key: 'furnished', label: 'Furnished' });
  }

  if (chips.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 py-1 ${className}`}>
      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
        Active Filters:
      </span>

      {chips.map((chip, idx) => (
        <Chip
          key={`${chip.key}-${chip.specificValue || idx}`}
          active
          removable
          onRemove={() => {
            if (chip.handler) {
              chip.handler();
            } else {
              onRemove(chip.key, chip.specificValue);
            }
          }}
        >
          {chip.label}
        </Chip>
      ))}

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 ml-2 py-1 focus:outline-none focus:underline"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Clear All</span>
      </button>
    </div>
  );
}
