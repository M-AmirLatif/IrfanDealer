import React from 'react';

/**
 * Reusable Badge for statuses, listing types, and featured labels
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon,
}) {
  const baseStyles = 'inline-flex items-center font-bold tracking-wide rounded-md uppercase';

  const variants = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    sale: 'bg-emerald-700 text-white shadow-xs',
    rent: 'bg-blue-700 text-white shadow-xs',
    featured: 'bg-accent-500 text-slate-950 shadow-xs',
    video: 'bg-slate-900/80 backdrop-blur-sm text-white',
    sold: 'bg-red-700 text-white',
    rented: 'bg-amber-700 text-white',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    primary: 'bg-primary-50 text-primary-900 border border-primary-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant] || variants.default}
        ${sizes[size] || sizes.md}
        ${className}
      `}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
