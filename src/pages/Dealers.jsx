import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import DealerCard from '../components/dealer/DealerCard';
import { useAsync } from '../hooks/useAsync';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getDealers } from '../services/dealerService';

export default function Dealers() {
  useDocumentTitle('Authorized Property Dealers in Kasur', 'Meet licensed real estate consultants in Kasur.');

  const { data: dealers, loading } = useAsync(getDealers);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      <Breadcrumbs items={[{ label: 'Dealers' }]} />

      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-900 bg-primary-100 px-3 py-1 rounded-full inline-block mb-2">
          Verified Professional Network
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
          Authorized Property Dealers in Kasur
        </h1>
        <p className="text-base text-slate-600 mt-2 max-w-2xl">
          Meet licensed, experienced real estate advisors dedicated to safe property transfers, fair
          market evaluations, and verified revenue records.
        </p>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {dealers?.map((dealer) => (
            <DealerCard key={dealer.id} dealer={dealer} />
          ))}
        </div>
      )}
    </div>
  );
}
