import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';

export default function AreaCard({ area, className = '' }) {
  if (!area) return null;

  return (
    <Link
      to={`/areas/${area.slug}`}
      className={`group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-slate-900 shadow-soft hover:shadow-elevated transition-all duration-300 block focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-700 ${className}`}
    >
      {/* Background Image with Dark Gradient Overlay */}
      <img
        src={area.coverImage}
        alt={area.name}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-85"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
        {/* Top badge */}
        <div className="flex justify-end">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
            <MapPin className="w-3 h-3 text-accent-400" />
            <span>Kasur</span>
          </span>
        </div>

        {/* Bottom Title & Stats */}
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-bold font-heading text-white group-hover:text-accent-400 transition-colors flex items-center justify-between">
            <span>{area.name}</span>
            <ChevronRight className="w-5 h-5 text-accent-400 transform group-hover:translate-x-1 transition-transform" />
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            {area.totalListings !== undefined
              ? `${area.totalListings} Properties Listed`
              : 'View Localities'}
          </p>
        </div>
      </div>
    </Link>
  );
}
