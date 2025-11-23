
'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function SpecialOffersSection() {
  const { language } = useLanguage();
  const offers = [
    {
      titleEn: 'Lunch Special',
      titleFr: 'Offre déjeuner',
      descriptionEn: 'Any main course + rice + naan + drink',
      descriptionFr: 'Un plat principal au choix + riz + naan + boisson.',
      price: 'CHF 25.00',
      originalPrice: 'CHF 35.00',
      timeEn: 'Everyday, 11:30 AM - 2:30 PM',
      timeFr: 'Tous les jours, 11h30 - 14h30',
      image: '/5.jpg'
    },
    {
      titleEn: 'Family Feast',
      titleFr: 'Menu famille',
      descriptionEn: 'Starters + main courses + rice + naan + dessert',
      descriptionFr: 'Entrées + plats principaux + riz + naan + dessert.',
      price: 'CHF 120.00',
      originalPrice: 'CHF 150.00',
      timeEn: 'Perfect for 4-5 people',
      timeFr: 'Idéal pour 4 à 5 personnes',
      image: 'https://readdy.ai/api/search-image?query=Indian%20family%20feast%20spread%20with%20multiple%20curry%20dishes%2C%20rice%2C%20naan%20breads%2C%20appetizers%20and%20desserts%20arranged%20on%20elegant%20table%20setting%2C%20warm%20restaurant%20ambiance%2C%20generous%20portions&width=400&height=300&seq=family-feast&orientation=landscape'
    },
    {
      titleEn: 'Wine & Dine',
      titleFr: 'Wine & Dine',
      descriptionEn: 'Any main course + premium wine bottle + dessert',
      descriptionFr: 'Un plat principal au choix + bouteille de vin premium + dessert.',
      price: 'CHF 65.00',
      originalPrice: 'CHF 85.00',
      timeEn: 'Available all day',
      timeFr: 'Disponible toute la journée',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20wine%20and%20dine%20setup%20with%20Indian%20cuisine%2C%20premium%20wine%20bottle%2C%20gourmet%20plating%2C%20sophisticated%20restaurant%20table%20setting%2C%20romantic%20dining%20atmosphere&width=400&height=300&seq=wine-dine&orientation=landscape'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-red-50 to-red-50 py-8 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-red-900 mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
            {language === 'fr' ? 'Offres spéciales' : 'Special Offers'}
          </h2>
          <p className="text-xl text-red-800 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Découvrez nos formules exclusives pour profiter du meilleur rapport qualité-prix.'
              : 'Discover our exclusive dining packages designed to give you the best value and experience'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img 
                  src={offer.image}
                  alt={language === 'fr' ? offer.titleFr : offer.titleEn}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {language === 'fr' ? 'Économisez ' : 'Save '}CHF {(parseFloat(offer.originalPrice.replace('CHF ', '')) - parseFloat(offer.price.replace('CHF ', ''))).toFixed(2)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-red-900 mb-3" style={{ fontFamily: 'var(--font-pacifico)' }}>
                  {language === 'fr' ? offer.titleFr : offer.titleEn}
                </h3>
                <p className="text-gray-600 mb-4">
                  {language === 'fr' ? offer.descriptionFr : offer.descriptionEn}
                </p>
                <p className="text-sm text-red-700 mb-4 font-medium">
                  {language === 'fr' ? offer.timeFr : offer.timeEn}
                </p>
                
                {/* <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-red-500">{offer.price}</span>
                    <span className="text-lg text-gray-400 line-through ml-2">{offer.originalPrice}</span>
                  </div>
                </div> */}
                
                <Link href="/menu">
                  <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer">
                    {language === 'fr' ? 'Commander maintenant' : 'Order Now'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-red-700 mb-4">
            {language === 'fr'
              ? '*Offres non cumulables. Valables uniquement sur place.'
              : '*Offers cannot be combined. Valid for dine-in only.'}
          </p>
          <Link href="/menu">
            <button className="bg-red-900 hover:bg-red-800 text-white px-8 py-3 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer">
              {language === 'fr' ? 'Voir toute la carte' : 'View Full Menu'}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}