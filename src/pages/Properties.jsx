import React, { useState, useEffect, useCallback } from 'react';
import { SlidersHorizontal, ArrowUpDown, ChevronDown, RefreshCw } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ResultsHeader from '../components/search/ResultsHeader';
import FilterPanel from '../components/search/FilterPanel';
import FilterDrawer from '../components/search/FilterDrawer';
import PropertyCard from '../components/property/PropertyCard';
import { SkeletonPropertyCard } from '../components/ui/Skeleton';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/ui/Button';
import { useListingFilters } from '../hooks/useListingFilters';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getProperties } from '../services/propertyService';

const PAGE_SIZE = 12;

export default function Properties() {
  const { filters, sort, setFilters, setSort, resetFilters, removeFilterKey, activeFilterCount } =
    useListingFilters();

  useDocumentTitle(
    'Property Listings in Kasur',
    'Browse verified houses, plots, and land in Kasur.'
  );

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Pagination state (Load More)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [allMatchedProperties, setAllMatchedProperties] = useState([]);

  // Fetch properties matching current filters & sort
  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch full set to calculate local slice for Load More
      const response = await getProperties({
        filters,
        sort,
        page: 1,
        pageSize: 100, // retrieve full filtered array for smooth client load-more
      });
      setAllMatchedProperties(response.items || []);
    } catch (err) {
      console.error('Error loading properties:', err);
      setAllMatchedProperties([]);
    } finally {
      setLoading(false);
    }
  }, [filters, sort]);

  useEffect(() => {
    fetchListings();
    setVisibleCount(PAGE_SIZE); // reset visible count whenever filters/sort change
  }, [fetchListings]);

  const displayedProperties = allMatchedProperties.slice(0, visibleCount);
  const hasMore = visibleCount < allMatchedProperties.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Properties' }]} />

      {/* MOBILE STICKY FILTER & SORT BAR */}
      <div className="sticky top-18 z-30 lg:hidden -mx-4 px-4 py-3 bg-white/95 backdrop-blur-md border-b border-slate-200 mb-6 flex items-center gap-3 shadow-xs">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-btn bg-primary-900 text-white font-bold text-sm shadow-sm min-h-tap"
        >
          <SlidersHorizontal className="w-4 h-4 text-accent-400" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-accent-500 text-slate-950 font-extrabold text-xs flex items-center justify-center ml-1">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex-1">
          <select
            id="mobile-sort-select"
            aria-label="Sort properties"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full py-3 px-3 rounded-btn border border-slate-300 bg-white text-slate-900 font-bold text-xs min-h-tap focus:ring-2 focus:ring-primary-600 focus:outline-none"
          >
            <option value="newest">Sort: Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="size_desc">Size: Large First</option>
          </select>
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT (DESKTOP) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* DESKTOP STICKY LEFT FILTER SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-200/90 shadow-soft p-5 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <span className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary-900" />
                <span>Filters</span>
              </span>
              {activeFilterCount > 0 && (
                <span className="text-xs font-bold text-primary-900 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-200">
                  {activeFilterCount} Active
                </span>
              )}
            </div>

            <FilterPanel filters={filters} onFilterChange={setFilters} onReset={resetFilters} />
          </div>
        </aside>

        {/* RESULTS CONTENT AREA */}
        <main className="lg:col-span-3">
          <ResultsHeader
            total={allMatchedProperties.length}
            loading={loading}
            filters={filters}
            sort={sort}
            onSortChange={setSort}
            onRemoveFilter={removeFilterKey}
            onResetFilters={resetFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Loading Skeleton Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonPropertyCard key={i} />
              ))}
            </div>
          ) : displayedProperties.length === 0 ? (
            <EmptyState
              title="No Properties Match Your Filters"
              description="Try adjusting your budget, removing specific area restrictions, or clearing filters to view more properties."
              onReset={resetFilters}
            />
          ) : (
            <>
              {/* Properties Grid / List */}
              <div
                className={
                  viewMode === 'list'
                    ? 'space-y-4'
                    : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                }
              >
                {displayedProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    headingLevel="h2"
                    className={viewMode === 'list' ? 'sm:flex-row' : ''}
                  />
                ))}
              </div>

              {/* Load More Pagination */}
              {hasMore && (
                <div className="pt-10 text-center space-y-2">
                  <Button
                    variant="outline"
                    size="lg"
                    icon={ChevronDown}
                    onClick={handleLoadMore}
                    className="min-w-[200px] shadow-xs"
                  >
                    Load More Properties ({allMatchedProperties.length - visibleCount} remaining)
                  </Button>
                  <p className="text-xs text-slate-500">
                    Showing {displayedProperties.length} of {allMatchedProperties.length} properties
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Bottom-sheet Filter Drawer */}
      <FilterDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onReset={resetFilters}
        totalResults={allMatchedProperties.length}
      />
    </div>
  );
}
