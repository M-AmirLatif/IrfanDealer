import React from 'react';

/**
 * Shimmering skeleton primitives for loading placeholders
 */
export function SkeletonBox({ className = '' }) {
  return <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />;
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2.5 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-slate-200 rounded ${
            i === lines - 1 ? 'w-2/3' : i === 0 ? 'w-full' : 'w-5/6'
          }`}
        />
      ))}
    </div>
  );
}

export function SkeletonPropertyCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft animate-pulse flex flex-col">
      {/* 3:2 aspect ratio image container */}
      <div className="aspect-[3/2] w-full bg-slate-200" />
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="h-6 bg-slate-200 rounded-md w-1/2" />
          <div className="h-5 bg-slate-200 rounded w-4/5" />
          <div className="h-4 bg-slate-200 rounded w-3/5" />
        </div>
        <div className="h-8 bg-slate-100 rounded-lg w-full" />
        <div className="pt-2 border-t border-slate-100 flex gap-2">
          <div className="h-10 bg-slate-200 rounded-btn flex-1" />
          <div className="h-10 bg-slate-200 rounded-btn flex-1" />
        </div>
      </div>
    </div>
  );
}
