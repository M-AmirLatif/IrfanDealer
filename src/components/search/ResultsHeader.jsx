import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import SortSelect from './SortSelect';
import ActiveFilterChips from './ActiveFilterChips';

export default function ResultsHeader({
  total,
  loading,
  filters,
  sort,
  onSortChange,
  onRemoveFilter,
  onResetFilters,
  viewMode = 'grid',
  onViewModeChange,
  className = '',
}) {
  return (
    <div className={`space-y-4 mb-6 ${className}`}>
      {/* Upper row: Count + Sort + Grid/List Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
            Properties in Kasur
          </h1>
          <p className="text-sm font-semibold text-slate-500 mt-0.5">
            {loading ? (
              'Searching available properties...'
            ) : (
              <span>
                <strong className="text-primary-900 font-bold">{total}</strong>{' '}
                {total === 1 ? 'property' : 'properties'} found
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Desktop Grid / List View Toggle */}
          <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-primary-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-label="Grid view"
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-primary-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-label="List view"
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <SortSelect sort={sort} onChange={onSortChange} />
        </div>
      </div>

      {/* Lower row: Active Filter Chips */}
      <ActiveFilterChips filters={filters} onRemove={onRemoveFilter} onReset={onResetFilters} />
    </div>
  );
}
