import React, { useId } from 'react';

/**
 * Accessible Input field with label, error message, and prefix/suffix support
 */
export default function Input({
  label,
  name,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  icon: Icon,
  prefix,
  suffix,
  required = false,
  disabled = false,
  className = '',
  inputMode,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-slate-800">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}

        {prefix && (
          <span className="absolute left-3.5 text-sm font-semibold text-slate-500 pointer-events-none select-none">
            {prefix}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          inputMode={inputMode}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`
            w-full rounded-btn border text-base text-slate-900 bg-white min-h-tap transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent
            disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed
            ${Icon ? 'pl-11' : prefix ? 'pl-14' : 'pl-3.5'}
            ${suffix ? 'pr-12' : 'pr-3.5'}
            py-2.5
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 hover:border-slate-400'}
          `}
          {...props}
        />

        {suffix && (
          <span className="absolute right-3.5 text-sm font-semibold text-slate-500 pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </div>

      {error ? (
        <p id={errorId} className="text-xs text-red-600 font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
