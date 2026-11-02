import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Home, Building, TrendingUp, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PropertyCard from '../components/property/PropertyCard';
import { SkeletonPropertyCard } from '../components/ui/Skeleton';
import EmptyState from '../components/common/EmptyState';
import { getAreaBySlug } from '../services/areaService';
import { getProperties } from '../services/propertyService';
import { formatPrice } from '../utils/formatPrice';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function AreaDetails() {
  const { areaSlug } = useParams();
  const [area, setArea] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listingTypeFilter, setListingTypeFilter] = useState('all');

  useEffect(() => {
    async function loadArea() {
      setLoading(true);
      try {
        const areaData = await getAreaBySlug(areaSlug);
        setArea(areaData);

        const propsData = await getProperties({
          filters: { area: [areaSlug] },
          pageSize: 50,
        });
        setProperties(propsData.items || []);
      } catch (err) {
        console.error('Failed to load area data', err);
      } finally {
        setLoading(false);
      }
    }
    loadArea();
  }, [areaSlug]);

  useDocumentTitle(area ? `Properties in ${area.name}, Kasur` : 'Area Details', area?.description);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-6">
        <div className="h-6 bg-slate-200 rounded w-1/4"></div>
        <div className="h-48 bg-slate-200 rounded-3xl w-full"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonPropertyCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!area) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold font-heading text-slate-900">Area Not Found</h1>
        <p className="text-sm text-slate-600">The requested Kasur locality could not be found.</p>
        <Link
          to="/areas"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-primary-900 text-white font-bold text-sm"
        >
          View All Areas
        </Link>
      </div>
    );
  }

  const filteredListings = properties.filter((p) => {
    if (listingTypeFilter === 'all') return true;
    return p.listingType === listingTypeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      <Breadcrumbs items={[{ label: 'Kasur Areas', path: '/areas' }, { label: area.name }]} />

      {/* Area Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 sm:p-10 shadow-elevated">
        <img
          src={area.coverImage}
          alt={area.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-500/20 text-accent-300 border border-accent-400/30 text-xs font-bold uppercase">
            <MapPin className="w-3.5 h-3.5 text-accent-400" />
            <span>Kasur District • {area.postalCode}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Properties in {area.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{area.description}</p>

          {/* Computed Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-300 font-medium block">Total Properties</span>
              <span className="text-lg font-bold text-white">{area.totalListings}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-300 font-medium block">For Sale</span>
              <span className="text-lg font-bold text-emerald-400">{area.saleCount}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-300 font-medium block">For Rent</span>
              <span className="text-lg font-bold text-blue-400">{area.rentCount}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-300 font-medium block">
                Avg Price / Marla
              </span>
              <span className="text-lg font-bold text-accent-400">
                {area.avgPricePerMarla ? formatPrice(area.avgPricePerMarla) : 'Market rate'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Listing Type Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <h2 className="text-2xl font-bold font-heading text-slate-900">
          Available Listings ({filteredListings.length})
        </h2>

        <div className="flex items-center gap-2">
          {['all', 'sale', 'rent'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setListingTypeFilter(type)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors min-h-tap sm:min-h-0 ${
                listingTypeFilter === type
                  ? 'bg-primary-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              {type === 'all' ? 'All' : type === 'sale' ? 'For Sale' : 'For Rent'}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <EmptyState
          title={`No ${listingTypeFilter !== 'all' ? listingTypeFilter : ''} properties currently listed in ${area.name}`}
          description="We are regularly adding new verified houses, plots, and commercial spots in this locality."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      )}
    </div>
  );
}
