import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Building2, 
  ArrowLeft, 
  Upload, 
  Trash2, 
  Star, 
  Video, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Save, 
  Plus, 
  DollarSign 
} from 'lucide-react';
import { 
  getPropertyBySlug, 
  createProperty, 
  updateProperty, 
  uploadMediaFile 
} from '../../services/propertyService';
import { AREAS } from '../../data/areas';
import { createSize } from '../../utils/formatSize';
import { formatPrice } from '../../utils/formatPrice';

const PROPERTY_TYPES = [
  { value: 'house', label: 'House / Kothi' },
  { value: 'plot', label: 'Residential Plot' },
  { value: 'commercial', label: 'Commercial Building / Plaza' },
  { value: 'shop', label: 'Shop / Retail' },
  { value: 'flat', label: 'Flat / Apartment' },
  { value: 'office', label: 'Office' },
  { value: 'agricultural', label: 'Agricultural Land / Acre' },
  { value: 'farmhouse', label: 'Farmhouse' },
];

const COMMON_AMENITIES = [
  'Electricity (WAPDA)',
  'Sui Gas Meter',
  'Clean Water Supply',
  'Underground Sewerage',
  'Boundary Wall',
  'Security Guard / CCTV',
  'Car Porch / Parking',
  'Lawn / Green Area',
  'Near Mosque',
  'Near Main Market',
  'Wide Carpeted Road',
  'Park Facing',
  'Corner Plot',
  'Commercial Frontage',
  'Tile Flooring',
  'Kitchen Cabinets',
];

