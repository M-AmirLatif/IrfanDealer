import React, { useState } from 'react';
import { Phone, CheckCircle, Clock } from 'lucide-react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validatePakistaniPhone } from '../../utils/linkUtils';
import { requestCallback } from '../../services/inquiryService';

export default function CallbackModal({ isOpen, onClose, property, dealer }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('anytime');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!validatePakistaniPhone(phone)) {
      setError('Please enter a valid Pakistani phone number (e.g. 0300 1234567 or +923001234567).');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await requestCallback({
        propertyId: property?.id,
        propertyTitle: property?.title,
        name,
        phone,
        preferredTime,
      });
      setSuccess(true);
    } catch (err) {
      setError('Something went wrong submitting your request. Please call directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setName('');
    setPhone('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleResetAndClose} title="Request an Instant Callback">
      {success ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-9 h-9" />
          </div>
          <h3 className="text-xl font-bold font-heading text-slate-900">
            Callback Request Received!
          </h3>
          <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            Thank you, <strong>{name}</strong>. {dealer?.name || 'Irfan Umri'} will review your
            interest in <em>{property?.title}</em> and call you shortly at <strong>{phone}</strong>.
          </p>
          <Button variant="primary" size="md" onClick={handleResetAndClose} className="mt-4">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-900 block">Property of Interest:</span>
            <span className="line-clamp-1">
              {property?.title} (ID: {property?.code})
            </span>
          </div>

          <Input
            label="Your Full Name"
            placeholder="e.g. Muhammad Asif"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Mobile Phone Number"
            placeholder="0300 1234567"
            inputMode="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            helperText="Standard Pakistani mobile format (03XX or +923XX)"
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800">Preferred Callback Time</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'anytime', label: 'Anytime' },
                { id: 'morning', label: 'Morning' },
                { id: 'evening', label: 'Evening' },
              ].map((time) => (
                <button
                  key={time.id}
                  type="button"
                  onClick={() => setPreferredTime(time.id)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors min-h-tap sm:min-h-0 ${
                    preferredTime === time.id
                      ? 'bg-primary-900 text-white border-primary-900'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
                  }`}
                >
                  {time.label}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              icon={Phone}
            >
              Submit Callback Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
