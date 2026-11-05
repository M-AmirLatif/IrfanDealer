import React, { useState, useRef } from 'react';
import { Camera, Video as VideoIcon, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import Lightbox from './Lightbox';
import VideoPlayer from './VideoPlayer';

export default function PropertyGallery({ images = [], video = null, coverImage = '', className = '' }) {
  const [activeMedia, setActiveMedia] = useState('photos'); // 'photos' | 'video'
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Normalize images: supports both string URLs and { url, alt } objects, plus coverImage fallback
  const rawList = Array.isArray(images) && images.length > 0 
    ? images 
    : (coverImage ? [coverImage] : []);

  const normalizedImages = rawList
    .map((img, idx) => {
      if (!img) return null;
      if (typeof img === 'string') {
        return { url: img, alt: `Property photo ${idx + 1}` };
      }
      return {
        url: img.url || img.src || '',
        alt: img.alt || `Property photo ${idx + 1}`,
      };
    })
    .filter((img) => Boolean(img && img.url));

  const safeImages = normalizedImages.length > 0 
    ? normalizedImages 
    : [{ url: '/placeholder-house.webp', alt: 'Property preview photo' }];

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  // Touch swipe support for main preview image
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 40) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -40) {
      handlePrev();
    }
  };

  const currentImage = safeImages[activeImageIndex] || safeImages[0];

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Media Type Toggle when video exists */}
      {video && (
        <div className="flex items-center gap-2 mb-1">
          <button
            type="button"
            onClick={() => setActiveMedia('photos')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-tap ${
              activeMedia === 'photos'
                ? 'bg-primary-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Photos ({safeImages.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMedia('video')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-tap ${
              activeMedia === 'video'
                ? 'bg-primary-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <VideoIcon className="w-4 h-4 text-red-500" />
            <span>Video Walkthrough</span>
          </button>
        </div>
      )}

      {/* Main Preview Container */}
      {activeMedia === 'video' && video ? (
        <VideoPlayer video={video} />
      ) : (
        <div className="space-y-3">
          <div
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-soft group cursor-pointer"
            onClick={() => setLightboxOpen(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={currentImage.url}
              alt={currentImage.alt || 'Property preview photo'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
            />

            {/* Dark bottom gradient for photo caption & controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Image counter pill */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xs text-xs font-bold text-white border border-white/20">
                <Camera className="w-3.5 h-3.5" />
                <span>
                  {activeImageIndex + 1} / {safeImages.length}
                </span>
              </span>
            </div>

            {/* Click to expand full screen */}
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xs text-xs font-bold text-white border border-white/20 group-hover:bg-primary-900 transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fullscreen</span>
              </span>
            </div>

            {/* Previous & Next Arrows on main image */}
            {safeImages.length > 1 && (
              <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Alt text overlay at bottom */}
            {currentImage.alt && (
              <div className="absolute bottom-3 left-4 right-4 text-xs sm:text-sm font-medium text-white line-clamp-1 pointer-events-none">
                {currentImage.alt}
              </div>
            )}
          </div>

          {/* Thumbnail Strip (Scrollable) */}
          {safeImages.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
              {safeImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`View photo ${idx + 1} of ${safeImages.length}`}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 sm:w-24 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activeImageIndex
                      ? 'border-primary-900 ring-2 ring-primary-500/40 opacity-100 scale-102'
                      : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      <Lightbox
        images={safeImages}
        initialIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
