import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  FileCheck,
  CheckCircle,
  Phone,
  MessageCircle,
  Building,
  Check,
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/ui/Button';
import { SITE_CONFIG } from '../data/siteConfig';
import { buildTelLink, buildWhatsAppLink } from '../utils/linkUtils';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function About() {
  useDocumentTitle(
    'About Umri Properties | Irfan Umri',
    'Learn about Kasur’s trusted real estate consultancy.'
  );

  const stats = [
    { value: '15+', label: 'Years of Experience', sub: 'Dedicated to Kasur real estate' },
    { value: '650+', label: 'Verified Deals Closed', sub: 'Residential, plots & farmland' },
    { value: '1,200+', label: 'Satisfied Families', sub: 'Honest transparent guidance' },
    { value: '100%', label: 'Registry Verification', sub: 'Patwari & revenue record checks' },
  ];

  const services = [
    {
      title: 'Buying Residential & Commercial Property',
      desc: 'Guidance in finding brand-new houses, verified plots, and high-footfall commercial shops that match your exact budget and legal criteria.',
    },
    {
      title: 'Selling with Maximum Fair Market Value',
      desc: 'Targeted marketing to genuine local buyers and overseas Pakistani investors looking to invest securely in Kasur.',
    },
    {
      title: 'Rental Management & Tenant Vetting',
      desc: 'Drafting formal 11-month registered rent agreements, tenant background scrutiny, and corporate leasing for commercial properties.',
    },
    {
      title: 'Agricultural Land Acquisition',
      desc: 'Expertise in canal irrigation rights (Warabandi), tube-well sweet water verification, and computerized revenue record (PLRA) checks in Chunian and Pattoki.',
    },
    {
      title: 'Legal Mutation (Intiqal) & Documentation Advisory',
      desc: 'Physical assistance at the sub-registrar office, stamp paper verification, and prompt tax advice for safe transfers.',
    },
    {
      title: 'Free Property Valuation & Market Appraisal',
      desc: 'Transparent pricing insights based on recent actual transaction records rather than speculative rumors.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 pb-16">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Section */}
      <div className="bg-primary-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-elevated">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-300 bg-primary-900 px-3.5 py-1.5 rounded-full inline-block border border-primary-700">
            About Umri Properties • Kasur
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Guiding Kasur Families & Investors With Total Integrity
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Founded by <strong>Irfan Umri</strong>, Umri Properties has stood for over 15 years as
            Kasur's most dependable real estate firm. We eliminate fraud and confusion by verifying
            every land record before a single rupee changes hands.
          </p>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-soft space-y-1"
          >
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-primary-900">
              {stat.value}
            </div>
            <div className="text-sm font-bold text-slate-900">{stat.label}</div>
            <div className="text-xs text-slate-500">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Founder Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-soft">
          <picture>
            <source type="image/webp" srcSet="/dealerimg.webp" />
            <img
              src="/dealerimg.jpg"
              alt="Irfan Umri - Founder of Umri Properties in Kasur"
              width={580}
              height={580}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute bottom-4 left-4 right-4 bg-primary-950/90 backdrop-blur-xs text-white p-4 rounded-2xl border border-white/10">
            <h4 className="text-lg font-bold font-heading">Irfan Umri</h4>
            <p className="text-xs text-accent-300">Founder & Chief Property Consultant • Kasur</p>
          </div>
        </div>

        <div className="space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-900 bg-primary-100 px-3 py-1 rounded-full inline-block">
            Our Story & Heritage
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            "A Property Deal Should Bring Peace of Mind, Not Anxiety"
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            For ordinary citizens, purchasing a home or agricultural land is the culmination of
            decades of hard work and savings. In an industry too often plagued by unclear titles,
            double bookings, and hidden commissions, Irfan Umri established Umri Properties with a
            single unwavering pledge:
            <strong> 100% verified documentation and honest face-to-face dealing.</strong>
          </p>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Whether you are acquiring a 3 Marla starter home on Lahore Road, an upscale bungalow in
            Model Town, a commercial shop on Railway Road, or 10 acres of tube-well irrigated
            farmland in Chunian, we accompany you at every step—from site demarcation to revenue
            registry.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200">
        <SectionHeading
          badge="Guiding Principles"
          title="Our Core Values"
          subtitle="How we conduct our consultancy every day across Kasur."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold font-heading text-slate-900">Absolute Transparency</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Direct discussions between buyer and seller. No inflated quotes or undisclosed
              intermediary commissions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-800 flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold font-heading text-slate-900">Legal Scrutiny</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We personally inspect the sub-registrar files, revenue Aks-Shajra, and computer PLRA
              records prior to token agreements.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-900 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold font-heading text-slate-900">Unmatched Local Roots</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              15 years on the ground means we know the genuine history of every neighborhood,
              colony, and chowk in Kasur.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="space-y-8">
        <SectionHeading
          badge="Our Capabilities"
          title="Full-Spectrum Real Estate Services"
          subtitle="Comprehensive advisory tailored for buyers, sellers, landlords, and overseas Pakistanis."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-900 flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <h4 className="text-base font-bold font-heading text-slate-900">{svc.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-900 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl space-y-6">
        <h3 className="text-2xl sm:text-4xl font-extrabold font-heading">
          Schedule a Free Consultation With Irfan Umri
        </h3>
        <p className="text-sm sm:text-base text-primary-100 max-w-xl mx-auto">
          Visit our Lahore Road office or connect directly on WhatsApp to discuss your property
          plans.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={buildTelLink(SITE_CONFIG.phoneRaw)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-btn bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm min-h-tap"
          >
            <Phone className="w-4 h-4 text-primary-900" />
            <span>Call {SITE_CONFIG.phoneDisplay}</span>
          </a>
          <a
            href={buildWhatsAppLink(
              SITE_CONFIG.whatsappNumber,
              'Hello Irfan Umri, I would like to schedule a consultation.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-btn bg-whatsapp hover:bg-whatsapp-hover text-slate-950 font-bold text-sm min-h-tap"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Us Directly</span>
          </a>
        </div>
      </div>
    </div>
  );
}
