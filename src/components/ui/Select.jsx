import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Accessible Select component
 */
export default function Select({
  label,
  name,
  id,
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-semibold text-slate-800">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`
            w-full appearance-none rounded-btn border text-base text-slate-900 bg-white min-h-tap transition-colors duration-150
            pl-3.5 pr-10 py-2.5
            focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent
            disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 hover:border-slate-400'}
          `}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>

        <ChevronDown className="absolute right-3.5 w-5 h-5 text-slate-500 pointer-events-none" />
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
