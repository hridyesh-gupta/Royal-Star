
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartIcon from './CartIcon';
import { useLanguage } from './LanguageProvider';

type AuthUser = {
  id: number;
  name: string | null;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

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
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
    } finally {
      setUser(null);
      setIsProfileOpen(false);
      router.push('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg bg-white/95 backdrop-blur-sm transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="cursor-pointer">
            <div className="flex items-center">
              <img 
                // src="https://static.readdy.ai/image/d8d2cb7f50a8dd49f4a2ee558dead2a7/b61ee4a13a9d6045fa7fc64f195e7bcb.png" 
                src="/Logo.jpg"
                alt="Royal Star Cafe Logo" 
                className="h-12 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-brand-charcoal hover:text-brand-red-dark font-medium transition-colors cursor-pointer">
              {language === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            <Link href="/menu" className="text-brand-charcoal hover:text-brand-red-dark font-medium transition-colors cursor-pointer">
              {language === 'fr' ? 'Menu' : 'Menu'}
            </Link>
            {/* <Link href="/events" className="text-brand-charcoal hover:text-brand-red-dark font-medium transition-colors cursor-pointer">
              {language === 'fr' ? 'Événements' : 'Events'}
            </Link> */}
            <Link href="/contact" className="text-brand-charcoal hover:text-brand-red-dark font-medium transition-colors cursor-pointer">
              {language === 'fr' ? 'Contact' : 'Contact'}
            </Link>
            <div className="text-brand-charcoal hover:text-brand-red-dark transition-colors">
              <CartIcon />
            </div>
            <div className="flex items-center space-x-2 mr-2">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`text-xs font-semibold px-2 py-1 rounded-full border cursor-pointer ${
                  language === 'en'
                    ? 'bg-brand-red text-white border-brand-red'
                    : 'text-brand-charcoal border-brand-red-soft'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`text-xs font-semibold px-2 py-1 rounded-full border cursor-pointer ${
                  language === 'fr'
                    ? 'bg-brand-red text-white border-brand-red'
                    : 'text-brand-charcoal border-brand-red-soft'
                }`}
              >
                FR
              </button>
            </div>
            <Link href="/reservation" className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer">
              {language === 'fr' ? 'Réserver une table' : 'Reserve Table'}
            </Link>
            {!authLoading && (
              user ? (
                <div className="relative ml-4">
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="flex items-center space-x-2 bg-white border border-brand-red-soft text-brand-charcoal px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-cream transition-colors cursor-pointer"
                  >
                    <span className="max-w-[140px] truncate">
                      {user.name || user.email}
                    </span>
                    <i
                      className={`ri-arrow-${isProfileOpen ? 'up' : 'down'}-s-line text-base`}
                    ></i>
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-brand-red-soft rounded-xl shadow-lg py-2 z-50">
                      {user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-brand-charcoal hover:bg-brand-cream cursor-pointer"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          {language === 'fr' ? 'Tableau de bord administrateur' : 'Admin Dashboard'}
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 cursor-pointer"
                      >
                        {language === 'fr' ? 'Se déconnecter' : 'Logout'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3 ml-4">
                  <Link
                    href="/login"
                    className="bg-white border border-brand-red-soft text-brand-charcoal px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-cream transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {language === 'fr' ? 'Connexion' : 'Login'}
                  </Link>
                  <Link
                    href="/register"
                    className="bg-white border border-brand-red-soft text-brand-charcoal px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-cream transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {language === 'fr' ? 'Inscription' : 'Register'}
                  </Link>
                </div>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden w-8 h-8 flex items-center justify-center cursor-pointer text-brand-charcoal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="bg-brand-cream rounded-2xl shadow-lg border border-brand-red-soft px-4 pt-4 pb-3">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-brand-charcoal hover:text-brand-red-dark font-medium transition-colors cursor-pointer">
                  {language === 'fr' ? 'Accueil' : 'Home'}
                </Link>
                <Link href="/menu" className="text-brand-charcoal hover:text-brand-red-dark font-medium transition-colors cursor-pointer">
                  {language === 'fr' ? 'Menu' : 'Menu'}
                </Link>
                {/* <Link href="/events" className="text-brand-charcoal hover:text-brand-red-dark font-medium transition-colors cursor-pointer">
                  {language === 'fr' ? 'Événements' : 'Events'}
                </Link> */}
                <Link href="/contact" className="text-brand-charcoal hover:text-brand-red-dark font-medium transition-colors cursor-pointer">
                  {language === 'fr' ? 'Contact' : 'Contact'}
                </Link>
                <Link href="/cart" className="text-brand-charcoal hover:text-brand-red font-medium transition-colors cursor-pointer flex items-center gap-2">
                  <i className="ri-shopping-cart-line"></i>
                  {language === 'fr' ? 'Panier' : 'Cart'}
                </Link>
                <Link href="/reservation" className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-2 rounded-full font-medium transition-colors text-center whitespace-nowrap cursor-pointer">
                  {language === 'fr' ? 'Réserver une table' : 'Reserve Table'}
                </Link>
                {!authLoading && (
                  user ? (
                    <>
                      {user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="bg-white text-brand-charcoal border border-brand-red-soft px-6 py-2 rounded-full font-medium transition-colors text-center whitespace-nowrap cursor-pointer hover:bg-brand-cream"
                        >
                          {language === 'fr' ? 'Tableau de bord admin' : 'Admin Dashboard'}
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="bg-white text-brand-charcoal border border-brand-red-soft px-6 py-2 rounded-full font-medium transition-colors text-center whitespace-nowrap cursor-pointer hover:bg-brand-cream"
                      >
                        {language === 'fr' ? 'Se déconnecter' : 'Logout'}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="bg-white text-brand-charcoal border border-brand-red-soft px-6 py-2 rounded-full font-medium transition-colors text-center whitespace-nowrap cursor-pointer hover:bg-brand-cream"
                      >
                        {language === 'fr' ? 'Connexion' : 'Login'}
                      </Link>
                      <Link
                        href="/register"
                        className="bg-white text-brand-charcoal border border-brand-red-soft px-6 py-2 rounded-full font-medium transition-colors text-center whitespace-nowrap cursor-pointer hover:bg-brand-cream"
                      >
                        {language === 'fr' ? 'Inscription' : 'Register'}
                      </Link>
                    </>
                  )
                )}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-brand-charcoal">{language === 'fr' ? 'Langue' : 'Language'}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setLanguage('en')}
                      className={`text-xs font-semibold px-3 py-1 rounded-full border cursor-pointer ${
                        language === 'en'
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'text-brand-charcoal border-brand-red-soft'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage('fr')}
                      className={`text-xs font-semibold px-3 py-1 rounded-full border cursor-pointer ${
                        language === 'fr'
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'text-brand-charcoal border-brand-red-soft'
                      }`}
                    >
                      FR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
