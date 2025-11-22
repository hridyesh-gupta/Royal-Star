
'use client';

import { useLanguage } from '../../components/LanguageProvider';

export default function CartHero() {
  const { language } = useLanguage();
  return (
    <section 
      className="relative min-h-[300px] sm:min-h-[400px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=Elegant%20restaurant%20shopping%20cart%20concept%20with%20beautiful%20Indian%20dishes%20arranged%20on%20wooden%20table%2C%20warm%20lighting%2C%20sophisticated%20dining%20atmosphere%2C%20food%20ordering%20and%20delivery%20concept&width=1200&height=400&seq=cart-hero&orientation=landscape')`
      }}
    >
      <div className="text-center text-white px-4 sm:px-8">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
          {language === 'fr' ? 'Votre panier' : 'Your Cart'}
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          {language === 'fr'
            ? 'Vérifiez vos plats sélectionnés et passez au paiement pour une expérience culinaire exceptionnelle.'
            : 'Review your selected dishes and proceed to checkout for an amazing dining experience'}
        </p>
      </div>
    </section>
  );
}
