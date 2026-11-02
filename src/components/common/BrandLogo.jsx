import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Brand Logo component featuring an emerald & gold house emblem
 * and clear typography designed for high readability.
 */
export default function BrandLogo({ variant = 'default', className = '' }) {
  const isLight = variant === 'light';

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-lg py-1 ${className}`}
      aria-label="Umri Properties - Home"
    >
      {/* SVG Icon Emblem */}
      <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-primary-900 shadow-md transition-transform duration-200 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-white"
          aria-hidden="true"
        >
          {/* House body */}
          <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H4a1 1 0 0 1-1-1v-9.5z" />
          {/* Chimney / accent roof */}
          <path d="M19 8V5h-3" />
        </svg>
        {/* Gold accent dot / keyhole emblem */}
        <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-500 ring-2 ring-primary-900" />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span
          className={`font-heading text-base sm:text-lg lg:text-xl font-bold tracking-tight leading-none ${
            isLight ? 'text-white' : 'text-slate-900'
          }`}
        >
          Umri{' '}
          <span className={isLight ? 'text-accent-300' : 'text-accent-700'}>Properties</span>
        </span>
        <span
          className={`text-[10px] sm:text-xs font-medium tracking-wide mt-0.5 leading-none hidden xs:block ${
            isLight ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          Kasur Property Dealer
        </span>
      </div>
    </Link>
  );
}
