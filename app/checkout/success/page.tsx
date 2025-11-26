'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useLanguage } from '../../../components/LanguageProvider';
import { clearCart } from '../../../lib/cart';

export default function CheckoutSuccessPage() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Ensure local cart is cleared after successful Stripe payment
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-50 pt-24 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-check-line text-2xl text-green-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-red-900 mb-2">
            {language === 'fr' ? 'Paiement réussi !' : 'Payment Successful!'}
          </h1>
          <p className="text-gray-600 mb-4">
            {language === 'fr'
              ? "Merci pour votre commande. Vous recevrez une confirmation par e-mail dans quelques instants."
              : 'Thank you for your order. You will receive a confirmation email shortly.'}
          </p>
          {sessionId && (
            <p className="text-xs text-gray-400 mb-4 break-all">
              {language === 'fr' ? 'ID de session Stripe :' : 'Stripe session ID:'} {sessionId}
            </p>
          )}
          <Link
            href="/"
            className="inline-flex items-center bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-home-4-line mr-2"></i>
            {language === 'fr' ? "Retour à l'accueil" : 'Back to Home'}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
