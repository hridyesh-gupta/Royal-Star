
'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function SpecialOffersSection() {
  const { language } = useLanguage();
  const offers = [
    {
      title: 'Lunch Special',
      description: 'Any main course + rice + naan + drink',
      price: 'CHF 25.00',
      originalPrice: 'CHF 35.00',
      time: 'Monday - Friday, 11:30 AM - 2:30 PM',
      image: 'https://readdy.ai/api/search-image?query=Delicious%20Indian%20lunch%20thali%20with%20curry%2C%20rice%2C%20naan%20bread%2C%20and%20traditional%20accompaniments%2C%20beautifully%20plated%20on%20elegant%20dinnerware%2C%20warm%20restaurant%20lighting%2C%20appetizing%20food%20photography&width=400&height=300&seq=lunch-special&orientation=landscape'
    },
    {
      title: 'Family Feast',
      description: '2 starters + 3 main courses + rice + naan + dessert',
      price: 'CHF 120.00',
      originalPrice: 'CHF 150.00',
      time: 'Perfect for 4-5 people',
      image: 'https://readdy.ai/api/search-image?query=Indian%20family%20feast%20spread%20with%20multiple%20curry%20dishes%2C%20rice%2C%20naan%20breads%2C%20appetizers%20and%20desserts%20arranged%20on%20elegant%20table%20setting%2C%20warm%20restaurant%20ambiance%2C%20generous%20portions&width=400&height=300&seq=family-feast&orientation=landscape'
    },
    {
      title: 'Wine & Dine',
      description: 'Any main course + premium wine bottle + dessert',
      price: 'CHF 65.00',
      originalPrice: 'CHF 85.00',
      time: 'Available all day',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20wine%20and%20dine%20setup%20with%20Indian%20cuisine%2C%20premium%20wine%20bottle%2C%20gourmet%20plating%2C%20sophisticated%20restaurant%20table%20setting%2C%20romantic%20dining%20atmosphere&width=400&height=300&seq=wine-dine&orientation=landscape'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-amber-900 mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
            {language === 'fr' ? 'Offres spéciales' : 'Special Offers'}
          </h2>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
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
                  alt={offer.title}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {language === 'fr' ? 'Économisez ' : 'Save '}CHF {(parseFloat(offer.originalPrice.replace('CHF ', '')) - parseFloat(offer.price.replace('CHF ', ''))).toFixed(2)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-amber-900 mb-3" style={{ fontFamily: 'var(--font-pacifico)' }}>
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <p className="text-sm text-amber-700 mb-4 font-medium">{offer.time}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-orange-500">{offer.price}</span>
                    <span className="text-lg text-gray-400 line-through ml-2">{offer.originalPrice}</span>
                  </div>
                </div>
                
                <Link href="/contact">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer">
                    {language === 'fr' ? 'Réserver' : 'Reserve Now'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-amber-700 mb-4">
            {language === 'fr'
              ? '*Offres non cumulables. Valables uniquement sur place.'
              : '*Offers cannot be combined. Valid for dine-in only.'}
          </p>
          <Link href="/menu">
            <button className="bg-amber-900 hover:bg-amber-800 text-white px-8 py-3 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer">
              {language === 'fr' ? 'Voir toute la carte' : 'View Full Menu'}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}