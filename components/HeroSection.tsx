
'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function HeroSection() {
  const { language } = useLanguage();
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(/2.jpg)'
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Floating elements animation */}
      <div className="absolute top-20 left-1/4 w-2 h-20 bg-gradient-to-t from-transparent via-white/20 to-transparent rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-1/3 w-1 h-16 bg-gradient-to-t from-transparent via-white/15 to-transparent rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-28 left-1/2 w-1.5 h-18 bg-gradient-to-t from-transparent via-white/25 to-transparent rounded-full animate-pulse delay-500"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-8 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/Logo.jpg" 
              alt="Royal Star Cafe Logo" 
              className="h-24 w-auto mx-auto drop-shadow-2xl"
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
            <span className="text-white drop-shadow-2xl">Royal Star</span>
            <br />
            <span className="text-brand-red drop-shadow-2xl">Cafe</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium drop-shadow-lg">
            {language === 'fr'
              ? 'Une cuisine indienne authentique rencontre l’hospitalité suisse au cœur de Genève, dans le district de Meyrin'
              : 'Authentic Indian cuisine meets Swiss hospitality in the heart of Geneva, in the Meyrin district'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/menu">
              <button className="bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer">
                {language === 'fr' ? 'Commander maintenant' : 'Order Now'}
              </button>
            </Link>
            <Link href="/reservation">
              <button className="bg-transparent border-2 border-white/80 hover:bg-white/10 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer">
                {language === 'fr' ? 'Réserver votre table' : 'Reserve Your Table'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}