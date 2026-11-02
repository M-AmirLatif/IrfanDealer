import React from 'react';

/**
 * Reusable Card Container with rounded-2xl, soft shadow, and border
 */
export default function Card({
  children,
  className = '',
  hoverEffect = false,
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={`
        bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden
        ${hoverEffect ? 'transition-all duration-200 hover:shadow-elevated hover:-translate-y-1 hover:border-slate-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
}
