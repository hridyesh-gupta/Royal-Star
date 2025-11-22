
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CartIcon from './CartIcon';
import { useLanguage } from './LanguageProvider';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-amber-900'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="cursor-pointer">
            <div className="flex items-center">
              <img 
                src="https://static.readdy.ai/image/d8d2cb7f50a8dd49f4a2ee558dead2a7/b61ee4a13a9d6045fa7fc64f195e7bcb.png" 
                alt="Royal Star Cafe Logo" 
                className="h-12 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${
              isScrolled ? 'text-amber-900' : 'text-white'
            } hover:text-orange-500 font-medium transition-colors cursor-pointer`}>
              {language === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            <Link href="/menu" className={`${
              isScrolled ? 'text-amber-900' : 'text-white'
            } hover:text-orange-500 font-medium transition-colors cursor-pointer`}>
              {language === 'fr' ? 'Menu' : 'Menu'}
            </Link>
            <Link href="/contact" className={`${
              isScrolled ? 'text-amber-900' : 'text-white'
            } hover:text-orange-500 font-medium transition-colors cursor-pointer`}>
              {language === 'fr' ? 'Contact' : 'Contact'}
            </Link>
            <div className={`${isScrolled ? 'text-amber-900' : 'text-white'} hover:text-orange-500 transition-colors`}>
              <CartIcon />
            </div>
            <div className="flex items-center space-x-2 mr-2">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`text-xs font-semibold px-2 py-1 rounded-full border cursor-pointer ${
                  language === 'en'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : isScrolled
                      ? 'text-amber-900 border-amber-300'
                      : 'text-white border-white/60'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`text-xs font-semibold px-2 py-1 rounded-full border cursor-pointer ${
                  language === 'fr'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : isScrolled
                      ? 'text-amber-900 border-amber-300'
                      : 'text-white border-white/60'
                }`}
              >
                FR
              </button>
            </div>
            <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer">
              {language === 'fr' ? 'Réserver une table' : 'Reserve Table'}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden w-8 h-8 flex items-center justify-center cursor-pointer ${
              isScrolled ? 'text-amber-900' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-amber-200">
            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/" className="text-amber-900 hover:text-orange-500 font-medium transition-colors cursor-pointer">
                {language === 'fr' ? 'Accueil' : 'Home'}
              </Link>
              <Link href="/menu" className="text-amber-900 hover:text-orange-500 font-medium transition-colors cursor-pointer">
                {language === 'fr' ? 'Menu' : 'Menu'}
              </Link>
              <Link href="/contact" className="text-amber-900 hover:text-orange-500 font-medium transition-colors cursor-pointer">
                {language === 'fr' ? 'Contact' : 'Contact'}
              </Link>
              <Link href="/cart" className="text-amber-900 hover:text-orange-500 font-medium transition-colors cursor-pointer flex items-center gap-2">
                <i className="ri-shopping-cart-line"></i>
                {language === 'fr' ? 'Panier' : 'Cart'}
              </Link>
              <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors text-center whitespace-nowrap cursor-pointer">
                {language === 'fr' ? 'Réserver une table' : 'Reserve Table'}
              </Link>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-amber-700">{language === 'fr' ? 'Langue' : 'Language'}</span>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`text-xs font-semibold px-3 py-1 rounded-full border cursor-pointer ${
                      language === 'en'
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'text-amber-900 border-amber-300'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('fr')}
                    className={`text-xs font-semibold px-3 py-1 rounded-full border cursor-pointer ${
                      language === 'fr'
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'text-amber-900 border-amber-300'
                    }`}
                  >
                    FR
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
