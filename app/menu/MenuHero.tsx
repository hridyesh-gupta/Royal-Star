
'use client';

import { useLanguage } from '../../components/LanguageProvider';

export default function MenuHero() {
  const { language } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img 
        src="/8.jpg" 
        alt="Restaurant Hero" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
          {language === 'fr' ? 'Notre carte' : 'Our Menu'}
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
          {language === 'fr'
            ? 'Découvrez notre délicieuse cuisine suisse et nos plats internationaux préparés avec passion.'
            : 'Discover our exquisite Swiss cuisine and international dishes crafted with passion'}
        </p>
        <div className="inline-flex items-center space-x-2 text-white">
          <span className="w-6 h-6 flex items-center justify-center">
            <i className="ri-restaurant-line"></i>
          </span>
          <span className="text-lg font-medium">From Farm to Table, Made with Swiss Precision</span>
        </div>
      </div>
    </section>
  );
}
