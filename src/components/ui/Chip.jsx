import React from 'react';
import { X } from 'lucide-react';

/**
 * Filter Chip pill component with active and removable states
 */
export default function Chip({
  children,
  active = false,
  removable = false,
  onClick,
  onRemove,
  icon: Icon,
  className = '',
  disabled = false,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 select-none min-h-tap sm:min-h-0 sm:py-1
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700
        ${
          active
            ? 'bg-primary-900 text-white shadow-xs border border-primary-900'
            : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed hover:bg-white text-slate-400' : 'cursor-pointer'}
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {removable && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Remove filter"
          onClick={(e) => {
            e.stopPropagation();
            if (onRemove) onRemove();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              if (onRemove) onRemove();
            }
          }}
          className="ml-1 p-0.5 rounded-full hover:bg-black/20 focus:outline-none focus:ring-1 focus:ring-white"
        >
          <X className="w-3.5 h-3.5" />
        </span>
      )}
    </button>
  );
}
