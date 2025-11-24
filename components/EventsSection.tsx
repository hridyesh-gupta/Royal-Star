
'use client';

import Link from 'next/link';
export default function EventsSection() {
  const { language } = require('./LanguageProvider').useLanguage();
  const events = [
    {
      date: 'Dec 15',
      titleEn: 'Wine Tasting Evening',
      titleFr: 'Soirée dégustation de vins',
      descriptionEn: 'Join us for an exclusive Swiss wine tasting featuring selections from local vineyards',
      descriptionFr: 'Participez à une dégustation exclusive de vins suisses avec une sélection de caves locales.',
      time: '7:00 PM',
      priceEn: 'CHF 65 per person',
      priceFr: 'CHF 65 par personne'
    },
    {
      date: 'Dec 25',
      titleEn: 'Christmas Feast',
      titleFr: 'Festin de Noël',
      descriptionEn: 'Traditional Swiss Christmas dinner with festive specialties and live music',
      descriptionFr: 'Dîner de Noël suisse traditionnel avec spécialités festives et musique live.',
      time: '6:30 PM',
      priceEn: 'CHF 85 per person',
      priceFr: 'CHF 85 par personne'
    },
    {
      date: 'Dec 31',
      titleEn: 'New Year Gala',
      titleFr: 'Gala du Nouvel An',
      descriptionEn: 'Ring in the New Year with a luxurious 5-course dinner and champagne',
      descriptionFr: 'Célébrez la nouvelle année avec un dîner gastronomique 5 services et champagne.',
      time: '8:00 PM',
      priceEn: 'CHF 125 per person',
      priceFr: 'CHF 125 par personne'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-red-50 to-red-50 py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-red-900 mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
            {language === 'fr' ? 'Événements & dîners spéciaux' : 'Special Events & Dining'}
          </h2>
          <p className="text-xl text-red-800 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Vivez des soirées inoubliables au Royal Star Café avec nos événements spéciaux et nos expériences gastronomiques à thème.'
              : 'Experience unforgettable evenings at Royal Star Cafe with our curated special events and themed dining experiences.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-r from-red-500 to-red-500 p-6 text-white text-center">
                <div className="text-3xl font-bold mb-2">{event.date}</div>
                <div className="text-lg">{event.time}</div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-red-900 mb-3" style={{ fontFamily: 'var(--font-pacifico)' }}>
                  {language === 'fr' ? event.titleFr : event.titleEn}
                </h3>
                <p className="text-red-700 mb-4 leading-relaxed">
                  {language === 'fr' ? event.descriptionFr : event.descriptionEn}
                </p>
                {/* <div className="text-xl font-bold text-red-600 mb-4">
                  {language === 'fr' ? event.priceFr : event.priceEn}
                </div> */}
                <Link href="/reservation">
                  <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-bold transition-colors duration-300 whitespace-nowrap cursor-pointer">
                    {language === 'fr' ? 'Réserver' : 'Reserve Now'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center px-4">
  <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto overflow-hidden">
    <h3
      className="text-2xl sm:text-3xl font-bold text-red-900 mb-4"
      style={{ fontFamily: 'var(--font-pacifico)' }}
    >
      {language === 'fr' ? 'Salle privée disponible' : 'Private Dining Available'}
    </h3>

    <p className="text-red-800 mb-6 leading-relaxed break-words">
      {language === 'fr'
        ? "Organisez vos occasions spéciales dans notre élégante salle à manger privée. Parfaite pour les célébrations, les dîners d’affaires et les réunions intimes."
        : 'Host your special occasions in our elegant private dining room. Perfect for celebrations, business dinners, and intimate gatherings.'}
    </p>

    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-red-700 mb-6">
      <div className="text-center min-w-[110px]">
        <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
          <i className="ri-group-line text-2xl" aria-hidden="true"></i>
        </div>
        <span className="text-sm font-medium block">
          {language === 'fr' ? 'Jusqu’à 20 convives' : 'Up to 20 guests'}
        </span>
      </div>

      <div className="text-center min-w-[110px]">
        <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
          <i className="ri-restaurant-line text-2xl" aria-hidden="true"></i>
        </div>
        <span className="text-sm font-medium block">
          {language === 'fr' ? 'Menus personnalisés' : 'Custom menus'}
        </span>
      </div>

      <div className="text-center min-w-[110px]">
        <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
          <i className="ri-calendar-line text-2xl" aria-hidden="true"></i>
        </div>
        <span className="text-sm font-medium block">
          {language === 'fr' ? 'Réservation à l’avance' : 'Advance booking'}
        </span>
      </div>
    </div>

    <div className="flex justify-center">
      <Link href="/contact">
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold transition-colors duration-300 w-full sm:w-auto max-w-xs"
        type="button"
      >
        {language === 'fr' ? 'Demander une salle privée' : 'Inquire About Private Dining'}
      </button>
      </Link>
    </div>
  </div>
</div>

      </div>
    </section>
  );
}
