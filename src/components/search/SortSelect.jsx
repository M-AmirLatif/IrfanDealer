import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export default function SortSelect({ sort, onChange, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <label
        htmlFor="sort-dropdown"
        className="text-xs sm:text-sm font-semibold text-slate-600 shrink-0 flex items-center gap-1"
      >
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
        <span>Sort by:</span>
      </label>
      <select
        id="sort-dropdown"
        value={sort}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs sm:text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent min-h-tap sm:min-h-0"
      >
        <option value="newest">Newest Listed First</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="size_desc">Size: Largest First</option>
      </select>
    </div>
  );
}
