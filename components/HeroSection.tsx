
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

type AuthUser = {
  id: number;
  name: string | null;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
};

export default function HeroSection() {
  const { language } = useLanguage();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const response = await fetch('/api/auth/me', { method: 'GET' });
        if (!response.ok) {
          if (isMounted) {
            setUser(null);
          }
          return;
        }

        const data = (await response.json()) as { user: AuthUser | null };
        if (isMounted) {
          setUser(data.user ?? null);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const primaryButtonClass =
    'bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer';
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
              ? 'Là où l\'authenticité rencontre l\'hospitalité suisse à Meyrin, au cœur de Genève'
              : 'Where authenticity meets Swiss hospitality in Meyrin, the heart of Geneva'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/menu">
              <button className={primaryButtonClass}>
                {language === 'fr' ? 'Commander maintenant' : 'Order Now'}
              </button>
            </Link>
            {user ? (
              <Link href="/reservation">
                <button className={primaryButtonClass}>
                  {language === 'fr' ? 'Réserver une table' : 'Reserve Table'}
                </button>
              </Link>
            ) : (
              <div className="relative flex items-center">
                <Link href="/register">
                  <button className={primaryButtonClass}>
                    {language === 'fr' ? "S'inscrire" : 'Register'}
                  </button>
                </Link>
                <p className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-[10px] leading-tight tracking-wide uppercase text-white/80">
                  {language === 'fr' ? 'OBTENEZ UN CODE PROMO' : 'GET PROMO CODE'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}