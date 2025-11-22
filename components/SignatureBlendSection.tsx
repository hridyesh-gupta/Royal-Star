
'use client';

export default function SignatureBlendSection() {
  const signatureDishes = [
    {
      name: 'Swiss Alpine Fondue',
      description: 'Traditional Gruyère and Vacherin cheese blend with local white wine, served with artisan bread and seasonal vegetables',
      image: 'https://readdy.ai/api/search-image?query=Authentic%20Swiss%20cheese%20fondue%20in%20traditional%20pot%20with%20melted%20golden%20cheese%2C%20fresh%20bread%20cubes%2C%20vegetables%2C%20elegant%20restaurant%20presentation%2C%20warm%20lighting%2C%20Alpine%20dining%20atmosphere&width=400&height=300&seq=fondue-dish&orientation=landscape'
    },
    {
      name: 'Geneva Lake Perch',
      description: 'Fresh lake perch fillet with almond crust, seasonal Swiss vegetables, and lemon butter sauce',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20plated%20lake%20perch%20fish%20dish%20with%20golden%20almond%20crust%2C%20colorful%20Swiss%20vegetables%2C%20lemon%20butter%20sauce%2C%20fine%20dining%20presentation%2C%20professional%20restaurant%20plating&width=400&height=300&seq=perch-dish&orientation=landscape'
    },
    {
      name: 'Alpine Lamb Rack',
      description: 'Herb-crusted rack of Swiss lamb with rosemary jus, roasted root vegetables, and traditional rösti',
      image: 'https://readdy.ai/api/search-image?query=Perfectly%20cooked%20lamb%20rack%20with%20herb%20crust%2C%20rosemary%20garnish%2C%20colorful%20roasted%20vegetables%2C%20crispy%20potato%20r%C3%B6sti%2C%20elegant%20fine%20dining%20plating%2C%20restaurant%20quality%20presentation&width=400&height=300&seq=lamb-dish&orientation=landscape'
    }
  ];

  return (
    <section className="bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-amber-900 mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
            Chef's Signature Dishes
          </h2>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            Discover our most celebrated creations, where traditional Swiss culinary heritage meets modern gastronomy. Each dish is crafted with passion and presented with Swiss precision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {signatureDishes.map((dish, index) => (
            <div key={index} className="bg-amber-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 overflow-hidden">
                <img 
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-amber-900 mb-3" style={{ fontFamily: 'var(--font-pacifico)' }}>
                  {dish.name}
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div 
          className="relative rounded-2xl overflow-hidden p-12 text-center"
          style={{
            backgroundImage: 'url("https://readdy.ai/api/search-image?query=Professional%20restaurant%20kitchen%20with%20chef%20preparing%20elegant%20dishes%2C%20warm%20lighting%2C%20stainless%20steel%20equipment%2C%20culinary%20artistry%20in%20action%2C%20Swiss%20restaurant%20kitchen%20atmosphere%2C%20cooking%20flames%20and%20professional%20presentation&width=1200&height=600&seq=kitchen-bg&orientation=landscape")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
              Our Culinary Philosophy
            </h3>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              At Royal Star Restaurant, we believe exceptional dining is an art form. Every dish tells a story of Swiss tradition, prepared with locally sourced ingredients and served with the warmth that defines Geneva's renowned hospitality.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-white">
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-orange-500/20 rounded-full">
                  <i className="ri-leaf-line text-2xl text-orange-300"></i>
                </div>
                <h4 className="text-xl font-bold mb-2">Farm to Table</h4>
                <p className="text-sm text-white/80">Fresh ingredients from local Swiss farms and Lake Geneva suppliers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-orange-500/20 rounded-full">
                  <i className="ri-fire-line text-2xl text-orange-300"></i>
                </div>
                <h4 className="text-xl font-bold mb-2">Master Crafted</h4>
                <p className="text-sm text-white/80">Traditional techniques meet modern culinary innovation</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-orange-500/20 rounded-full">
                  <i className="ri-heart-3-line text-2xl text-orange-300"></i>
                </div>
                <h4 className="text-xl font-bold mb-2">Swiss Excellence</h4>
                <p className="text-sm text-white/80">Every dish prepared and presented with genuine Swiss care</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
