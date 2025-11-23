'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCartItemCount, getCartTotal } from '../lib/cart';
import { useLanguage } from './LanguageProvider';

export default function FloatingCartButton() {
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const pathname = usePathname();
  const { language } = useLanguage();

  useEffect(() => {
    const updateCart = () => {
      setItemCount(getCartItemCount());
      setTotal(getCartTotal());
    };

    updateCart();
    window.addEventListener('cartUpdated', updateCart);

    return () => {
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  if (!pathname) return null;
  if (pathname.startsWith('/cart') || pathname.startsWith('/checkout')) return null;
  if (itemCount === 0) return null;

  return (
    <Link
      href="/cart"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 cursor-pointer"
    >
      <div className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white shadow-xl rounded-full px-4 py-3 sm:px-5 sm:py-3 transition-transform transform hover:scale-105">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
          <i className="ri-shopping-cart-line text-xl"></i>
          <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        </div>
        <div className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-xs uppercase tracking-wide opacity-80">
            {language === 'fr' ? 'Votre panier' : 'Your cart'}
          </span>
          <span className="text-sm font-semibold">
            CHF {total.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