export default function PropertyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    slug: '',
    description: '',
    listingType: 'sale',
    propertyType: 'house',
    price: '',
    priceUnit: 'total',
    isPriceNegotiable: true,
    securityDeposit: '',
    areaId: 'lahore-road',
    address: '',
    sizeValue: 5,
    sizeUnit: 'marla',
    bedrooms: 3,
    bathrooms: 3,
    kitchens: 1,
    floors: 2,
    parking: 1,
    furnishing: 'unfurnished',
    yearBuilt: 2024,
    facing: 'East',
    condition: 'Brand New',
    amenities: ['Electricity (WAPDA)', 'Clean Water Supply', 'Underground Sewerage'],
    documents: 'Direct Owner Registry & Intiqal Available',
    coverImage: '',
    images: [],
    videoUrl: '',
    videoTitle: '',
    isFeatured: false,
    status: 'available',
  });

  // Load property if editing
  useEffect(() => {
    if (isEditing) {
      async function load() {
        try {
          const item = await getPropertyBySlug(id);
          if (item) {
            setFormData({
              title: item.title || '',
              code: item.code || '',
              slug: item.slug || '',
              description: item.description || '',
              listingType: item.listingType || 'sale',
              propertyType: item.propertyType || 'house',
              price: item.price || '',
              priceUnit: item.priceUnit || 'total',
              isPriceNegotiable: Boolean(item.isPriceNegotiable),
              securityDeposit: item.securityDeposit || '',
              areaId: item.areaId || 'lahore-road',
              address: item.address || '',
              sizeValue: item.size?.value || 5,
              sizeUnit: item.size?.unit || 'marla',
              bedrooms: item.bedrooms ?? 0,
              bathrooms: item.bathrooms ?? 0,
              kitchens: item.kitchens ?? 0,
              floors: item.floors ?? 1,
              parking: item.parking ?? 0,
              furnishing: item.furnishing || 'unfurnished',
              yearBuilt: item.yearBuilt || 2024,
              facing: item.facing || '',
              condition: item.condition || '',
              amenities: Array.isArray(item.amenities) ? item.amenities : [],
              documents: item.documents || '',
              coverImage: item.coverImage || '',
              images: Array.isArray(item.images) ? item.images : [],
              videoUrl: item.video?.url || '',
              videoTitle: item.video?.title || '',
              isFeatured: Boolean(item.isFeatured),
              status: item.status || 'available',
            });
          } else {
            setError('Property not found');
          }
        } catch (err) {
          console.error(err);
          setError('Failed to load property');
        } finally {
          setLoading(false);
        }
      }
      load();
    }
  }, [id, isEditing]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  // Multiple Image Upload
  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploadingImage(true);
    setError('');

    try {
      const uploadPromises = files.map((file) => uploadMediaFile(file, 'photos'));
      const uploadedUrls = await Promise.all(uploadPromises);

      setFormData((prev) => {
        const newImages = [...prev.images, ...uploadedUrls];
        return {
          ...prev,
          images: newImages,
          // Set first uploaded image as cover image if none chosen
          coverImage: prev.coverImage || newImages[0] || '',
        };
      });
    } catch (err) {
      console.error('Image upload failed:', err);
      setError('Failed to upload image(s). Please check your file size (under 50MB).');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((_, idx) => idx !== indexToRemove);
      let updatedCover = prev.coverImage;
      if (prev.coverImage === prev.images[indexToRemove]) {
        updatedCover = updatedImages[0] || '';
      }
      return {
        ...prev,
        images: updatedImages,
        coverImage: updatedCover,
      };
    });
  };

  const handleSetCoverImage = (imgUrl) => {
    setFormData((prev) => ({ ...prev, coverImage: imgUrl }));
  };

  // Video Upload
  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    setError('');

    try {
      const videoUrl = await uploadMediaFile(file, 'videos');
      setFormData((prev) => ({
        ...prev,
        videoUrl,
        videoTitle: prev.videoTitle || 'Property Walkthrough Video',
      }));
    } catch (err) {
      console.error('Video upload failed:', err);
      setError('Failed to upload video file (limit 50MB).');
    } finally {
      setUploadingVideo(false);
      e.target.value = '';
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!formData.title.trim()) {
      setError('Please provide a property title.');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setError('Please provide a valid price in PKR.');
      return;
    }

    setSubmitting(true);

    try {
      // Build size object
      const sizeObj = createSize(Number(formData.sizeValue), formData.sizeUnit);

      // Build video object if provided
      const videoObj = formData.videoUrl
        ? {
            url: formData.videoUrl,
            title: formData.videoTitle || 'Property Video Walkthrough',
            platform: formData.videoUrl.includes('youtube') ? 'youtube' : 'direct',
          }
        : null;

      const payload = {
        title: formData.title.trim(),
        code: formData.code.trim() || undefined,
        slug: formData.slug.trim() || undefined,
        description: formData.description.trim(),
        listingType: formData.listingType,
        propertyType: formData.propertyType,
        price: Number(formData.price),
        priceUnit: formData.priceUnit,
        isPriceNegotiable: formData.isPriceNegotiable,
        securityDeposit: formData.securityDeposit ? Number(formData.securityDeposit) : null,
        areaId: formData.areaId,
        address: formData.address.trim(),
        size: sizeObj,
        bedrooms: Number(formData.bedrooms || 0),
        bathrooms: Number(formData.bathrooms || 0),
        kitchens: Number(formData.kitchens || 0),
        floors: Number(formData.floors || 1),
        parking: Number(formData.parking || 0),
        furnishing: formData.furnishing,
        yearBuilt: formData.yearBuilt ? Number(formData.yearBuilt) : null,
        facing: formData.facing,
        condition: formData.condition,
        amenities: formData.amenities,
        documents: formData.documents.trim(),
        coverImage: formData.coverImage || formData.images[0] || null,
        images: formData.images,
        video: videoObj,
        isFeatured: formData.isFeatured,
        status: formData.status,
        dealerId: 'irfan-umri',
      };

      if (isEditing) {
        await updateProperty(id, payload);
        setSuccessMsg('Property updated successfully!');
      } else {
        await createProperty(payload);
        setSuccessMsg('Property created and published successfully!');
      }

      setTimeout(() => {
        navigate('/admin');
      }, 1200);
    } catch (err) {
      console.error('Save failed:', err);
      setError(err.message || 'Failed to save property. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mb-3" />
        <p className="text-sm">Loading property data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <span className="text-xs text-slate-400">
          Listing Dealer: <strong className="text-slate-200">Irfan Umri</strong>
        </span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="border-b border-slate-800 pb-5 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {isEditing ? 'Edit Property Listing' : 'Add New Property Listing'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Fill in the details below. Once saved, this property will be immediately available to all website visitors.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Info */}
          <div>
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              1. Basic Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. 5 Marla Modern Double Storey House on Lahore Road"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Listing Type *
                </label>
                <select
                  value={formData.listingType}
                  onChange={(e) => handleChange('listingType', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Property Category *
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => handleChange('propertyType', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Property Code (Optional)
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  placeholder="e.g. P101 (Auto-generated if empty)"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Locality / Area in Kasur *
                </label>
                <select
                  value={formData.areaId}
                  onChange={(e) => handleChange('areaId', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  {AREAS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Street Address or Landmark
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="e.g. Street 4, Near Bilal Mosque, Main Boulevard"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing */}
          <div className="pt-6 border-t border-slate-800">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              2. Price & Payment Terms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Demand Price (in PKR) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="e.g. 13500000"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                {formData.price > 0 && (
                  <p className="text-xs text-emerald-400 mt-1 font-semibold">
                    Preview: {formatPrice(Number(formData.price), formData.listingType)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Price Unit
                </label>
                <select
                  value={formData.priceUnit}
                  onChange={(e) => handleChange('priceUnit', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="total">Total Price</option>
                  <option value="per_month">Per Month (Rent)</option>
                  <option value="per_marla">Per Marla</option>
                  <option value="per_kanal">Per Kanal</option>
                </select>
              </div>

              {formData.listingType === 'rent' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Security Deposit (PKR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.securityDeposit}
                    onChange={(e) => handleChange('securityDeposit', e.target.value)}
                    placeholder="e.g. 100000"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              <div className="sm:col-span-2 flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isPriceNegotiable"
                  checked={formData.isPriceNegotiable}
                  onChange={(e) => handleChange('isPriceNegotiable', e.target.checked)}
                  className="w-4 h-4 text-emerald-500 rounded bg-slate-950 border-slate-700"
                />
                <label htmlFor="isPriceNegotiable" className="text-xs font-medium text-slate-300">
                  Price is Negotiable (Kami Baishi Hosakti Hai)
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Physical Specifications */}
          <div className="pt-6 border-t border-slate-800">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">
              3. Size & Specifications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Area Size *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formData.sizeValue}
                  onChange={(e) => handleChange('sizeValue', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Area Unit *
                </label>
                <select
                  value={formData.sizeUnit}
                  onChange={(e) => handleChange('sizeUnit', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="marla">Marla</option>
                  <option value="kanal">Kanal</option>
                  <option value="sqft">Sq Ft</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) => handleChange('bedrooms', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={(e) => handleChange('bathrooms', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Kitchens
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.kitchens}
                  onChange={(e) => handleChange('kitchens', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Storeys / Floors
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.floors}
                  onChange={(e) => handleChange('floors', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Parking Spaces
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.parking}
                  onChange={(e) => handleChange('parking', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Furnishing
                </label>
                <select
                  value={formData.furnishing}
                  onChange={(e) => handleChange('furnishing', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi_furnished">Semi Furnished</option>
                  <option value="furnished">Fully Furnished</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Multiple Photos Upload */}
          <div className="pt-6 border-t border-slate-800">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              4. Property Photos (Multiple Upload)
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Upload multiple high-resolution photos of the property. Click the star ⭐ on any photo to set it as the cover image.
            </p>

            {/* Upload Button */}
            <div className="flex items-center gap-4 mb-4">
              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-sm font-semibold text-white cursor-pointer transition">
                {uploadingImage ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    Uploading photos to Supabase...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-emerald-400" />
                    Select & Upload Photos
                  </>
                )}
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  disabled={uploadingImage}
                  onChange={handleImagesUpload}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-slate-500">
                {formData.images.length} photo(s) selected
              </span>
            </div>

            {/* Gallery Previews */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                {formData.images.map((imgUrl, idx) => {
                  const isCover = formData.coverImage === imgUrl;
                  return (
                    <div
                      key={idx}
                      className={`relative group rounded-lg overflow-hidden border aspect-video ${
                        isCover ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-slate-800'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Action overlays */}
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSetCoverImage(imgUrl)}
                          title={isCover ? 'Cover Photo' : 'Make Cover Photo'}
                          className={`p-1.5 rounded-full ${
                            isCover ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                          }`}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          title="Remove Photo"
                          className="p-1.5 rounded-full bg-slate-800 text-red-400 hover:bg-red-900/60 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {isCover && (
                        <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-amber-400 text-slate-950 px-1 rounded shadow">
                          COVER
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 5: Video Walkthrough */}
          <div className="pt-6 border-t border-slate-800">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Video className="w-4 h-4" />
              5. Video Walkthrough (File Upload or URL)
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Showcase a video tour of the property. Upload an MP4 video or paste a YouTube video link.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Upload Video File (MP4/WebM)
                </label>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-white cursor-pointer transition w-full justify-center">
                  {uploadingVideo ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                      Uploading video...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-emerald-400" />
                      Select Video File (up to 50MB)
                    </>
                  )}
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    disabled={uploadingVideo}
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Or Paste Video Link (YouTube / Direct MP4)
                </label>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => handleChange('videoUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or .mp4"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {formData.videoUrl && (
              <div className="mt-3 p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300 truncate">
                  <Video className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{formData.videoUrl}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange('videoUrl', '')}
                  className="text-xs text-red-400 hover:underline font-semibold ml-2"
                >
                  Remove Video
                </button>
              </div>
            )}
          </div>

          {/* Section 6: Amenities */}
          <div className="pt-6 border-t border-slate-800">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
              6. Amenities & Facilities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2">
              {COMMON_AMENITIES.map((amenity) => {
                const isSelected = formData.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`text-left text-xs px-3 py-2 rounded-xl border transition ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {amenity}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 7: Description & Legal Documents */}
          <div className="pt-6 border-t border-slate-800">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">
              7. Description & Legal Documents
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Detailed Property Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe key features, society location, construction quality, water/gas status, and reasons to buy..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Land Ownership Documents / Title
                </label>
                <input
                  type="text"
                  value={formData.documents}
                  onChange={(e) => handleChange('documents', e.target.value)}
                  placeholder="e.g. Direct Owner Registry, Fard, Intiqal, LDA/TMA Approved"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 8: Publishing Controls */}
          <div className="pt-6 border-t border-slate-800">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">
              8. Status & Visibility
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Listing Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="available">Available for Public (Active)</option>
                  <option value="under_offer">Under Offer (Biana Done)</option>
                  <option value="sold">Sold Out</option>
                  <option value="rented">Rented Out</option>
                  <option value="inactive">Inactive / Draft (Hidden)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => handleChange('isFeatured', e.target.checked)}
                  className="w-4 h-4 text-emerald-500 rounded bg-slate-950 border-slate-700"
                />
                <label htmlFor="isFeatured" className="text-xs font-semibold text-slate-200">
                  Feature on Homepage (Top Listings Section)
                </label>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3">
            <Link
              to="/admin"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-sm font-semibold transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting || uploadingImage || uploadingVideo}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:cursor-not-allowed text-slate-950 font-bold text-sm shadow-lg shadow-emerald-950/40 transition hover:scale-[1.01]"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Listing...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEditing ? 'Save Changes' : 'Publish Property'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
