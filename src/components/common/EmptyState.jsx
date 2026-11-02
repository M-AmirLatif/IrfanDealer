import React from 'react';
import { SearchX, Phone, MessageCircle, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';
import { SITE_CONFIG } from '../../data/siteConfig';
import { buildTelLink, buildWhatsAppLink } from '../../utils/linkUtils';

export default function EmptyState({
  title = 'No Properties Found',
  description = 'We couldn’t find any properties matching your current search and filter combination.',
  onReset,
  showDirectHelp = true,
  className = '',
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-soft ${className}`}
    >
      <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-200">
        <SearchX className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-6">{description}</p>

      <div className="space-y-4">
        {onReset && (
          <Button
            variant="outline"
            size="md"
            icon={RotateCcw}
            onClick={onReset}
            className="w-full sm:w-auto"
          >
            Clear All Filters
          </Button>
        )}

        {showDirectHelp && (
          <div className="pt-6 border-t border-slate-100 text-left bg-slate-50 rounded-xl p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-primary-900 mb-1">
              Looking for something specific?
            </p>
            <p className="text-xs text-slate-600 mb-4">
              Irfan Umri frequently manages unlisted off-market plots, agricultural acres, and
              family houses across Kasur. Contact him directly:
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href={buildTelLink(SITE_CONFIG.phoneRaw)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-btn bg-primary-900 text-white text-xs font-bold hover:bg-primary-800 transition-colors min-h-tap"
              >
                <Phone className="w-4 h-4 text-accent-400" />
                <span>Call {SITE_CONFIG.phoneDisplay}</span>
              </a>
              <a
                href={buildWhatsAppLink(
                  SITE_CONFIG.whatsappNumber,
                  'Hello Irfan Umri, I could not find my required property on your website. Please assist me with custom options.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-btn bg-whatsapp text-white text-xs font-bold hover:bg-whatsapp-hover transition-colors min-h-tap"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Requirement</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
