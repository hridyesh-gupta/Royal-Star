
'use client';

import { useLanguage } from '../../components/LanguageProvider';

export default function ContactInfo() {
  const { language } = useLanguage();
  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-red-50">
      <div className="max-w-7xl mx-auto px-8">
        {/* <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-brand-charcoal" style={{ fontFamily: 'var(--font-pacifico)' }}>
            {language === 'fr' ? 'Visitez le Royal Star Café' : 'Visit Royal Star Cafe'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'fr'
              ? 'Là où l\'authenticité rencontre l\'hospitalité suisse'
              : 'Where authenticity meets Swiss hospitality'}
          </p>
        </div> */}

        <div className="grid md:grid-cols-3 gap-8 mb-16 items-stretch">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center flex flex-col h-full">
            <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-map-pin-line text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-brand-charcoal mb-4">
              {language === 'fr' ? 'Adresse' : 'Location'}
            </h3>
            <p className="text-gray-600 mb-2">Prom. des Champs-Fréchets 16, <br />CH-1217 Meyrin</p>
            <a 
              href="https://maps.app.goo.gl/84RrmAh3hDdGmtCt6"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer inline-block w-full text-center mt-auto"
            >
                {language === 'fr' ? 'Itinéraire' : 'Get Directions'}
              </a>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center flex flex-col h-full">
            <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-phone-line text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-brand-charcoal mb-4">
              {language === 'fr' ? 'Téléphone' : 'Phone'}
            </h3>
            <p className="text-gray-600 mb-2">+41 22 525 88 11</p>
            {/* <p className="text-gray-600 mb-4">077 938 51 69 / 077 998 07 46</p> */}
            <a
              href="tel:+41 22 525 88 11"
              className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer inline-block w-full text-center mt-auto"
            >
              {language === 'fr' ? 'Appeler' : 'Call Now'}
            </a>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center flex flex-col h-full">
            <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-mail-line text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-brand-charcoal mb-4">
              {language === 'fr' ? 'E-mail' : 'Email'}
            </h3>
            <p className="text-gray-600 mb-4">royal.star.geneve@gmail.com</p>
            {/* <p className="text-gray-600 mb-4">
              {language === 'fr' ? 'Nous répondons sous 12 heures' : 'We reply within 12 hours'}
            </p> */}
            <a 
              href="mailto:royal.star.geneve@gmail.com"
              className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer inline-block w-full text-center mt-auto"
            >
              {language === 'fr' ? 'Envoyer un e-mail' : 'Send Email'}
            </a>
          </div>
        </div>
{/* 
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xl font-semibold text-red-900 mb-4">
                {language === 'fr' ? 'Horaires quotidiens (Horaires d’ouverture)' : 'Daily Schedule (Opening Hours)'}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: language === 'fr'
                        ? 'Sam 08h00 - 00h00<br />Dim 08h00 - 22h30<br />Lun 07h30 - 22h00<br />Mar 07h30 - 22h00<br />Mer 07h30 - 22h00<br />Jeu 07h30 - 23h00<br />Ven 07h30 - 00h00'
                        : 'Sat 8:00 AM - 12:00 AM<br />Sun 8:00 AM - 10:30 PM<br />Mon 7:30 AM - 10:00 PM<br />Tue 7:30 AM - 10:00 PM<br />Wed 7:30 AM - 10:00 PM<br />Thu 7:30 AM - 11:00 PM<br />Fri 7:30 AM - 12:00 AM'
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-red-900 mb-4">
                {language === 'fr' ? 'Atouts du café' : 'Cafe Features'}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="ri-check-line text-brand-red mr-3"></i>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Cuisine indienne authentique' : 'Authentic Indian Cuisine'}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-red-500 mr-3"></i>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Hospitalité suisse' : 'Swiss Hospitality'}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-red-500 mr-3"></i>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Sélection de vins premium' : 'Premium Wine Collection'}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-red-500 mr-3"></i>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Ambiance familiale' : 'Family Dining Experience'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

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
