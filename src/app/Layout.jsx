import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingWhatsApp from '../components/layout/FloatingWhatsApp';
import ScrollToTop from '../components/common/ScrollToTop';
import ErrorBoundary from './ErrorBoundary';

function PageLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-8 min-h-[60vh]">
      <div className="h-8 bg-slate-200 rounded-lg w-1/3"></div>
      <div className="h-4 bg-slate-200 rounded w-2/3"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 space-y-4">
            <div className="h-48 bg-slate-200 rounded-xl"></div>
            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-10 bg-slate-200 rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-bg text-slate-800 selection:bg-primary-100 selection:text-primary-900">
      <ScrollToTop />
      <Header />
      <main id="main-content" tabIndex="-1" className="flex-1 focus:outline-none">
        <ErrorBoundary>
          <Suspense fallback={<PageLoadingSkeleton />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
