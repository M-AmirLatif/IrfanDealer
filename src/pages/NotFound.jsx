import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-sm font-bold uppercase tracking-wider text-primary-800">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">Page Not Found</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            The property or page you are looking for might have been sold, removed, or the link may
            be incorrect.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-btn bg-primary-900 hover:bg-primary-800 text-white font-semibold text-sm transition-colors min-h-tap"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/properties"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-btn bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors min-h-tap"
          >
            <Search className="w-4 h-4" />
            <span>Browse All Properties</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
