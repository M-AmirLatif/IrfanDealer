import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { buildTelLink, buildWhatsAppLink } from '../../utils/linkUtils';

export default function StickyMobileBar({ property, dealer }) {
  if (!dealer) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappMessage = `Hello ${dealer.name}, I am interested in: ${property?.title} (ID: ${property?.code}). Link: ${currentUrl}`;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center gap-3 shadow-2xl"
      role="region"
      aria-label="Direct contact options"
    >
      <a
        href={buildTelLink(dealer.phone)}
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-btn bg-primary-900 text-white font-bold text-sm min-h-tap shadow-sm active:scale-95 transition-transform"
      >
        <Phone className="w-4 h-4 text-accent-400" />
        <span>Call Dealer</span>
      </a>

      <a
        href={buildWhatsAppLink(dealer.whatsapp, whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-btn bg-whatsapp text-slate-950 font-bold text-sm min-h-tap shadow-sm active:scale-95 transition-transform"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
