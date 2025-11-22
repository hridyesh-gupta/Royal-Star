
'use client';

export default function EventsSection() {
  const { language } = require('./LanguageProvider').useLanguage();
  const events = [
    {
      date: 'Dec 15',
      title: 'Wine Tasting Evening',
      description: 'Join us for an exclusive Swiss wine tasting featuring selections from local vineyards',
      time: '7:00 PM',
      price: 'CHF 65 per person'
    },
    {
      date: 'Dec 22',
      title: 'Christmas Feast',
      description: 'Traditional Swiss Christmas dinner with festive specialties and live music',
      time: '6:30 PM',
      price: 'CHF 85 per person'
    },
    {
      date: 'Dec 31',
      title: 'New Year Gala',
      description: 'Ring in the New Year with a luxurious 5-course dinner and champagne',
      time: '8:00 PM',
      price: 'CHF 125 per person'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-amber-100 to-orange-100 py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-amber-900 mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
            {language === 'fr' ? 'Événements & dîners spéciaux' : 'Special Events & Dining'}
          </h2>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Vivez des soirées inoubliables au Royal Star Restaurant avec nos événements spéciaux et nos expériences gastronomiques à thème.'
              : 'Experience unforgettable evenings at Royal Star Restaurant with our curated special events and themed dining experiences.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white text-center">
                <div className="text-3xl font-bold mb-2">{event.date}</div>
                <div className="text-lg">{event.time}</div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-amber-900 mb-3" style={{ fontFamily: 'var(--font-pacifico)' }}>
                  {event.title}
                </h3>
                <p className="text-amber-700 mb-4 leading-relaxed">
                  {event.description}
                </p>
                <div className="text-xl font-bold text-orange-600 mb-4">
                  {event.price}
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-bold transition-colors duration-300 whitespace-nowrap cursor-pointer">
                  {language === 'fr' ? 'Réserver' : 'Reserve Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-amber-900 mb-4" style={{ fontFamily: 'var(--font-pacifico)' }}>
              {language === 'fr' ? 'Salle privée disponible' : 'Private Dining Available'}
            </h3>
            <p className="text-amber-800 mb-6">
              {language === 'fr'
                ? 'Organisez vos occasions spéciales dans notre élégante salle à manger privée. Parfaite pour les célébrations, les dîners d’affaires et les réunions intimes.'
                : 'Host your special occasions in our elegant private dining room. Perfect for celebrations, business dinners, and intimate gatherings.'}
            </p>
            <div className="flex items-center justify-center space-x-8 text-amber-700 mb-6">
              <div className="text-center">
                <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                  <i className="ri-group-line text-xl"></i>
                </div>
                <span className="text-sm font-medium">
                  {language === 'fr' ? 'Jusqu’à 20 convives' : 'Up to 20 guests'}
                </span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                  <i className="ri-restaurant-line text-xl"></i>
                </div>
                <span className="text-sm font-medium">
                  {language === 'fr' ? 'Menus personnalisés' : 'Custom menus'}
                </span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                  <i className="ri-calendar-line text-xl"></i>
                </div>
                <span className="text-sm font-medium">
                  {language === 'fr' ? 'Réservation à l’avance' : 'Advance booking'}
                </span>
              </div>
            </div>
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-bold transition-colors duration-300 whitespace-nowrap cursor-pointer">
              {language === 'fr' ? 'Demander une salle privée' : 'Inquire About Private Dining'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
