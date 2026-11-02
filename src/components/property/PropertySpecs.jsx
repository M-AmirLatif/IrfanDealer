import React from 'react';
import {
  Maximize2,
  Bed,
  Bath,
  Home,
  Layers,
  UtensilsCrossed,
  Calendar,
  Car,
  Compass,
  Sparkles,
  Sofa,
  FileText,
} from 'lucide-react';
import { formatSize } from '../../utils/formatSize';

export default function PropertySpecs({ property, className = '' }) {
  if (!property) return null;

  const isResidential = property.propertyType === 'house' || property.propertyType === 'flat';
  const isPlot = property.propertyType === 'plot';
  const isAgri = property.propertyType === 'agricultural';

  const facts = [
    {
      label: 'Property Size',
      value: formatSize(property.size, { includeSqft: true }),
      icon: Maximize2,
    },
    {
      label: 'Property Type',
      value: property.propertyType ? property.propertyType.toUpperCase() : 'N/A',
      icon: Home,
    },
    ...(isResidential && property.bedrooms
      ? [{ label: 'Bedrooms', value: `${property.bedrooms} Bedrooms`, icon: Bed }]
      : []),
    ...(isResidential && property.bathrooms
      ? [{ label: 'Bathrooms', value: `${property.bathrooms} Baths`, icon: Bath }]
      : []),
    ...(isResidential && property.kitchens
      ? [{ label: 'Kitchens', value: `${property.kitchens} Fitted`, icon: UtensilsCrossed }]
      : []),
    ...(isResidential && property.floors
      ? [{ label: 'Storeys / Floors', value: `${property.floors} Storey`, icon: Layers }]
      : []),
    ...(property.parking !== undefined && property.parking !== null
      ? [{ label: 'Car Parking', value: `${property.parking} Spaces`, icon: Car }]
      : []),
    ...(property.furnishing
      ? [{ label: 'Furnishing', value: property.furnishing.toUpperCase(), icon: Sofa }]
      : []),
    ...(property.yearBuilt
      ? [{ label: 'Year Built', value: `${property.yearBuilt}`, icon: Calendar }]
      : []),
    ...(property.facing
      ? [{ label: 'Facing Orientation', value: property.facing, icon: Compass }]
      : []),
    ...(property.condition
      ? [{ label: 'Condition', value: property.condition, icon: Sparkles }]
      : []),
    ...(property.documents
      ? [{ label: 'Ownership Documents', value: property.documents, icon: FileText }]
      : []),
  ];

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-soft ${className}`}
    >
      <h3 className="text-lg font-bold font-heading text-slate-900 mb-4 pb-3 border-b border-slate-100">
        Property Key Facts & Specifications
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {facts.map((fact, index) => {
          const Icon = fact.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-900 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary-900" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 block leading-tight">
                  {fact.label}
                </span>
                <span className="text-sm font-bold text-slate-900 leading-snug mt-0.5 block">
                  {fact.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
