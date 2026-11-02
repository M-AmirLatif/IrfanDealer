import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-surface-bg">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-soft p-8 text-center border border-slate-200">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-slate-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              An unexpected error occurred while loading this page. Please try refreshing or return
              to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-btn bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors min-h-tap"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-btn bg-primary-900 hover:bg-primary-800 text-white font-semibold text-sm transition-colors min-h-tap"
              >
                <Home className="w-4 h-4" />
                <span>Go to Home</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
