import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  ExternalLink,
  Send,
  Building,
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import SectionHeading from '../components/common/SectionHeading';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { SITE_CONFIG } from '../data/siteConfig';
import { buildTelLink, buildWhatsAppLink, validatePakistaniPhone } from '../utils/linkUtils';
import { submitInquiry } from '../services/inquiryService';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Contact() {
  useDocumentTitle(
    'Contact Umri Properties | Kasur Office',
    'Reach Irfan Umri via phone, WhatsApp, or office visit.'
  );

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    intent: 'buy',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!validatePakistaniPhone(formData.phone)) {
      errs.phone =
        'Please provide a valid Pakistani mobile number (e.g. 0300 1234567 or +923001234567).';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const response = await submitInquiry(formData);
      setSuccessMessage(response.message);
      setFormData({ name: '', phone: '', intent: 'buy', message: '' });
    } catch (err) {
      setErrors({ form: 'An error occurred while submitting your message. Please call directly.' });
    } finally {
      setLoading(false);
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${SITE_CONFIG.mapCoordinates.lat},${SITE_CONFIG.mapCoordinates.lng}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-16">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <SectionHeading
        badge="Get in Touch"
        title="Contact Umri Properties"
        subtitle="Speak directly with Irfan Umri or visit our office in Kasur for personalized real estate guidance."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Info & Map Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft space-y-6">
            <h3 className="text-xl font-bold font-heading text-slate-900 pb-3 border-b border-slate-100">
              Office & Direct Contact Details
            </h3>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Office Location:</span>
                  <span className="text-slate-600 leading-relaxed">{SITE_CONFIG.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Working Hours:</span>
                  <span className="text-slate-600 block">{SITE_CONFIG.workingHours}</span>
                  <span className="text-xs text-amber-700 font-medium block mt-0.5">
                    {SITE_CONFIG.fridayBreak}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Direct Phone Line:</span>
                  <a
                    href={buildTelLink(SITE_CONFIG.phoneRaw)}
                    className="text-primary-900 font-bold hover:underline"
                  >
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MessageCircle className="w-5 h-5 text-whatsapp shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">WhatsApp Support:</span>
                  <a
                    href={buildWhatsAppLink(
                      SITE_CONFIG.whatsappNumber,
                      'Hello Irfan Umri, I am contacting you from your contact page.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    Start Instant WhatsApp Chat
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Email Address:</span>
                  <span className="text-slate-600">{SITE_CONFIG.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href={buildTelLink(SITE_CONFIG.phoneRaw)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-btn bg-primary-900 hover:bg-primary-800 text-white font-bold text-sm min-h-tap transition-colors"
              >
                <Phone className="w-4 h-4 text-accent-400" />
                <span>Call {SITE_CONFIG.phoneDisplay}</span>
              </a>
              <a
                href={buildWhatsAppLink(
                  SITE_CONFIG.whatsappNumber,
                  'Hello Irfan Umri, I have a property inquiry.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-btn bg-whatsapp hover:bg-whatsapp-hover text-slate-950 font-bold text-sm min-h-tap transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Map Placeholder Card (No heavy SDK) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold font-heading text-slate-900">
                Kasur Office Location Map
              </h4>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-primary-900 hover:text-primary-700 inline-flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="aspect-[16/7] rounded-2xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 bg-primary-900 text-white rounded-full flex items-center justify-center mb-2 shadow-md">
                <MapPin className="w-6 h-6 text-accent-400" />
              </div>
              <p className="text-sm font-bold text-slate-900">
                Lahore Road near Railway Crossing, Kasur
              </p>
              <p className="text-xs text-slate-500 mb-3">Shop # 12, Umri Commercial Plaza</p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-btn bg-white border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-50"
              >
                <ExternalLink className="w-3.5 h-3.5 text-primary-900" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Inquiry Form Column */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft space-y-6">
          <div>
            <h3 className="text-2xl font-bold font-heading text-slate-900">
              Send an Online Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Leave your contact info and required property details. We will respond promptly.
            </p>
          </div>

          {successMessage ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-emerald-950">Message Sent Successfully!</h4>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                {successMessage}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSuccessMessage('')}
                className="mt-2"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl">
                  {errors.form}
                </div>
              )}

              <Input
                label="Your Full Name"
                name="name"
                placeholder="e.g. Chaudhry Bilal"
                required
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Input
                label="Mobile Phone Number"
                name="phone"
                placeholder="0300 1234567"
                inputMode="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                helperText="Enter 11-digit Pakistani phone (03XX or +923XX)"
              />

              <Select
                label="I Want To:"
                name="intent"
                value={formData.intent}
                onChange={handleChange}
                placeholder=""
                options={[
                  { value: 'buy', label: 'Buy a Property in Kasur' },
                  { value: 'rent', label: 'Rent a House / Shop' },
                  { value: 'sell', label: 'Sell My House / Plot / Land' },
                  { value: 'valuation', label: 'Property Valuation & Guidance' },
                  { value: 'other', label: 'Other General Inquiry' },
                ]}
              />

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-sm font-semibold text-slate-800">
                  Message / Property Requirements (Optional)
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us what type of property, budget, or area in Kasur you are interested in..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-btn border border-slate-300 p-3 text-base text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={loading}
                  icon={Send}
                >
                  Send Inquiry Message
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
