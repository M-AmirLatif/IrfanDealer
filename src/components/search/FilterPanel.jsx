import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Check, SlidersHorizontal } from 'lucide-react';
import Tabs from '../ui/Tabs';
import Input from '../ui/Input';
import Chip from '../ui/Chip';
import { AREAS } from '../../data/areas';
import { PROPERTY_TYPES } from '../../data/propertyTypes';
import { SQFT_PER_MARLA, SQFT_PER_KANAL } from '../../utils/formatSize';
import { useDebounce } from '../../hooks/useDebounce';

const PRICE_PRESETS_SALE = [
  { label: 'Under 50 Lakh', min: '', max: '5000000' },
  { label: '50 Lakh - 1 Crore', min: '5000000', max: '10000000' },
  { label: '1 - 2 Crore', min: '10000000', max: '20000000' },
  { label: '2 - 4 Crore', min: '20000000', max: '40000000' },
  { label: '4 Crore+', min: '40000000', max: '' },
];

const PRICE_PRESETS_RENT = [
  { label: 'Under 25k', min: '', max: '25000' },
  { label: '25k - 50k', min: '25000', max: '50000' },
  { label: '50k - 1 Lakh', min: '50000', max: '100000' },
  { label: '1 Lakh+', min: '100000', max: '' },
];

const SIZE_PRESETS = [
  { label: '3 Marla', sqftMin: 3 * SQFT_PER_MARLA - 50, sqftMax: 3 * SQFT_PER_MARLA + 50 },
  { label: '5 Marla', sqftMin: 5 * SQFT_PER_MARLA - 50, sqftMax: 5 * SQFT_PER_MARLA + 50 },
  { label: '7 Marla', sqftMin: 7 * SQFT_PER_MARLA - 50, sqftMax: 7 * SQFT_PER_MARLA + 50 },
  { label: '10 Marla', sqftMin: 10 * SQFT_PER_MARLA - 50, sqftMax: 10 * SQFT_PER_MARLA + 50 },
  { label: '1 Kanal', sqftMin: 1 * SQFT_PER_KANAL - 100, sqftMax: 1 * SQFT_PER_KANAL + 100 },
  { label: '2 Kanal+', sqftMin: 2 * SQFT_PER_KANAL, sqftMax: '' },
];

