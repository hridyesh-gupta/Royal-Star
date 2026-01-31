'use client';

import { useState } from 'react';
import { useLanguage } from '../../components/LanguageProvider';

export default function ReservationForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    guests: '2',
    requests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'requests' && value.length > 500) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          date: '',
          time: '',
          name: '',
          email: '',
          phone: '',
          guests: '2',
          requests: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 md:py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8 text-center">
          <h1
            className="text-5xl font-bold mb-4 text-red-900"
            style={{ fontFamily: 'var(--font-pacifico)' }}
          >
            {language === 'fr' ? 'Réserver une table' : 'Reserve a Table'}
          </h1>
          <p className="text-xl text-red-800 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Choisissez la date, l\'heure et le nombre de convives pour votre prochaine expérience au Royal Star.'
              : 'Select your preferred date, time, and party size for your next Royal Star experience.'}
          </p>
        </div>

        <div className="bg-white border border-rose-200 rounded-3xl shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-red-900 mb-2">
                  {language === 'fr' ? 'Date *' : 'Date *'}
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-900 mb-2">
                  {language === 'fr' ? 'Heure *' : 'Time *'}
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-900 mb-2">
                {language === 'fr' ? 'Nom *' : 'Name *'}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-red-900 mb-2">
                  {language === 'fr' ? 'E-mail *' : 'Email *'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-900 mb-2">
                  {language === 'fr' ? 'Téléphone *' : 'Phone *'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-900 mb-2">
                {language === 'fr' ? 'Nombre de convives *' : 'Number of Guests *'}
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
              >
                <option value="1">1 {language === 'fr' ? 'invité' : 'Guest'}</option>
                <option value="2">2 {language === 'fr' ? 'invités' : 'Guests'}</option>
                <option value="3">3 {language === 'fr' ? 'invités' : 'Guests'}</option>
                <option value="4">4 {language === 'fr' ? 'invités' : 'Guests'}</option>
                <option value="5">5 {language === 'fr' ? 'invités' : 'Guests'}</option>
                <option value="6">6 {language === 'fr' ? 'invités' : 'Guests'}</option>
                <option value="7">7 {language === 'fr' ? 'invités' : 'Guests'}</option>
                <option value="8">8 {language === 'fr' ? 'invités' : 'Guests'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-900 mb-2">
                {language === 'fr'
                  ? 'Demandes particulières (max. 500 caractères)'
                  : 'Special Requests (Max 500 characters)'}
              </label>
              <textarea
                name="requests"
                value={formData.requests}
                onChange={handleChange}
                rows={5}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white resize-none"
                placeholder={
                  language === 'fr'
                    ? 'Allergies, restrictions alimentaires, occasion spéciale...'
                    : 'Dietary restrictions, allergies, special occasions...'
                }
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.requests.length}/500
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-sm">
                {language === 'fr'
                  ? 'Votre réservation a été enregistrée.'
                  : 'Your reservation request has been received.'}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm">
                {language === 'fr'
                  ? 'Une erreur s\'est produite. Veuillez réessayer plus tard.'
                  : 'Something went wrong. Please try again later.'}
              </div>
            )}

            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[180px] bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting
                  ? language === 'fr'
                    ? 'Envoi en cours...'
                    : 'Submitting...'
                  : language === 'fr'
                    ? 'Réserver une table'
                    : 'Reserve Table'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
