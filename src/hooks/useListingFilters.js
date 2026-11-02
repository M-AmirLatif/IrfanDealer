import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Custom hook to synchronize all real estate filters with URL query parameters.
 * Ensures shareability on WhatsApp and flawless browser back/forward navigation.
 */
export function useListingFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse current values from URL query string
  const filters = useMemo(() => {
    return {
      listingType: searchParams.get('listingType') || 'all',
      keyword: searchParams.get('keyword') || '',
      area: searchParams.get('area') ? searchParams.get('area').split(',').filter(Boolean) : [],
      type: searchParams.get('type') ? searchParams.get('type').split(',').filter(Boolean) : [],
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      beds: searchParams.get('beds') || 'any',
      baths: searchParams.get('baths') || 'any',
      minSqft: searchParams.get('minSqft') || '',
      maxSqft: searchParams.get('maxSqft') || '',
      featuredOnly: searchParams.get('featuredOnly') === 'true',
      hasVideo: searchParams.get('hasVideo') === 'true',
      furnished: searchParams.get('furnished') === 'true',
    };
  }, [searchParams]);

  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Update a single filter or multiple filters in URL
  const setFilters = useCallback(
    (newFilters, { resetPage = true } = {}) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);

          Object.entries(newFilters).forEach(([key, value]) => {
            if (
              value === undefined ||
              value === null ||
              value === '' ||
              value === 'all' ||
              value === 'any' ||
              value === false
            ) {
              next.delete(key);
            } else if (Array.isArray(value)) {
              if (value.length === 0) {
                next.delete(key);
              } else {
                next.set(key, value.join(','));
              }
            } else {
              next.set(key, String(value));
            }
          });

          if (resetPage) {
            next.delete('page');
          }

          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // Set sort
  const setSort = useCallback(
    (newSort) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (newSort === 'newest') {
            next.delete('sort');
          } else {
            next.set('sort', newSort);
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // Clear all filters
  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  // Remove a specific individual filter chip
  const removeFilterKey = useCallback(
    (key, specificValue = null) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (specificValue && (key === 'area' || key === 'type')) {
            const currentArr = (next.get(key) || '').split(',').filter(Boolean);
            const updated = currentArr.filter((item) => item !== specificValue);
            if (updated.length > 0) {
              next.set(key, updated.join(','));
            } else {
              next.delete(key);
            }
          } else {
            next.delete(key);
          }
          next.delete('page');
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // Count active non-default filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.listingType && filters.listingType !== 'all') count++;
    if (filters.keyword) count++;
    if (filters.area.length > 0) count += filters.area.length;
    if (filters.type.length > 0) count += filters.type.length;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.beds && filters.beds !== 'any') count++;
    if (filters.baths && filters.baths !== 'any') count++;
    if (filters.minSqft || filters.maxSqft) count++;
    if (filters.featuredOnly) count++;
    if (filters.hasVideo) count++;
    if (filters.furnished) count++;
    return count;
  }, [filters]);

  return {
    filters,
    sort,
    page,
    setFilters,
    setSort,
    resetFilters,
    removeFilterKey,
    activeFilterCount,
  };
}