export default function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  isMobileDrawer = false,
  onApplyMobile,
  className = '',
}) {
  // Local state for keyword to handle debounce smoothly
  const [keywordInput, setKeywordInput] = useState(filters.keyword || '');
  const debouncedKeyword = useDebounce(keywordInput, 300);

  // Sync debounced keyword to parent filters
  useEffect(() => {
    if (debouncedKeyword !== filters.keyword) {
      onFilterChange({ keyword: debouncedKeyword });
    }
  }, [debouncedKeyword]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep input synced if URL changes externally
  useEffect(() => {
    setKeywordInput(filters.keyword || '');
  }, [filters.keyword]);

  const isRent = filters.listingType === 'rent';
  const pricePresets = isRent ? PRICE_PRESETS_RENT : PRICE_PRESETS_SALE;

  // Check if non-residential type selected to toggle beds/baths visibility
  const selectedTypes = filters.type || [];
  const onlyCommercialOrLand =
    selectedTypes.length > 0 &&
    selectedTypes.every((t) => ['plot', 'shop', 'commercial', 'agricultural'].includes(t));

  const handleTypeToggle = (typeId) => {
    const current = [...(filters.type || [])];
    const index = current.indexOf(typeId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(typeId);
    }
    onFilterChange({ type: current });
  };

  const handleAreaToggle = (areaId) => {
    const current = [...(filters.area || [])];
    const index = current.indexOf(areaId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(areaId);
    }
    onFilterChange({ area: current });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. Listing Type Toggle */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Listing Type
        </label>
        <Tabs
          activeTab={filters.listingType || 'all'}
          onChange={(val) => {
            onFilterChange({
              listingType: val,
              minPrice: '',
              maxPrice: '',
            });
          }}
          tabs={[
            { id: 'all', label: 'All' },
            { id: 'sale', label: 'Buy' },
            { id: 'rent', label: 'Rent' },
          ]}
          fullWidth
          size="sm"
        />
      </div>

      {/* 2. Keyword Search */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
          Search Keyword or Code
        </label>
        <Input
          placeholder="e.g. 5 Marla, P001, Model Town..."
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          icon={Search}
        />
      </div>

      {/* 3. Property Types */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Property Type
          </label>
          {selectedTypes.length > 0 && (
            <button
              type="button"
              onClick={() => onFilterChange({ type: [] })}
              className="text-xs font-semibold text-primary-900 hover:underline"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PROPERTY_TYPES.map((pt) => {
            const isSelected = selectedTypes.includes(pt.id);
            return (
              <Chip key={pt.id} active={isSelected} onClick={() => handleTypeToggle(pt.id)}>
                {pt.shortLabel}
              </Chip>
            );
          })}
        </div>
      </div>

      {/* 4. Kasur Areas */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Locality in Kasur
          </label>
          {(filters.area || []).length > 0 && (
            <button
              type="button"
              onClick={() => onFilterChange({ area: [] })}
              className="text-xs font-semibold text-primary-900 hover:underline"
            >
              Reset
            </button>
          )}
        </div>
        <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
          {AREAS.map((area) => {
            const isChecked = (filters.area || []).includes(area.id);
            return (
              <label
                key={area.id}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-sm text-slate-800 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleAreaToggle(area.id)}
                  className="w-4 h-4 rounded text-primary-900 border-slate-300 focus:ring-primary-600"
                />
                <span className="font-medium line-clamp-1">{area.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Price Range & Quick Presets */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Price Range {isRent ? '(PKR / Month)' : '(PKR)'}
        </label>
        <div className="grid grid-cols-2 gap-2 mb-2.5">
          <Input
            placeholder="Min PKR"
            inputMode="numeric"
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange({ minPrice: e.target.value })}
          />
          <Input
            placeholder="Max PKR"
            inputMode="numeric"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
          />
        </div>
        {/* Quick Price Pills */}
        <div className="flex flex-wrap gap-1.5">
          {pricePresets.map((preset) => {
            const isActive = filters.minPrice === preset.min && filters.maxPrice === preset.max;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() =>
                  onFilterChange({
                    minPrice: isActive ? '' : preset.min,
                    maxPrice: isActive ? '' : preset.max,
                  })
                }
                className={`text-xs px-2.5 py-1 rounded-full font-semibold border transition-colors ${
                  isActive
                    ? 'bg-primary-900 text-white border-primary-900'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Bedrooms (hidden for purely commercial/plots) */}
      {!onlyCommercialOrLand && (
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Bedrooms
          </label>
          <div className="flex flex-wrap gap-1.5">
            {['any', '1', '2', '3', '4', '5'].map((b) => {
              const isSelected = (filters.beds || 'any') === b;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => onFilterChange({ beds: b })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors min-h-tap sm:min-h-0 ${
                    isSelected
                      ? 'bg-primary-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {b === 'any' ? 'Any' : b === '5' ? '5+ Beds' : `${b} Bed`}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. Bathrooms */}
      {!onlyCommercialOrLand && (
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Bathrooms
          </label>
          <div className="flex flex-wrap gap-1.5">
            {['any', '1', '2', '3', '4'].map((b) => {
              const isSelected = (filters.baths || 'any') === b;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => onFilterChange({ baths: b })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors min-h-tap sm:min-h-0 ${
                    isSelected
                      ? 'bg-primary-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {b === 'any' ? 'Any' : b === '4' ? '4+ Baths' : `${b} Bath`}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 8. Property Size Presets in Marla / Kanal */}
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Popular Sizes (Marla / Kanal)
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SIZE_PRESETS.map((preset) => {
            const isActive = filters.minSqft == preset.sqftMin && filters.maxSqft == preset.sqftMax;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() =>
                  onFilterChange({
                    minSqft: isActive ? '' : preset.sqftMin,
                    maxSqft: isActive ? '' : preset.sqftMax,
                  })
                }
                className={`text-xs px-2.5 py-1 rounded-full font-semibold border transition-colors ${
                  isActive
                    ? 'bg-primary-900 text-white border-primary-900'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 9. Extra Toggles */}
      <div className="pt-2 border-t border-slate-100 space-y-2.5">
        <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-slate-800">
          <input
            type="checkbox"
            checked={Boolean(filters.featuredOnly)}
            onChange={(e) => onFilterChange({ featuredOnly: e.target.checked })}
            className="w-4 h-4 rounded text-primary-900 border-slate-300 focus:ring-primary-600"
          />
          <span>Featured Properties Only</span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-slate-800">
          <input
            type="checkbox"
            checked={Boolean(filters.hasVideo)}
            onChange={(e) => onFilterChange({ hasVideo: e.target.checked })}
            className="w-4 h-4 rounded text-primary-900 border-slate-300 focus:ring-primary-600"
          />
          <span>Properties with Video Tour</span>
        </label>

        {isRent && (
          <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-slate-800">
            <input
              type="checkbox"
              checked={Boolean(filters.furnished)}
              onChange={(e) => onFilterChange({ furnished: e.target.checked })}
              className="w-4 h-4 rounded text-primary-900 border-slate-300 focus:ring-primary-600"
            />
            <span>Fully Furnished Only</span>
          </label>
        )}
      </div>

      {/* Reset & Apply Actions */}
      <div className="pt-4 border-t border-slate-200 space-y-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-btn bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-colors min-h-tap"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>

        {isMobileDrawer && (
          <button
            type="button"
            onClick={onApplyMobile}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-btn bg-primary-900 hover:bg-primary-800 text-white text-base font-bold shadow-md transition-colors min-h-tap"
          >
            <Check className="w-5 h-5" />
            <span>Apply Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
