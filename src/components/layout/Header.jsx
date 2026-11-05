import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, Clock, MapPin, Lock } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';
import { SITE_CONFIG } from '../../data/siteConfig';
import { NAV_LINKS } from '../../constants/routes';
import { buildTelLink, buildWhatsAppLink } from '../../utils/linkUtils';

function isLinkActive(linkPath, currentPathname, currentSearch) {
  if (linkPath === '/') {
    return currentPathname === '/';
  }
  if (linkPath.includes('?')) {
    const [path, query] = linkPath.split('?');
    if (currentPathname !== path) return false;
    const targetParams = new URLSearchParams(query);
    const currentParams = new URLSearchParams(currentSearch);
    for (const [key, val] of targetParams.entries()) {
      if (currentParams.get(key) !== val) return false;
    }
    return true;
  }
  return currentPathname === linkPath || currentPathname.startsWith(linkPath + '/');
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer upon navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle sticky header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-900 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Desktop Announcement Bar */}
      <div className="hidden lg:block bg-primary-950 text-slate-300 text-xs border-b border-primary-900/60 py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-accent-400" />
              Kasur, Punjab, Pakistan
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-accent-400" />
              {SITE_CONFIG.workingHours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="font-semibold text-emerald-300 hover:text-white transition-colors flex items-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 px-3 py-1 rounded-md border border-emerald-500/40 text-[11px]"
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              Dealer Portal
            </Link>
            <span className="text-slate-400">Direct Inquiries:</span>
            <a
              href={buildTelLink(SITE_CONFIG.phoneRaw)}
              className="font-semibold text-white hover:text-accent-400 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-accent-400" />
              {SITE_CONFIG.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-shadow duration-200 border-b border-slate-200/80 ${
          isScrolled ? 'shadow-md shadow-slate-900/5' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <BrandLogo />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.path, location.pathname, location.search);

                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-lg text-[15px] min-h-tap flex items-center transition-colors duration-75 ${
                      active
                        ? 'text-emerald-950 bg-emerald-100 font-bold'
                        : 'text-slate-700 hover:text-emerald-950 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-btn text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors min-h-tap"
                title="Dealer Portal Login"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dealer Login</span>
              </Link>

              <a
                href={buildWhatsAppLink(
                  SITE_CONFIG.whatsappNumber,
                  'Hello Irfan Umri, I am contacting you from the Umri Properties website.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-btn text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200 min-h-tap"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                <span>WhatsApp</span>
              </a>

              <a
                href={buildTelLink(SITE_CONFIG.phoneRaw)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn text-sm font-bold text-white bg-primary-900 hover:bg-primary-800 shadow-sm hover:shadow transition-all min-h-tap"
                aria-label={`Call ${SITE_CONFIG.phoneDisplay}`}
              >
                <Phone className="w-4 h-4 text-accent-400" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile Actions: Call Button & Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
              <Link
                to="/admin"
                className="flex items-center gap-1 px-2.5 py-2 rounded-btn bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-300 text-xs font-bold transition-colors"
                title="Dealer Login"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Login</span>
              </Link>

              <a
                href={buildTelLink(SITE_CONFIG.phoneRaw)}
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-btn bg-primary-50 text-primary-900 hover:bg-primary-100 border border-primary-200 transition-colors"
                aria-label="Call Irfan Umri"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary-900" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-btn text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <BrandLogo />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center w-10 h-10 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-primary-600"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link.path, location.pathname, location.search);
            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base min-h-tap transition-colors duration-75 ${
                  active
                    ? 'text-emerald-950 bg-emerald-100 font-bold'
                    : 'text-slate-800 hover:text-emerald-950 hover:bg-slate-50 font-semibold'
                }`}
              >
                <span>{link.label}</span>
                <span className={`text-lg ${active ? 'text-emerald-750 font-bold' : 'text-slate-400'}`}>›</span>
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-100 mt-4 text-xs text-slate-500 space-y-2 px-2">
            <p className="flex items-center gap-1.5 font-medium text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-primary-800" />
              Kasur, Punjab, Pakistan
            </p>
            <p className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary-800" />
              {SITE_CONFIG.workingHours}
            </p>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 space-y-3">
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-btn bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-sm hover:bg-emerald-100 transition-colors"
          >
            <Lock className="w-4 h-4 text-emerald-700" />
            <span>Dealer Admin Login</span>
          </Link>

          <a
            href={buildTelLink(SITE_CONFIG.phoneRaw)}
            className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-btn bg-primary-900 hover:bg-primary-800 text-white font-bold text-base shadow transition-colors min-h-tap"
          >
            <Phone className="w-5 h-5 text-accent-400" />
            <span>Call {SITE_CONFIG.phoneDisplay}</span>
          </a>

          <a
            href={buildWhatsAppLink(
              SITE_CONFIG.whatsappNumber,
              'Hello Irfan Umri, I am contacting you from the Umri Properties website.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-btn bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-base shadow-sm transition-colors min-h-tap"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>WhatsApp Irfan Umri</span>
          </a>
        </div>
      </div>
    </>
  );
}
