import React from 'react';
import PropertyCard from './PropertyCard';
import { SkeletonPropertyCard } from '../ui/Skeleton';
import EmptyState from '../common/EmptyState';

export default function PropertyGrid({
  properties = [],
  loading = false,
  emptyTitle,
  emptyDescription,
  onResetFilters,
  columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  className = '',
}) {
  if (loading) {
    return (
      <div className={`grid ${columns} gap-6 ${className}`}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonPropertyCard key={i} />
        ))}
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <EmptyState title={emptyTitle} description={emptyDescription} onReset={onResetFilters} />
    );
  }

  return (
    <div className={`grid ${columns} gap-6 ${className}`}>
      {properties.map((prop) => (
        <PropertyCard key={prop.id} property={prop} />
      ))}
    </div>
  );
}
