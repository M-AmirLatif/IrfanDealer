import React from 'react';
import { formatPrice, formatPriceFull } from '../../utils/formatPrice';

export default function PriceTag({
  price,
  isRent = false,
  showFull = false,
  size = 'md',
  className = '',
}) {
  const formattedShort = formatPrice(price, { isRent });
  const formattedFull = formatPriceFull(price);

  const sizes = {
    sm: 'text-base font-bold',
    md: 'text-xl sm:text-2xl font-extrabold',
    lg: 'text-2xl sm:text-3xl lg:text-4xl font-extrabold',
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <span
        className={`${sizes[size] || sizes.md} text-primary-950 font-heading tracking-tight leading-none`}
      >
        {formattedShort}
      </span>
      {showFull && !isRent && (
        <span className="text-xs text-slate-500 font-medium mt-1">Exact: {formattedFull}</span>
      )}
    </div>
  );
}
