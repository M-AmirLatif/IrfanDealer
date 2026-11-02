import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  Map,
  Building,
  Store,
  Building2,
  Tractor,
  Trees,
  Briefcase,
  ShieldCheck,
  Award,
  Search,
  Phone,
  MessageCircle,
  FileCheck,
  Users,
  Compass,
  ArrowRight,
} from 'lucide-react';
import HeroSearch from '../components/search/HeroSearch';
import PropertyCard from '../components/property/PropertyCard';
import AreaCard from '../components/area/AreaCard';
import DealerCard from '../components/dealer/DealerCard';
import SectionHeading from '../components/common/SectionHeading';
import { SkeletonPropertyCard } from '../components/ui/Skeleton';
import { useAsync } from '../hooks/useAsync';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getFeaturedProperties, getLatestProperties } from '../services/propertyService';
import { getAreas } from '../services/areaService';
import { getDealers } from '../services/dealerService';
import { TESTIMONIALS } from '../data/testimonials';
import { SITE_CONFIG } from '../data/siteConfig';
import { buildTelLink, buildWhatsAppLink } from '../utils/linkUtils';

const CATEGORIES = [
  { id: 'house', label: 'Houses', icon: HomeIcon, color: 'bg-emerald-50 text-emerald-800' },
  { id: 'plot', label: 'Plots & Files', icon: Map, color: 'bg-amber-50 text-amber-800' },
  { id: 'flat', label: 'Apartments', icon: Building, color: 'bg-blue-50 text-blue-800' },
  { id: 'shop', label: 'Bazaar Shops', icon: Store, color: 'bg-purple-50 text-purple-800' },
  { id: 'commercial', label: 'Plazas', icon: Building2, color: 'bg-rose-50 text-rose-800' },
  { id: 'agricultural', label: 'Agri Land', icon: Tractor, color: 'bg-lime-50 text-lime-800' },
  { id: 'farmhouse', label: 'Farmhouses', icon: Trees, color: 'bg-teal-50 text-teal-800' },
  { id: 'office', label: 'Offices', icon: Briefcase, color: 'bg-slate-100 text-slate-800' },
];

