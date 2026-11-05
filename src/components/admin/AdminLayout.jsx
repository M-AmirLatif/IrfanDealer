import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  PlusCircle, 
  ExternalLink, 
  LogOut, 
  Home, 
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out of Dealer Admin?')) {
      await signOut();
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand */}
            <div className="flex items-center gap-3">
              <Link to="/admin" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    Umri Properties
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Dealer Admin
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">Kasur Property Management</div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                All Properties
              </NavLink>
              <NavLink
                to="/admin/properties/new"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium inline-flex items-center gap-1.5 transition ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-semibold'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-sm'
                  }`
                }
              >
                <PlusCircle className="w-4 h-4" />
                Add Property
              </NavLink>
            </nav>

            {/* Right: Dealer Identity & Live Site & Logout */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-slate-200 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:bg-slate-800 transition"
              >
                View Website
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              {/* Dealer avatar badge */}
              <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
                <picture>
                  <source srcSet="/dealerimg.webp" type="image/webp" />
                  <img
                    src="/dealerimg.jpg"
                    alt="Irfan Umri"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/40"
                    width={32}
                    height={32}
                  />
                </picture>
                <div className="text-left text-xs">
                  <div className="font-semibold text-slate-200">Irfan Umri</div>
                  <div className="text-[10px] text-slate-400">irfan@umriproperties.pk</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Log out"
                className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              All Properties
            </Link>
            <Link
              to="/admin/properties/new"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-semibold bg-emerald-600 text-white"
            >
              + Add Property
            </Link>
            <Link
              to="/"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm text-slate-400 hover:bg-slate-800"
            >
              View Public Website
            </Link>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-300">
                Logged in as <span className="font-bold text-white">Irfan Umri</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-red-400 font-semibold px-2 py-1 rounded hover:bg-slate-800"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
