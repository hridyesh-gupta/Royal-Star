
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CheckoutForm from './CheckoutForm';
import { getCart, type CartItem } from '../../lib/cart';
import { useLanguage } from '../../components/LanguageProvider';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const items = getCart();
    setCartItems(items);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20">
          <i className="ri-loader-4-line text-4xl text-orange-500 animate-spin"></i>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-shopping-cart-line text-4xl text-gray-400"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Votre panier est vide' : 'Your cart is empty'}
          </h1>
          <p className="text-gray-600 mb-8">
            {language === 'fr'
              ? 'Ajoutez quelques délicieux plats à votre panier avant de passer au paiement.'
              : 'Add some delicious items to your cart before checkout.'}
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-restaurant-line mr-2"></i>
            {language === 'fr' ? 'Voir le menu' : 'Browse Menu'}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-orange-500 transition-colors cursor-pointer">
              {language === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link href="/cart" className="hover:text-orange-500 transition-colors cursor-pointer">
              {language === 'fr' ? 'Panier' : 'Cart'}
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-gray-900">
              {language === 'fr' ? 'Paiement' : 'Checkout'}
            </span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {language === 'fr' ? 'Paiement' : 'Checkout'}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === 'fr'
              ? 'Complétez les informations de votre commande ci-dessous.'
              : 'Complete your order details below'}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8">
          <CheckoutForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}
