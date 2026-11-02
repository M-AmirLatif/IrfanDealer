import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../../data/siteConfig';
import { buildWhatsAppLink } from '../../utils/linkUtils';

export default function FloatingWhatsApp() {
  const defaultMessage =
    'Hello Irfan Umri, I am looking for property assistance in Kasur. Please share available options.';

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center group"
    >
      {/* Tooltip on hover/focus */}
      <span className="hidden md:inline-block mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with Irfan Umri
      </span>

      <a
        href={buildWhatsAppLink(SITE_CONFIG.whatsappNumber, defaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp chat with property dealer Irfan Umri"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400"
      >
        <MessageCircle className="w-8 h-8 fill-white" />
        {/* Subtle ping indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
      </a>
    </aside>
  );
}
