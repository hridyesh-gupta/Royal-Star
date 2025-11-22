
'use client';

import { useLanguage } from '../../components/LanguageProvider';

export default function ContactInfo() {
  const { language } = useLanguage();
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-amber-900" style={{ fontFamily: 'var(--font-pacifico)' }}>
            {language === 'fr' ? 'Visitez le restaurant Royal Star' : 'Visit Royal Star Restaurant'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'fr'
              ? 'Découvrez une cuisine indienne authentique et l’hospitalité suisse à Meyrin.'
              : 'Experience authentic Indian cuisine meets Swiss hospitality in Meyrin'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-map-pin-line text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-4">
              {language === 'fr' ? 'Adresse' : 'Location'}
            </h3>
            <p className="text-gray-600 mb-2">16, Promenade des Champs-Fréchets</p>
            <p className="text-gray-600 mb-4">1217 Meyrin, Switzerland</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer">
              {language === 'fr' ? 'Itinéraire' : 'Get Directions'}
            </button>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-phone-line text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-4">
              {language === 'fr' ? 'Téléphone' : 'Phone'}
            </h3>
            <p className="text-gray-600 mb-2">+41 22 525 88 11</p>
            <p className="text-gray-600 mb-4">077 938 51 69 / 077 998 07 46</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer">
              {language === 'fr' ? 'Appeler' : 'Call Now'}
            </button>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-mail-line text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-4">
              {language === 'fr' ? 'E-mail' : 'Email'}
            </h3>
            <p className="text-gray-600 mb-4">royal.star.geneve@gmail.com</p>
            <p className="text-gray-600 mb-4">
              {language === 'fr' ? 'Nous répondons sous 12 heures' : 'We reply within 12 hours'}
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer">
              {language === 'fr' ? 'Envoyer un e-mail' : 'Send Email'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-amber-900 mb-6 text-center">
            {language === 'fr' ? 'Horaires d’ouverture' : 'Opening Hours'}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-amber-900 mb-4">
                {language === 'fr' ? 'Horaires quotidiens' : 'Daily Schedule'}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Lundi - Dimanche' : 'Monday - Sunday'}
                  </span>
                  <span className="font-medium text-amber-900">7:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-amber-900 mb-4">
                {language === 'fr' ? 'Atouts du restaurant' : 'Restaurant Features'}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="ri-check-line text-orange-500 mr-3"></i>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Cuisine indienne authentique' : 'Authentic Indian Cuisine'}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-orange-500 mr-3"></i>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Hospitalité suisse' : 'Swiss Hospitality'}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-orange-500 mr-3"></i>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Sélection de vins premium' : 'Premium Wine Collection'}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-orange-500 mr-3"></i>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Ambiance familiale' : 'Family Dining Experience'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2758.9!2d6.0835!3d46.2354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c653c8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2s16%20Promenade%20des%20Champs-Fr%C3%A9chets%2C%201217%20Meyrin%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
