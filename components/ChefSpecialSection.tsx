
'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function ChefSpecialSection() {
  const { language } = useLanguage();
  const specialDishes = [
    {
      nameEn: 'Butter Chicken',
      nameFr: 'Poulet au beurre',
      descriptionEn: 'Grilled chicken in rich tomato and cream sauce with almonds, nuts, and cashews',
      descriptionFr: 'Poulet grillé dans une riche sauce tomate et crème avec amandes, noix et noix de cajou.',
      price: 'CHF 34.00',
      image: 'https://readdy.ai/api/search-image?query=Authentic%20butter%20chicken%20curry%20in%20rich%20tomato%20cream%20sauce%20with%20tender%20chicken%20pieces%2C%20garnished%20with%20fresh%20cilantro%20and%20cashews%2C%20traditional%20Indian%20restaurant%20plating%2C%20warm%20golden%20lighting&width=400&height=300&seq=butter-chicken&orientation=landscape',
      badgeEn: 'Most Popular',
      badgeFr: 'Le plus populaire'
    },
    {
      nameEn: 'Lamb Biryani',
      nameFr: 'Biryani d\'agneau',
      descriptionEn: 'Fragrant basmati rice with succulent lamb, slow-cooked with exotic spices and saffron',
      descriptionFr: 'Riz basmati parfumé avec agneau fondant, mijoté avec des épices exotiques et du safran.',
      price: 'CHF 32.00',
      image: 'https://readdy.ai/api/search-image?query=Traditional%20lamb%20biryani%20with%20fragrant%20basmati%20rice%2C%20tender%20lamb%20pieces%2C%20garnished%20with%20fried%20onions%2C%20nuts%20and%20fresh%20herbs%2C%20aromatic%20steam%20rising%2C%20authentic%20Indian%20presentation&width=400&height=300&seq=lamb-biryani&orientation=landscape',
      badgeEn: "Chef's Special",
      badgeFr: 'Spécialité du chef'
    },
    {
      nameEn: 'Paneer Tikka Masala',
      nameFr: 'Paneer Tikka Masala',
      descriptionEn: 'Grilled cottage cheese in rich tomato and cream sauce, a vegetarian delight',
      descriptionFr: 'Fromage paneer grillé dans une riche sauce tomate et crème, un délice végétarien.',
      price: 'CHF 20.00',
      image: 'https://readdy.ai/api/search-image?query=Paneer%20tikka%20masala%20with%20grilled%20cottage%20cheese%20cubes%20in%20creamy%20tomato%20sauce%2C%20garnished%20with%20fresh%20herbs%2C%20colorful%20bell%20peppers%2C%20elegant%20vegetarian%20Indian%20dish%20presentation&width=400&height=300&seq=paneer-tikka&orientation=landscape',
      badgeEn: 'Vegetarian Favorite',
      badgeFr: 'Option végétarienne préférée'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-brand-charcoal to-brand-red-dark py-20 px-8 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
            {language === 'fr' ? 'Créations signature du chef' : "Chef's Signature Creations"}
          </h2>
          <p className="text-xl text-brand-red-soft max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Découvrez nos plats les plus appréciés, préparés avec des épices indiennes authentiques et des techniques culinaires traditionnelles.'
              : 'Discover our most beloved dishes, crafted with authentic Indian spices and traditional cooking techniques'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {specialDishes.map((dish, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-white/20">
              <div className="relative">
                <img 
                  src={dish.image}
                  alt={language === 'fr' ? dish.nameFr : dish.nameEn}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="absolute top-4 left-4 bg-brand-red text-white px-3 py-1 rounded-full text-sm font-bold">
                  {language === 'fr' ? dish.badgeFr : dish.badgeEn}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-pacifico)' }}>
                  {language === 'fr' ? dish.nameFr : dish.nameEn}
                </h3>
                <p className="text-brand-red-soft mb-4 leading-relaxed">
                  {language === 'fr' ? dish.descriptionFr : dish.descriptionEn}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-brand-red-soft">{dish.price}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400"></i>
                    ))}
                  </div>
                </div>
                
                <Link href="/menu">
                  <button className="w-full bg-brand-red hover:bg-brand-red-dark text-white py-3 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer">
                    {language === 'fr' ? 'Commander maintenant' : 'Order Now'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-brand-red-soft mb-6">
            {language === 'fr'
              ? 'Vivez les saveurs authentiques de l’Inde au Royal Star Café.'
              : 'Experience the authentic flavors of India at Royal Star Cafe'}
          </p>
          <Link href="/reservation">
            <button className="bg-white text-brand-charcoal hover:bg-brand-red-soft px-8 py-3 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer">
              {language === 'fr' ? 'Réserver votre table' : 'Reserve Your Table'}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
