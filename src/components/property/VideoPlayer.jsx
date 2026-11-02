import React, { useState } from 'react';
import { Play } from 'lucide-react';

export default function VideoPlayer({ video, className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video) return null;

  const isYouTube = video.type === 'youtube';

  return (
    <div
      className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-soft ${className}`}
    >
      {!isPlaying ? (
        // Click-to-load Facade (Optimized: Zero iframe overhead until user requests play)
        <div
          className="relative w-full h-full group cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={
              video.poster ||
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
            }
            alt="Video walkthrough thumbnail"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 brightness-90"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

          {/* Big Play Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 group-hover:bg-red-500 shadow-2xl flex items-center justify-center transition-transform group-hover:scale-110">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-wider bg-black/60 px-3 py-1 rounded-full uppercase backdrop-blur-xs">
              Watch Video Walkthrough
            </span>
          </div>
        </div>
      ) : isYouTube ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.url}?autoplay=1&rel=0`}
          title="Property Walkthrough Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      ) : (
        <video
          src={video.url}
          poster={video.poster}
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
