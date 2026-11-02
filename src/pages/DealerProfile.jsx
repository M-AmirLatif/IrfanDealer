import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Award,
  MapPin,
  CheckCircle,
  Clock,
  Mail,
  AlertTriangle,
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PropertyCard from '../components/property/PropertyCard';
import { SkeletonPropertyCard } from '../components/ui/Skeleton';
import EmptyState from '../components/common/EmptyState';
import { getDealerBySlug } from '../services/dealerService';
import { getPropertiesByDealer } from '../services/propertyService';
import { buildTelLink, buildWhatsAppLink } from '../utils/linkUtils';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function DealerProfile() {
  const { dealerSlug } = useParams();
  const [dealer, setDealer] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDealerData() {
      setLoading(true);
      try {
        const dealerData = await getDealerBySlug(dealerSlug);
        setDealer(dealerData);

        if (dealerData) {
          const propsData = await getPropertiesByDealer(dealerData.id);
          setProperties(propsData.items || []);
        }
      } catch (err) {
        console.error('Failed to load dealer profile', err);
      } finally {
        setLoading(false);
      }
    }
    loadDealerData();
  }, [dealerSlug]);

  useDocumentTitle(
    dealer ? `${dealer.name} - ${dealer.agencyName} | Kasur` : 'Dealer Profile',
    dealer?.bio
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-6">
        <div className="h-6 bg-slate-200 rounded w-1/4"></div>
        <div className="h-64 bg-slate-200 rounded-3xl w-full"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonPropertyCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!dealer) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold font-heading text-slate-900">Dealer Not Found</h1>
        <p className="text-sm text-slate-600">
          The requested property dealer profile could not be found.
        </p>
        <Link
          to="/dealers"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-primary-900 text-white font-bold text-sm"
        >
          View Authorized Dealers
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      <Breadcrumbs items={[{ label: 'Dealers', path: '/dealers' }, { label: dealer.name }]} />

      {/* Dealer Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-80 shrink-0 relative bg-slate-100 aspect-square md:aspect-auto">
          <picture>
            {dealer.photo?.endsWith('.jpg') && (
              <source
                type="image/webp"
                srcSet={dealer.photo.replace(/\.jpg$/, '.webp')}
              />
            )}
            <img
              src={dealer.photo}
              alt={`${dealer.name} - Property Consultant Profile`}
              width={580}
              height={580}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>

        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900">
                  {dealer.name}
                </h1>
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" title="Verified" />
              </div>
              <p className="text-base font-bold text-primary-900 mt-1">
                {dealer.agencyName} • Licensed Property Advisor
              </p>
            </div>

            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{dealer.bio}</p>

            {/* Specialization pills */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Specialized Property Categories:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dealer.specialization?.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-900 border border-primary-200"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-600">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-500 shrink-0" />
                <span>{dealer.address}</span>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-500 shrink-0" />
                <span>{dealer.workingHours}</span>
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-500 shrink-0" />
                <span>{dealer.email}</span>
              </span>
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent-500 shrink-0" />
                <span>{dealer.experienceYears}+ Years in Kasur Market</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
            <a
              href={buildTelLink(dealer.phone)}
              className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-btn bg-primary-900 hover:bg-primary-800 text-white font-bold text-sm shadow transition-colors min-h-tap"
            >
              <Phone className="w-4 h-4 text-accent-400" />
              <span>Call {dealer.phoneDisplay}</span>
            </a>

            <a
              href={buildWhatsAppLink(
                dealer.whatsapp,
                `Hello ${dealer.name}, I am reaching out through your dealer profile on Umri Properties.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-btn bg-whatsapp hover:bg-whatsapp-hover text-slate-950 font-bold text-sm shadow transition-colors min-h-tap"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>
      </div>

      {/* Managed Listings Section */}
      <div className="space-y-6 pt-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold font-heading text-slate-900">
            Listings Managed by {dealer.name} ({properties.length})
          </h2>
          <span className="text-xs font-semibold text-slate-500">Verified Physical Possession</span>
        </div>

        {properties.length === 0 ? (
          <EmptyState
            title="No Active Listings"
            description="All properties currently under this advisor’s portfolio are in negotiation or finalized."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
