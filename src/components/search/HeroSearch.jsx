import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import Tabs from '../ui/Tabs';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { AREAS } from '../../data/areas';
import { PROPERTY_TYPES } from '../../data/propertyTypes';

const PRICE_OPTIONS_SALE = [
  { value: '5000000', label: 'Up to 50 Lakh' },
  { value: '10000000', label: 'Up to 1 Crore' },
  { value: '15000000', label: 'Up to 1.5 Crore' },
  { value: '25000000', label: 'Up to 2.5 Crore' },
  { value: '50000000', label: 'Up to 5 Crore' },
];

const PRICE_OPTIONS_RENT = [
  { value: '30000', label: 'Up to PKR 30,000 / mo' },
  { value: '50000', label: 'Up to PKR 50,000 / mo' },
  { value: '75000', label: 'Up to PKR 75,000 / mo' },
  { value: '100000', label: 'Up to PKR 1 Lakh / mo' },
  { value: '150000', label: 'Up to PKR 1.5 Lakh / mo' },
];

export default function HeroSearch({ className = '' }) {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState('sale');
  const [area, setArea] = useState('');
  const [type, setType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (listingType) params.set('listingType', listingType);
    if (area) params.set('area', area);
    if (type) params.set('type', type);
    if (maxPrice) params.set('maxPrice', maxPrice);

    navigate(`/properties?${params.toString()}`);
  };

  const currentPriceOptions = listingType === 'rent' ? PRICE_OPTIONS_RENT : PRICE_OPTIONS_SALE;

  return (
    <div
      className={`bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200/80 max-w-4xl mx-auto ${className}`}
    >
      {/* Listing Type Toggle Tabs */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <Tabs
          activeTab={listingType}
          onChange={(val) => {
            setListingType(val);
            setMaxPrice(''); // reset price preset when switching type
          }}
          tabs={[
            { id: 'sale', label: 'Buy Property' },
            { id: 'rent', label: 'Rent Property' },
          ]}
          size="md"
        />

        <Link
          to="/properties"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-primary-900 hover:text-primary-700 min-h-tap"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Advanced Search</span>
        </Link>
      </div>

      {/* Main Search Inputs Grid */}
      <form onSubmit={handleSearch} className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-4">
          {/* Locality Select */}
          <Select
            label="Location in Kasur"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="All Localities (Kasur)"
            options={AREAS.map((a) => ({ value: a.id, label: a.name }))}
          />

          {/* Property Type Select */}
          <Select
            label="Property Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="All Types (Houses, Plots...)"
            options={PROPERTY_TYPES.map((t) => ({ value: t.id, label: t.label }))}
          />

          {/* Max Budget Select */}
          <Select
            label={listingType === 'rent' ? 'Max Monthly Rent' : 'Max Budget'}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Any Budget"
            options={currentPriceOptions}
          />
        </div>

        {/* Submit Button & Mobile More Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={Search}
            className="shadow-md"
          >
            Search Properties
          </Button>

          <Link
            to="/properties"
            className="sm:hidden text-xs font-bold text-primary-900 py-1 inline-flex items-center gap-1"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>More filters (Beds, Size, Marla)</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
