
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCart, updateQuantity, removeFromCart, getCartTotal, type CartItem } from '../../lib/cart';
import { useLanguage } from '../../components/LanguageProvider';

export default function CartItems() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const loadCart = () => {
      const items = getCart();
      setCartItems(items);
      setTotal(getCartTotal());
    };

    loadCart();

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  if (cartItems.length === 0) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-shopping-cart-line text-3xl text-gray-400"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Votre panier est vide' : 'Your cart is empty'}
          </h2>
          <p className="text-gray-600 mb-8 text-sm">
            {language === 'fr'
              ? 'Découvrez notre délicieux menu et ajoutez vos plats préférés.'
              : 'Discover our delicious menu and add your favorite items.'}
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-restaurant-line mr-2"></i>
            {language === 'fr' ? 'Voir le menu' : 'Browse Menu'}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {language === 'fr' ? 'Votre commande' : 'Your Order'}
            </h2>
            <p className="text-gray-600 text-sm">
              {language === 'fr'
                ? `${cartItems.length} article${cartItems.length !== 1 ? 's' : ''} dans votre panier`
                : `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`}
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => {
              const price = parseFloat(item.price.replace('CHF ', ''));
              return (
                <div key={item.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-orange-500 font-medium text-lg">{item.price}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end space-x-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <i className="ri-subtract-line text-gray-600"></i>
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <i className="ri-add-line text-gray-600"></i>
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          CHF {(price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-600 text-sm transition-colors cursor-pointer"
                        >
                          {language === 'fr' ? 'Retirer' : 'Remove'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
            <div className="space-y-4">
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-gray-900">
                  {language === 'fr' ? 'Total : ' : 'Total: '}CHF {total.toFixed(2)}
                </p>
                <p className="text-gray-600 text-sm">
                  {language === 'fr'
                    ? 'Les frais de livraison seront calculés lors du paiement.'
                    : 'Delivery fee will be calculated at checkout'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/menu"
                  className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-arrow-left-line mr-2"></i>
                  {language === 'fr' ? 'Continuer vos achats' : 'Continue Shopping'}
                </Link>
                <Link
                  href="/checkout"
                  className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  {language === 'fr' ? 'Passer au paiement' : 'Proceed to Checkout'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
