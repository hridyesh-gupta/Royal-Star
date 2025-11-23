
'use client';

import Link from 'next/link';

export default function ProductGrid() {
  const restaurantFeatures = [
    {
      title: 'Fine Dining Experience',
      description: 'Elegant multi-course meals in a sophisticated atmosphere',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20fine%20dining%20restaurant%20table%20setting%20with%20multiple%20courses%2C%20crystal%20glasses%2C%20silverware%2C%20candlelight%2C%20sophisticated%20plating%20presentation%2C%20luxury%20dining%20atmosphere&width=400&height=300&seq=fine-dining&orientation=landscape',
      price: 'From CHF 65'
    },
    {
      title: 'Swiss Wine Pairing',
      description: 'Expertly curated wine selections from local Swiss vineyards',
      image: 'https://readdy.ai/api/search-image?query=Swiss%20wine%20bottles%20and%20glasses%20on%20elegant%20restaurant%20table%2C%20sommelier%20pouring%20wine%2C%20vineyard%20landscape%20background%2C%20professional%20wine%20service%20presentation&width=400&height=300&seq=wine-pairing&orientation=landscape',
      price: 'From CHF 35'
    },
    {
      title: 'Private Dining',
      description: 'Intimate dining room for special occasions and business meetings',
      image: 'https://readdy.ai/api/search-image?query=Luxurious%20private%20dining%20room%20with%20elegant%20table%20setting%2C%20warm%20lighting%2C%20sophisticated%20decor%2C%20intimate%20atmosphere%2C%20exclusive%20restaurant%20environment&width=400&height=300&seq=private-dining&orientation=landscape',
      price: 'Custom Pricing'
    },
    {
      title: 'Chef\'s Tasting Menu',
      description: 'Seven-course culinary journey showcasing seasonal Swiss ingredients',
      image: 'https://readdy.ai/api/search-image?query=Beautifully%20plated%20tasting%20menu%20courses%2C%20artistic%20food%20presentation%2C%20chef%20garnishing%20dishes%2C%20multiple%20small%20plates%2C%20gourmet%20culinary%20artistry&width=400&height=300&seq=tasting-menu&orientation=landscape',
      price: 'CHF 125'
    },
    {
      title: 'Weekend Brunch',
      description: 'Leisurely weekend brunch with Swiss specialties and pastries',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20brunch%20spread%20with%20Swiss%20pastries%2C%20fresh%20fruits%2C%20artisan%20breads%2C%20coffee%20service%2C%20sophisticated%20breakfast%20presentation%2C%20weekend%20dining%20atmosphere&width=400&height=300&seq=weekend-brunch&orientation=landscape',
      price: 'From CHF 42'
    },
    {
      title: 'Culinary Events',
      description: 'Special themed dinners and seasonal celebration menus',
      image: 'https://readdy.ai/api/search-image?query=Special%20event%20dining%20setup%20with%20decorated%20tables%2C%20seasonal%20theme%2C%20festive%20atmosphere%2C%20celebration%20dining%2C%20holiday%20restaurant%20decoration&width=400&height=300&seq=culinary-events&orientation=landscape',
      price: 'Varies'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-red-100 to-red-100 py-20 px-8" data-product-shop>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-red-900 mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
            Dining Experiences
          </h2>
          <p className="text-xl text-red-800 max-w-3xl mx-auto">
            Discover our range of exceptional dining experiences, from intimate dinners to grand celebrations, all crafted with Swiss precision and hospitality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {restaurantFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 overflow-hidden">
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-red-900 mb-3" style={{ fontFamily: 'var(--font-pacifico)' }}>
                  {feature.title}
                </h3>
                <p className="text-red-700 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-red-600">
                    {feature.price}
                  </span>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-red-900 mb-4" style={{ fontFamily: 'var(--font-pacifico)' }}>
              Ready to Dine with Us?
            </h3>
            <p className="text-red-800 mb-6 text-lg">
              Experience the finest Swiss cuisine and exceptional service at Royal Star Restaurant. 
              Reserve your table today for an unforgettable dining experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-colors duration-300 whitespace-nowrap cursor-pointer">
                  View Full Menu
                </button>
              </Link>
              <Link href="/reservation">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-colors duration-300 whitespace-nowrap cursor-pointer">
                  Make Reservation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
