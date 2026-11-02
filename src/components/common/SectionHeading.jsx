import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  actionText,
  actionLink,
  onActionClick,
  align = 'left',
  className = '',
}) {
  const isCentered = align === 'center';

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 ${
        isCentered ? 'text-center md:flex-col md:items-center' : ''
      } ${className}`}
    >
      <div className={`space-y-2 ${isCentered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
        {badge && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary-900 bg-primary-100/80 mb-1">
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{subtitle}</p>
        )}
      </div>

      {actionText && (
        <div className="shrink-0 pt-2 md:pt-0">
          {actionLink ? (
            <Link
              to={actionLink}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-primary-900 hover:text-primary-700 group transition-colors min-h-tap"
            >
              <span>{actionText}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={onActionClick}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-primary-900 hover:text-primary-700 group transition-colors min-h-tap"
            >
              <span>{actionText}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
