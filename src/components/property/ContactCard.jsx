import React, { useState } from 'react';
import { Phone, MessageCircle, Clock, ShieldCheck, UserCheck } from 'lucide-react';
import Button from '../ui/Button';
import CallbackModal from './CallbackModal';
import { buildTelLink, buildWhatsAppLink } from '../../utils/linkUtils';

export default function ContactCard({ property, dealer, className = '' }) {
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);

  if (!dealer) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappMessage = `Hello ${dealer.name}, I am interested in: ${property?.title} (ID: ${property?.code}). Link: ${currentUrl}`;

  return (
    <>
      <div
        className={`bg-white rounded-3xl border border-slate-200/90 shadow-soft p-5 sm:p-6 space-y-6 ${className}`}
      >
        {/* Dealer Header Profile */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <picture className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-primary-100">
            {dealer.photo?.endsWith('.jpg') && (
              <source
                type="image/webp"
                srcSet={dealer.photo.replace(/\.jpg$/, '.webp')}
              />
            )}
            <img
              src={dealer.photo}
              alt={`${dealer.name} - Property Dealer in Kasur`}
              width={64}
              height={64}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </picture>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-lg font-bold font-heading text-slate-900 leading-tight">
                {dealer.name}
              </h4>
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Dealer" />
            </div>
            <p className="text-xs font-semibold text-primary-900 mt-0.5">{dealer.agencyName}</p>
            <p className="text-[11px] text-slate-500 font-medium">
              Property Dealer • Kasur ({dealer.experienceYears}+ yrs exp)
            </p>
          </div>
        </div>

        {/* Working Hours note */}
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <Clock className="w-4 h-4 text-accent-500 shrink-0" />
          <span>{dealer.workingHours}</span>
        </div>

        {/* Big CTAs */}
        <div className="space-y-3">
          <a
            href={buildTelLink(dealer.phone)}
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-btn bg-primary-900 hover:bg-primary-800 text-white font-bold text-base shadow-sm transition-colors min-h-tap"
            aria-label={`Call ${dealer.name}`}
          >
            <Phone className="w-5 h-5 text-accent-400" />
            <span>Call {dealer.phoneDisplay}</span>
          </a>

          <a
            href={buildWhatsAppLink(dealer.whatsapp, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-btn bg-whatsapp hover:bg-whatsapp-hover text-slate-950 font-bold text-base shadow-sm transition-colors min-h-tap"
            aria-label={`WhatsApp ${dealer.name}`}
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>WhatsApp Direct Inquiry</span>
          </a>

          <Button
            variant="outline"
            size="md"
            fullWidth
            icon={UserCheck}
            onClick={() => setCallbackModalOpen(true)}
            className="text-slate-800 border-slate-300"
          >
            Request a Free Callback
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
          <p className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Direct seller coordination & zero hidden cuts
          </p>
          <p className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Physical document inspection before deal
          </p>
        </div>
      </div>

      {/* Callback Modal */}
      <CallbackModal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
        property={property}
        dealer={dealer}
      />
    </>
  );
}
