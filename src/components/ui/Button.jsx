import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button Component adhering to 48px min tap target and theme tokens
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-btn transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-tap disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-primary-900 hover:bg-primary-800 active:bg-primary-950 text-white shadow-sm hover:shadow focus-visible:ring-primary-700',
    secondary:
      'bg-accent-500 hover:bg-accent-600 text-slate-950 font-bold shadow-sm focus-visible:ring-accent-400',
    outline:
      'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 focus-visible:ring-slate-400',
    whatsapp:
      'bg-whatsapp hover:bg-whatsapp-hover text-slate-950 font-bold shadow-sm focus-visible:ring-emerald-500',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 focus-visible:ring-slate-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-base gap-2',
    lg: 'px-6 py-3.5 text-lg gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-5 h-5 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-5 h-5 shrink-0" />}
        </>
      )}
    </button>
  );
}