export default function Home() {
  useDocumentTitle('Trusted Property Dealer in Kasur', SITE_CONFIG.shortDescription);

  const { data: featuredProps, loading: loadingFeatured } = useAsync(() =>
    getFeaturedProperties(6)
  );
  const { data: latestProps, loading: loadingLatest } = useAsync(() => getLatestProperties(6));
  const { data: areasData, loading: loadingAreas } = useAsync(getAreas);
  const { data: dealersData } = useAsync(getDealers);

  const activeDealer = dealersData?.[0];
  const topAreas = areasData ? areasData.slice(0, 6) : [];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 px-4 sm:px-6 lg:px-8 bg-primary-950 text-white overflow-hidden">
        {/* Background photo with dark contrast overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=70&fm=webp"
            alt="Properties in Kasur"
            className="w-full h-full object-cover opacity-20 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-primary-950/80 to-primary-950" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-900/90 border border-primary-700/60 text-xs sm:text-sm font-semibold text-accent-300 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-accent-400" />
            <span>Kasur’s Trusted Property Agency • Irfan Umri</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-tight">
            Find Your Perfect Property <br className="hidden sm:inline" />
            in <span className="text-accent-400">Kasur, Punjab</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Verified houses for sale, residential plots, commercial shops, and fertile agricultural
            farmland across Kasur district with 100% clear ownership.
          </p>

          {/* Embedded Search Widget */}
          <div className="pt-6 sm:pt-8 text-left">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* 2. QUICK CATEGORY ICONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-14 relative z-20 w-full overflow-hidden">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-soft border border-slate-200 w-full overflow-hidden">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">
            Browse by Property Category:
          </p>

          <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-1 w-full">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  to={`/properties?type=${cat.id}`}
                  className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-150 shrink-0 min-w-[90px] sm:min-w-0 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-110 ${cat.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 text-center leading-tight">
                    {cat.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Handpicked Deals"
          title="Featured Properties in Kasur"
          subtitle="Top rated houses, prime road plots, and high-yield commercial spots curated by Irfan Umri."
          actionText="View All Properties"
          actionLink="/properties"
        />

        {loadingFeatured ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonPropertyCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProps?.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </section>

      {/* 4. BROWSE BY AREA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Kasur Localities"
          title="Browse Properties by Area"
          subtitle="Discover residential and commercial properties across key sectors and towns of Kasur."
          actionText="Explore All 12 Areas"
          actionLink="/areas"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topAreas.map((area) => (
            <AreaCard key={area.id} area={area} />
          ))}
        </div>
      </section>

      {/* 5. LATEST LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Fresh On Market"
          title="Latest Property Listings"
          subtitle="Newly listed homes, commercial spaces, and farmland fresh to the Kasur market."
          actionText="View Complete Inventory"
          actionLink="/properties"
        />

        {loadingLatest ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonPropertyCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProps?.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </section>

      {/* 6. BUY / RENT SPLIT PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Buy Promo */}
          <div className="relative rounded-3xl overflow-hidden bg-primary-900 text-white p-8 sm:p-10 flex flex-col justify-between shadow-soft min-h-[280px]">
            <div className="relative z-10 space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white inline-block">
                Permanent Ownership
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Looking to Buy a Property?
              </h3>
              <p className="text-sm sm:text-base text-primary-100 max-w-md">
                From budget 3 Marla houses to 1 Kanal luxury villas and agricultural acres with
                clear registry.
              </p>
            </div>
            <div className="relative z-10 pt-6">
              <Link
                to="/properties?listingType=sale"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-btn bg-accent-500 hover:bg-accent-600 text-slate-950 font-bold text-sm shadow transition-colors min-h-tap"
              >
                <span>Browse Properties for Sale</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Rent Promo */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between shadow-soft min-h-[280px]">
            <div className="relative z-10 space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white inline-block">
                Rental Homes & Shops
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
                Looking to Rent in Kasur?
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-md">
                Find family houses, upper portions, retail shops, and commercial halls ready for
                lease.
              </p>
            </div>
            <div className="relative z-10 pt-6">
              <Link
                to="/properties?listingType=rent"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-btn bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow transition-colors min-h-tap"
              >
                <span>Browse Properties for Rent</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Umri Guarantee"
            title="Why Kasur Trusts Umri Properties"
            subtitle="Real estate transactions are life milestones. We safeguard your investment with genuine local integrity."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-900 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">
                15+ Years Local Expertise
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Deep ground knowledge of every mohallah, street, and agricultural union council in
                Kasur district.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-800 flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">
                100% Verified Records
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Strict revenue and patwari verification of registry, Fard-e-Milkiyat, and intiqal
                before listing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">Honest Dealings</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Direct buyer-to-seller table meetings with zero hidden commissions or artificially
                inflated rates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">
                Free Valuation Guidance
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unbiased market price estimates whether you are looking to sell immediately or plan
                for future wealth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MEET THE DEALER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Direct Guidance"
          title="Meet Your Kasur Property Consultant"
          subtitle="Work directly with Irfan Umri for transparent valuations, documentation check, and safe deals."
        />

        {activeDealer && <DealerCard dealer={activeDealer} />}
      </section>

      {/* 9. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Simple 3-Step Process"
          title="How It Works"
          subtitle="Finding and securing your property in Kasur is quick, straightforward, and stress-free."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft text-center space-y-4 relative">
            <div className="w-14 h-14 rounded-full bg-primary-900 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
              1
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900">Search & Filter</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explore 40+ authentic Kasur listings. Filter by your budget, locality, bedrooms, and
              Marla size.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft text-center space-y-4 relative">
            <div className="w-14 h-14 rounded-full bg-accent-500 text-slate-950 font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
              2
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900">Call or WhatsApp</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tap the instant WhatsApp or Call button on any listing to directly speak with Irfan
              Umri.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft text-center space-y-4 relative">
            <div className="w-14 h-14 rounded-full bg-emerald-700 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
              3
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900">Visit & Finalize</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Schedule an on-site physical visit, review the registered land records, and close with
              peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* 10. CLIENT TESTIMONIALS */}
      <section className="bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Customer Stories"
            title="What Our Clients Say"
            subtitle="Real feedback from families, commercial investors, and farmers who completed deals through Umri Properties."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-600" aria-label={`${item.rating} out of 5 stars`}>
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i} className="text-lg" aria-hidden="true">
                        ★
                      </span>
                    ))}
                    <span className="sr-only">{item.rating} out of 5 stars</span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-200"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.author}</p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CALL-TO-ACTION BAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white text-center shadow-xl space-y-6 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-accent-300 inline-block border border-white/10">
              Sell or Rent With Confidence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
              Looking to Sell or Rent Your Property in Kasur?
            </h2>
            <p className="text-base sm:text-lg text-primary-100 leading-relaxed">
              We connect your house, plot, or commercial shop with verified buyers and tenants
              across Kasur and overseas Pakistanis. Free valuation consultation.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <a
              href={buildTelLink(SITE_CONFIG.phoneRaw)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-btn bg-white hover:bg-slate-100 text-primary-950 font-bold text-base shadow transition-colors min-h-tap"
            >
              <Phone className="w-5 h-5 text-primary-900" />
              <span>Call Irfan Umri Now</span>
            </a>

            <a
              href={buildWhatsAppLink(
                SITE_CONFIG.whatsappNumber,
                'Hello Irfan Umri, I want to list/sell my property in Kasur. Please guide me.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-btn bg-whatsapp hover:bg-whatsapp-hover text-slate-950 font-bold text-base shadow transition-colors min-h-tap"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>WhatsApp Your Property Details</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
