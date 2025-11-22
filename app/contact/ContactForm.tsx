
'use client';

import { useState } from 'react';
import { useLanguage } from '../../components/LanguageProvider';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { language } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-amber-900" style={{ fontFamily: 'var(--font-pacifico)' }}>
            {language === 'fr' ? 'Envoyez-nous un message' : 'Send Us a Message'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'fr'
              ? 'Nous serions ravis d’avoir de vos nouvelles ! Écrivez-nous et nous vous répondrons rapidement.'
              : "We'd love to hear from you! Drop us a line and we'll get back to you soon."}
          </p>
        </div>

        <div className="bg-amber-50 rounded-2xl p-8 shadow-lg">
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  {language === 'fr' ? 'Votre nom *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  placeholder={language === 'fr' ? 'Entrez votre nom complet' : 'Enter your full name'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  {language === 'fr' ? 'Adresse e-mail *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  placeholder={language === 'fr' ? 'Entrez votre e-mail' : 'Enter your email'}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  {language === 'fr' ? 'Numéro de téléphone' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  placeholder={language === 'fr' ? 'Ex. : +41 22 000 00 00' : '(555) 123-4567'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  {language === 'fr' ? 'Sujet *' : 'Subject *'}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  placeholder={language === 'fr' ? 'De quoi s’agit-il ?' : "What's this about?"}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                {language === 'fr' ? 'Message *' : 'Message *'}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                maxLength={500}
                className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none"
                placeholder={language === 'fr' ? 'Dites-nous en plus sur votre demande...' : 'Tell us more about your inquiry...'}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.message.length}/500 {language === 'fr' ? 'caractères' : 'characters'}
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                {language === 'fr'
                  ? 'Merci pour votre message ! Nous vous répondrons sous 24 heures.'
                  : "Thank you for your message! We'll get back to you within 24 hours."}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {language === 'fr'
                  ? 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'
                  : 'Something went wrong. Please try again or contact us directly.'}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {isSubmitting
                ? language === 'fr' ? 'Envoi en cours...' : 'Sending...'
                : language === 'fr' ? 'Envoyer le message' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}