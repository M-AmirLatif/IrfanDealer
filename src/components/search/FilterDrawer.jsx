import React from 'react';
import Drawer from '../ui/Drawer';
import FilterPanel from './FilterPanel';

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Filter Properties" position="bottom">
      <div className="pb-6">
        <FilterPanel
          filters={filters}
          onFilterChange={onFilterChange}
          onReset={onReset}
          isMobileDrawer={true}
          onApplyMobile={onClose}
        />
      </div>

      {/* Sticky Bottom Apply Action Bar */}
      <div className="sticky bottom-0 -mx-5 -mb-4 bg-white/95 backdrop-blur-md p-4 border-t border-slate-200 flex gap-3 shadow-lg">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 py-3 px-4 rounded-btn border border-slate-300 text-slate-700 font-bold text-sm min-h-tap"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-2 py-3 px-6 rounded-btn bg-primary-900 text-white font-bold text-base min-h-tap shadow-md"
        >
          Show {totalResults !== undefined ? `${totalResults} Results` : 'Results'}
        </button>
      </div>
    </Drawer>
  );
}
