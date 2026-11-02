import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';
import { SITE_CONFIG } from '../../data/siteConfig';
import { buildTelLink, buildWhatsAppLink } from '../../utils/linkUtils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const popularAreas = [
    { name: 'Lahore Road', slug: 'lahore-road' },
    { name: 'Model Town', slug: 'model-town' },
    { name: 'Kasur City Center', slug: 'kasur-city-center' },
    { name: 'Railway Road', slug: 'railway-road' },
    { name: 'Bypass Road', slug: 'bypass-road' },
    { name: 'Chunian', slug: 'chunian' },
  ];

  const propertyTypes = [
    { label: 'Houses for Sale', path: '/properties?listingType=sale&type=house' },
    { label: 'Residential Plots', path: '/properties?type=plot' },
    { label: 'Commercial Shops & Plazas', path: '/properties?type=shop' },
    { label: 'Agricultural Land / Farmhouses', path: '/properties?type=agricultural' },
    { label: 'Rental Properties', path: '/properties?listingType=rent' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Bio Column */}
          <div className="space-y-4">
            <BrandLogo variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed">{SITE_CONFIG.shortDescription}</p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-accent-400">
              <ShieldCheck className="w-4 h-4 text-accent-400 shrink-0" />
              <span>Registered & Verified Property Consultancy</span>
            </div>
          </div>

          {/* Popular Areas */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 font-heading tracking-wide">
              Popular Kasur Areas
            </h3>
            <ul className="space-y-2.5 text-sm">
              {popularAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    to={`/areas/${area.slug}`}
                    className="hover:text-accent-400 transition-colors inline-block py-0.5"
                  >
                    Properties in {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 font-heading tracking-wide">
              Property Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {propertyTypes.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="hover:text-accent-400 transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 font-heading tracking-wide">
              Contact Irfan Umri
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">{SITE_CONFIG.address}</span>
              </li>
              <li>
                <a
                  href={buildTelLink(SITE_CONFIG.phoneRaw)}
                  className="flex items-center gap-3 hover:text-white transition-colors group"
                >
                  <Phone className="w-5 h-5 text-accent-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-white">{SITE_CONFIG.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink(
                    SITE_CONFIG.whatsappNumber,
                    'Hello Irfan Umri, I am interested in property guidance in Kasur.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-emerald-400 transition-colors group"
                >
                  <MessageCircle className="w-5 h-5 text-whatsapp shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-emerald-300">WhatsApp Inquiry</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent-400 shrink-0" />
                <span className="text-xs sm:text-sm">{SITE_CONFIG.email}</span>
              </li>
              <li className="flex items-start gap-3 text-xs text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="py-6 border-b border-slate-800 text-xs text-slate-400 leading-relaxed bg-slate-900/60 rounded-xl px-4 my-6">
          <p>
            <strong className="text-slate-300">Important Disclaimer:</strong>{' '}
            {SITE_CONFIG.disclaimer}
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {currentYear} {SITE_CONFIG.brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              About Irfan Umri
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact & Directions
            </Link>
            <Link to="/dealers" className="hover:text-white transition-colors">
              Authorized Dealers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
