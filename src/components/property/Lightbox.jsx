import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Fullscreen Lightbox supporting keyboard navigation (left, right, Esc),
 * visible arrow buttons, photo counter, and touch-swipe gestures.
 */
export default function Lightbox({ images = [], initialIndex = 0, isOpen, onClose }) {
  const safeImages = (Array.isArray(images) ? images : [])
    .map((img, idx) => {
      if (!img) return null;
      if (typeof img === 'string') return { url: img, alt: `Property photo ${idx + 1}` };
      return { url: img.url || img.src || '', alt: img.alt || `Property photo ${idx + 1}` };
    })
    .filter((img) => Boolean(img && img.url));

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, currentIndex, safeImages.length, onClose]);

  if (!isOpen || safeImages.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext(); // swipe left -> next
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev(); // swipe right -> prev
    }
  };

  const currentImg = safeImages[currentIndex] || safeImages[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery fullscreen view"
    >
      {/* Top Header Controls */}
      <div className="flex items-center justify-between p-4 sm:p-6 text-white z-20">
        <span className="text-sm font-bold tracking-wider bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
          {currentIndex + 1} / {safeImages.length}
        </span>

        <button
          type="button"
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400"
          aria-label="Close fullscreen gallery"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Display Area */}
      <div
        className="relative flex-1 flex items-center justify-center px-4 sm:px-16 overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button */}
        {safeImages.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Current Image */}
        <div className="max-w-5xl max-h-[75vh] flex flex-col items-center justify-center">
          <img
            src={currentImg?.url}
            alt={currentImg?.alt || 'Property photo'}
            className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-200"
          />
          {currentImg?.alt && (
            <p className="text-slate-300 text-xs sm:text-sm text-center mt-3 max-w-lg">
              {currentImg.alt}
            </p>
          )}
        </div>

        {/* Next Button */}
        {safeImages.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {safeImages.length > 1 && (
        <div className="p-4 bg-black/40 overflow-x-auto no-scrollbar flex items-center justify-center gap-2 z-20">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`w-16 h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                idx === currentIndex
                  ? 'border-accent-400 scale-105 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
