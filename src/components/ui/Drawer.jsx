import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Responsive Drawer: Bottom-sheet on mobile (<640px) or slide-in from right/left
 */
export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'bottom', // 'bottom' (mobile sheet) | 'right'
  className = '',
}) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        ref={drawerRef}
        className={`
          relative z-10 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-out
          ${
            position === 'bottom'
              ? 'w-full max-h-[90vh] mt-auto rounded-t-3xl border-t border-slate-200'
              : 'w-full max-w-md h-full ml-auto rounded-l-2xl border-l border-slate-200'
          }
          ${className}
        `}
      >
        {/* Grab bar on mobile bottom sheet */}
        {position === 'bottom' && (
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-3 shrink-0" />
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 shrink-0">
          <h2 id="drawer-title" className="text-lg font-bold font-heading text-slate-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-primary-600"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
