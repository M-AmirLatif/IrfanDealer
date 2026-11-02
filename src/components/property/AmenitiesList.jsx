import React from 'react';
import {
  Flame,
  Zap,
  Droplets,
  Waves,
  Shield,
  Compass,
  Trees,
  Navigation,
  UserCheck,
  Car,
  Flower2,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  ShoppingBag,
  HeartPulse,
} from 'lucide-react';
import { AMENITY_MAP } from '../../data/amenities';

const ICON_MAP = {
  Flame,
  Zap,
  Droplets,
  Waves,
  Shield,
  Compass,
  Trees,
  Navigation,
  UserCheck,
  Car,
  Flower2,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  ShoppingBag,
  HeartPulse,
};

export default function AmenitiesList({ amenities = [], className = '' }) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-soft ${className}`}
    >
      <h2 className="text-xl font-bold font-heading text-slate-900 mb-4 pb-3 border-b border-slate-100">
        Features & Infrastructure Amenities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {amenities.map((amenityId) => {
          const meta = AMENITY_MAP[amenityId] || {
            label: amenityId.replace('-', ' '),
            icon: 'CheckCircle2',
          };
          const Icon = ICON_MAP[meta.icon] || CheckCircle2;

          return (
            <div
              key={amenityId}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">{meta.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
