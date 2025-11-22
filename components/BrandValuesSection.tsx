
'use client';

export default function BrandValuesSection() {
  const { language } = require('./LanguageProvider').useLanguage();
  return (
    <section className="bg-amber-50 py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-amber-900 mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
            {language === 'fr' ? 'Excellence gastronomique 🍽️⭐' : 'Fine Dining Excellence 🍽️⭐'}
          </h2>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            {language === 'fr'
              ? 'Le restaurant Royal Star incarne les plus belles traditions de l\'hospitalité et de l\'art culinaire suisses. Chaque repas est une célébration de saveurs authentiques, d\'un service impeccable et de la culture gastronomique raffinée des Indes à Meyrin.'
              : 'The Royal Star Restaurant embodies the finest traditions of Swiss hospitality and culinary art. Each meal is a celebration of authentic flavors, impeccable service, and the refined gastronomic culture of the Indies in Meyrin.'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Restaurant atmosphere image */}
          <div className="order-2 md:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <img 
                src="https://readdy.ai/api/search-image?query=Sophisticated%20restaurant%20dining%20room%20with%20elegant%20table%20settings%2C%20warm%20ambient%20lighting%2C%20Swiss%20Alpine%20decor%2C%20luxury%20dining%20atmosphere%2C%20Geneva%20restaurant%20interior%2C%20fine%20dining%20ambiance%20with%20mountain%20views&width=600&height=400&seq=restaurant-interior&orientation=landscape"
                alt="Royal Star Restaurant Interior"
                className="w-full h-auto object-cover object-top"
              />
            </div>
          </div>
          
          {/* Right side - Restaurant Values */}
          <div className="order-1 md:order-2">
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-amber-900 mb-2 flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center mr-3">
                    <i className="ri-restaurant-2-line text-green-600"></i>
                  </span>
                  Authentic Indian Cuisine
                </h3>
                <p className="text-amber-800">Traditional recipes refined with mastered culinary techniques, showcasing the finest Indian ingredients and local produce from the Alpine regions and Lake Geneva.</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-amber-900 mb-2 flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center mr-3">
                    <i className="ri-award-line text-orange-600"></i>
                  </span>
                  Exceptional Service
                </h3>
                <p className="text-amber-800">Our professionally trained staff provides attentive, personalized service that reflects the highest standards of Swiss hospitality and fine dining excellence.</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-amber-900 mb-2 flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center mr-3">
                    <i className="ri-goblet-line text-purple-600"></i>
                  </span>
                  Elegant Atmosphere
                </h3>
                <p className="text-amber-800">Sophisticated dining environment with carefully curated ambiance, perfect for romantic dinners, business meetings, and special celebrations.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-amber-900 mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
              Why Choose Royal Star Restaurant?
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 bg-orange-100 rounded-full">
                  <i className="ri-chef-hat-line text-xl text-orange-600"></i>
                </div>
                <h4 className="font-bold text-amber-900 mb-2">Master Chef</h4>
                <p className="text-sm text-amber-700">Award-winning culinary expertise</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 bg-orange-100 rounded-full">
                  <i className="ri-map-pin-2-line text-xl text-orange-600"></i>
                </div>
                <h4 className="font-bold text-amber-900 mb-2">Prime Location</h4>
                <p className="text-sm text-amber-700">Heart of Geneva's dining district</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 bg-orange-100 rounded-full">
                  <i className="ri-wine-glass-line text-xl text-orange-600"></i>
                </div>
                <h4 className="font-bold text-amber-900 mb-2">Wine Selection</h4>
                <p className="text-sm text-amber-700">Curated Swiss and international wines</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 bg-orange-100 rounded-full">
                  <i className="ri-calendar-event-line text-xl text-orange-600"></i>
                </div>
                <h4 className="font-bold text-amber-900 mb-2">Private Events</h4>
                <p className="text-sm text-amber-700">Exclusive dining experiences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
