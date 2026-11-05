import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  PlusCircle, 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  Star, 
  ExternalLink, 
  TrendingUp, 
  Tag, 
  Key, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Filter
} from 'lucide-react';
import { 
  getAdminProperties, 
  deleteProperty, 
  updateProperty 
} from '../../services/propertyService';
import { formatPrice } from '../../utils/formatPrice';
import { AREAS } from '../../data/areas';

export default function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch properties
  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await getAdminProperties();
      setProperties(data);
    } catch (err) {
      console.error('Failed to load admin properties:', err);
      showNotification('Failed to load properties from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Toggle Featured status
  const handleToggleFeatured = async (property) => {
    try {
      setActionLoading(`feat-${property.id}`);
      const updated = await updateProperty(property.id, {
        ...property,
        isFeatured: !property.isFeatured,
      });
      setProperties((prev) =>
        prev.map((p) => (p.id === property.id ? { ...p, isFeatured: updated.isFeatured } : p))
      );
      showNotification(
        `Property ${property.code} is now ${!property.isFeatured ? 'Featured on Homepage' : 'unfeatured'}.`
      );
    } catch (err) {
      console.error('Error toggling featured:', err);
      showNotification('Failed to update featured status', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Quick Change Status
  const handleStatusChange = async (property, newStatus) => {
    try {
      setActionLoading(`status-${property.id}`);
      const updated = await updateProperty(property.id, {
        ...property,
        status: newStatus,
      });
      setProperties((prev) =>
        prev.map((p) => (p.id === property.id ? { ...p, status: updated.status } : p))
      );
      showNotification(`Property ${property.code} status changed to ${newStatus}.`);
    } catch (err) {
      console.error('Error updating status:', err);
      showNotification('Failed to update status', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Delete Property
  const handleDelete = async (property) => {
    const confirmText = `Are you sure you want to permanently delete property ${property.code} ("${property.title}")?`;
    if (!window.confirm(confirmText)) return;

    try {
      setActionLoading(`del-${property.id}`);
      await deleteProperty(property.id);
      setProperties((prev) => prev.filter((p) => p.id !== property.id));
      showNotification(`Property ${property.code} deleted successfully.`);
    } catch (err) {
      console.error('Error deleting property:', err);
      showNotification('Failed to delete property', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Computed metrics
  const totalCount = properties.length;
  const forSaleCount = properties.filter((p) => p.listingType === 'sale').length;
  const forRentCount = properties.filter((p) => p.listingType === 'rent').length;
  const totalViews = properties.reduce((acc, p) => acc + (p.views || 0), 0);

  // Filtered properties
  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      !searchTerm ||
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.areaId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesType = typeFilter === 'all' || p.listingType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getAreaName = (areaId) => {
    const area = AREAS.find((a) => a.id === areaId);
    return area ? area.name : areaId;
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm font-medium border ${
            notification.type === 'error'
              ? 'bg-red-950 border-red-500/50 text-red-200'
              : 'bg-emerald-950 border-emerald-500/50 text-emerald-200'
          }`}
        >
          {notification.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-850">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Properties Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your listings for Kasur real estate. Add, edit, upload photos and videos.
          </p>
        </div>
        <Link
          to="/admin/properties/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-950/40 transition hover:scale-[1.02]"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Property
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Listings</span>
            <Building2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Managed by Irfan Umri</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">For Sale</span>
            <Tag className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{forSaleCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Houses, plots & commercial</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">For Rent</span>
            <Key className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{forRentCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Residential & shops</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Views</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {totalViews.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Real visitor interest</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by code (e.g. P001), title, or area..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Types (Sale & Rent)</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="under_offer">Under Offer</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
            <option value="inactive">Inactive (Draft)</option>
          </select>
        </div>
      </div>

      {/* Property List / Table */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mb-3" />
          <p className="text-sm">Loading properties from Supabase...</p>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No properties found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search or filter criteria, or click "Add New Property" to upload a new listing.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Property</th>
                  <th className="py-3.5 px-4">Type & Area</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-center">Views</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProperties.map((p) => {
                  const isDeleting = actionLoading === `del-${p.id}`;
                  const isFeatLoading = actionLoading === `feat-${p.id}`;
                  const isStatusLoading = actionLoading === `status-${p.id}`;

                  return (
                    <tr key={p.id} className="hover:bg-slate-850/50 transition">
                      {/* Property Thumbnail & Info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.coverImage || '/placeholder-house.webp'}
                            alt={p.title}
                            className="w-14 h-11 object-cover rounded-lg bg-slate-800 border border-slate-750 flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src =
                                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&q=70';
                            }}
                          />
                          <div className="min-w-0 max-w-xs sm:max-w-md">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                {p.code}
                              </span>
                              <span className="text-xs font-semibold text-white truncate block">
                                {p.title}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 truncate mt-0.5">
                              {p.address || getAreaName(p.areaId)}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type & Area */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                p.listingType === 'sale'
                                  ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {p.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                            </span>
                            <span className="text-xs text-slate-300 capitalize">
                              {p.propertyType}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {getAreaName(p.areaId)}
                          </span>
                        </div>
                      </td>

                      {/* Price & Size */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-bold text-white text-xs">
                          {formatPrice(p.price, p.listingType)}
                        </div>
                        <div className="text-[11px] text-slate-400 capitalize">
                          {p.size?.value} {p.size?.unit}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {isStatusLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                        ) : (
                          <select
                            value={p.status || 'available'}
                            onChange={(e) => handleStatusChange(p, e.target.value)}
                            className={`text-[11px] font-semibold px-2 py-1 rounded-lg border focus:outline-none ${
                              p.status === 'available'
                                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                : p.status === 'sold'
                                ? 'bg-red-500/10 text-red-300 border-red-500/30'
                                : p.status === 'rented'
                                ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                                : p.status === 'under_offer'
                                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            <option value="available">Available</option>
                            <option value="under_offer">Under Offer</option>
                            <option value="sold">Sold</option>
                            <option value="rented">Rented</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        )}
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggleFeatured(p)}
                          disabled={isFeatLoading}
                          title={p.isFeatured ? 'Featured on Home (Click to remove)' : 'Click to Feature on Home'}
                          className={`p-1.5 rounded-lg transition ${
                            p.isFeatured
                              ? 'text-amber-400 hover:text-amber-300 bg-amber-500/10'
                              : 'text-slate-600 hover:text-slate-400'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-amber-400' : ''}`} />
                        </button>
                      </td>

                      {/* Views */}
                      <td className="py-3 px-4 text-center whitespace-nowrap text-xs text-slate-400">
                        {p.views || 0}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/properties/${p.slug || p.id}`}
                            target="_blank"
                            title="View Live Listing"
                            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            to={`/admin/properties/${p.id}/edit`}
                            title="Edit Listing"
                            className="p-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(p)}
                            disabled={isDeleting}
                            title="Delete Listing"
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition disabled:opacity-50"
                          >
                            {isDeleting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
