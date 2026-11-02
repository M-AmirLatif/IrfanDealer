import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Award, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { buildTelLink, buildWhatsAppLink } from '../../utils/linkUtils';

export default function DealerCard({ dealer, className = '' }) {
  if (!dealer) return null;

  return (
    <div
      className={`bg-white rounded-3xl border border-slate-200/90 shadow-soft hover:shadow-elevated transition-all duration-200 overflow-hidden flex flex-col md:flex-row ${className}`}
    >
      {/* Dealer Portrait Image */}
      <div className="md:w-72 lg:w-80 shrink-0 relative bg-slate-100 aspect-square md:aspect-auto">
        <picture>
          {dealer.photo?.endsWith('.jpg') && (
            <source
              type="image/webp"
              srcSet={dealer.photo.replace(/\.jpg$/, '.webp')}
            />
          )}
          <img
            src={dealer.photo}
            alt={`${dealer.name} - ${dealer.agencyName} Licensed Real Estate Consultant in Kasur`}
            width={580}
            height={580}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute top-4 left-4 bg-primary-950/80 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
          <Award className="w-3.5 h-3.5 text-accent-400" />
          <span>{dealer.experienceYears}+ Years Experience</span>
        </div>
      </div>

      {/* Details & Contact */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                {dealer.name}
              </h3>
              <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" title="Verified Dealer" />
            </div>
            <p className="text-sm font-semibold text-primary-900">
              {dealer.agencyName} • Licensed Real Estate Consultant
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{dealer.bio}</p>

          {/* Specializations */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Expertise & Specializations:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {dealer.specialization?.map((spec) => (
                <span
                  key={spec}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Areas Served */}
          <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 pt-1">
            <MapPin className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
            <span>
              <strong>Primary Areas:</strong> {dealer.areasServed?.join(', ')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <a
            href={buildTelLink(dealer.phone)}
            className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-btn bg-primary-900 hover:bg-primary-800 text-white font-bold text-sm shadow-sm transition-colors min-h-tap"
          >
            <Phone className="w-4 h-4 text-accent-400" />
            <span>Call {dealer.phoneDisplay}</span>
          </a>

          <a
            href={buildWhatsAppLink(
              dealer.whatsapp,
              `Hello ${dealer.name}, I would like to consult with you regarding property opportunities in Kasur.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-btn bg-whatsapp hover:bg-whatsapp-hover text-slate-950 font-bold text-sm shadow-sm transition-colors min-h-tap"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Dealer</span>
          </a>

          <Link
            to={`/dealers/${dealer.slug}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-btn bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors min-h-tap"
          >
            <span>View Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
