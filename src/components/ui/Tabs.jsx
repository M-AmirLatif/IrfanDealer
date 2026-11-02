import React from 'react';

/**
 * Segmented Pill Tab Switcher
 */
export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  size = 'md',
  fullWidth = false,
  className = '',
}) {
  const sizes = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-2.5 px-5',
  };

  return (
    <div
      role="tablist"
      className={`inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 ${
        fullWidth ? 'w-full flex' : ''
      } ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`
              flex-1 inline-flex items-center justify-center font-bold rounded-lg transition-all duration-150 min-h-tap select-none
              ${sizes[size] || sizes.md}
              ${
                isActive
                  ? 'bg-primary-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }
            `}
          >
            {Icon && <Icon className="w-4 h-4 mr-1.5 shrink-0" />}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
