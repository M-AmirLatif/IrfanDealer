import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building, Home } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import SectionHeading from '../components/common/SectionHeading';
import Input from '../components/ui/Input';
import { useAsync } from '../hooks/useAsync';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getAreas } from '../services/areaService';

export default function Areas() {
  useDocumentTitle(
    'Kasur Localities & Areas',
    'Explore residential and commercial sectors across Kasur district.'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const { data: areas, loading } = useAsync(getAreas);

  const filteredAreas = (areas || []).filter((a) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      <Breadcrumbs items={[{ label: 'Kasur Areas' }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-900 bg-primary-100 px-3 py-1 rounded-full inline-block mb-2">
            Kasur District Geography
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Explore Kasur Neighborhoods & Localities
          </h1>
          <p className="text-base text-slate-600 mt-2 max-w-2xl">
            From the bustling city center and prestigious Model Town to fertile agricultural tracts
            in Chunian and Pattoki. Find the right location for your needs.
          </p>
        </div>

        {/* Quick Search */}
        <div className="w-full md:w-72 shrink-0">
          <Input
            placeholder="Search locality name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[16/10] bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredAreas.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-base text-slate-600 font-semibold">
            No locality matches "{searchQuery}".
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-3 text-sm font-bold text-primary-900 underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAreas.map((area) => (
            <div
              key={area.id}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-elevated transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              {/* Photo Banner */}
              <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                <img
                  src={area.coverImage}
                  alt={area.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <h3 className="text-xl font-bold font-heading">{area.name}</h3>
                  <span className="text-xs font-mono font-bold bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
                    {area.postalCode}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {area.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {area.highlights?.slice(0, 3).map((h, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Property count badge row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-emerald-700" />
                    <span>{area.saleCount} for Sale</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-blue-700" />
                    <span>{area.rentCount} for Rent</span>
                  </span>
                  <span className="font-bold text-slate-900">{area.totalListings} Total</span>
                </div>

                {/* CTA Link */}
                <Link
                  to={`/areas/${area.slug}`}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-900 font-bold text-xs transition-colors min-h-tap"
                >
                  View Listings in {area.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
