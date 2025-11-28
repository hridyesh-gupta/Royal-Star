
'use client';

import { useState, useEffect } from 'react';
import { getCart, getCartTotal, clearCart, type CartItem } from '../../lib/cart';
import { useLanguage } from '../../components/LanguageProvider';

const DELIVERY_ZONES = [
  {
    name: 'Zone 1',
    zipCodes: ['1211', '1217'],
    minOrder: 20,
    deliveryFee: 10,
  },
  {
    name: 'Zone 2',
    zipCodes: ['1214', '1215', '1216', '1218', '1220', '1242'],
    minOrder: 40,
    deliveryFee: 15,
  },
  {
    name: 'Zone 3',
    zipCodes: ['1201', '1202', '1203', '1209', '1219', '1239', '1292', '1293', '1294'],
    minOrder: 60,
    deliveryFee: 20,
  },
  {
    name: 'Zone 4',
    zipCodes: ['1213', '1232', '1233', '1236', '1237', '1281', '1283', '1288', '1290', '1291', '1295', '1296'],
    minOrder: 80,
    deliveryFee: 25,
  },
  {
    name: 'Zone 5',
    zipCodes: ['1204', '1205', '1206', '1207', '1208', '1212', '1227', '1228', '1258', '1285', '1286', '1287'],
    minOrder: 100,
    deliveryFee: 30,
  },
];

export default function CheckoutForm() {
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: ''
  });
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const selectedZone = DELIVERY_ZONES.find((zone) =>
    zone.zipCodes.includes(address.postalCode)
  );

  const subtotal = getCartTotal();
  const deliveryFee = deliveryMethod === 'delivery' && selectedZone ? selectedZone.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert(language === 'fr' ? 'Votre panier est vide' : 'Your cart is empty');
      return;
    }

    if (deliveryMethod === 'delivery') {
      if (!selectedZone) {
        alert(
          language === 'fr'
            ? 'Veuillez sélectionner un code postal de livraison'
            : 'Please select a delivery zipcode'
        );
        return;
      }

      if (subtotal < selectedZone.minOrder) {
        alert(
          language === 'fr'
            ? `Montant minimum de commande pour ${selectedZone.name} : CHF ${selectedZone.minOrder.toFixed(2)}. Votre sous-total actuel est de CHF ${subtotal.toFixed(2)}.`
            : `Minimum order for ${selectedZone.name} is CHF ${selectedZone.minOrder.toFixed(2)}. Your current subtotal is CHF ${subtotal.toFixed(2)}.`
        );
        return;
      }
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deliveryMethod,
          customerInfo,
          address,
          specialInstructions,
          paymentMethod,
          cartItems,
          language,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.error || (language === 'fr' ? "Une erreur s'est produite lors du traitement de votre commande." : 'Something went wrong while processing your order.');
        alert(message);
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (paymentMethod === 'stripe' && data?.url) {
        window.location.href = data.url as string;
        return;
      }

      setShowSuccess(true);
      clearCart();
      setCartItems([]);
      setIsLoading(false);

      setTimeout(() => {
        setShowSuccess(false);
        setCustomerInfo({ fullName: '', email: '', phone: '' });
        setAddress({ street: '', city: '', postalCode: '' });
        setSpecialInstructions('');
      }, 8000);
    } catch (error) {
      console.error('Checkout error', error);
      alert(language === 'fr' ? "Une erreur s'est produite lors du traitement de votre commande." : 'Something went wrong while processing your order.');
      setIsLoading(false);
    }
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-check-line text-2xl text-green-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-red-900 mb-2">
            {language === 'fr' ? 'Commande confirmée !' : 'Order Confirmed!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'fr'
              ? 'Merci pour votre commande. Nous allons la préparer dans les plus brefs délais.'
              : "Thank you for your order. We'll prepare it shortly."}
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap"
          >
            {language === 'fr' ? 'Retour à l’accueil' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Method */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-red-900 mb-4">
                {language === 'fr' ? 'Méthode de commande' : 'Order Method'}
              </h2>
              <div className="grid gap-3">
                {[
                  { value: 'delivery', label: language === 'fr' ? 'Livraison' : 'Delivery', icon: 'truck' }
                  // { value: 'pickup', label: language === 'fr' ? 'À emporter' : 'Pickup', icon: 'store' }
                ].map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setDeliveryMethod(method.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      deliveryMethod === method.value
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-red-300 text-gray-600'
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                      <i className={`ri-${method.icon}-line text-xl`}></i>
                    </div>
                    <span className="font-medium text-sm">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-red-900 mb-4">
                {language === 'fr' ? 'Informations client' : 'Customer Information'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Nom complet *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.fullName}
                    onChange={(e) => setCustomerInfo({...customerInfo, fullName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    placeholder={language === 'fr' ? 'Entrez votre nom complet' : 'Enter your full name'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Adresse e-mail *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    placeholder={language === 'fr' ? 'Entrez votre e-mail' : 'Enter your email'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Numéro de téléphone *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  placeholder="+41 XX XXX XX XX"
                />
              </div>
            </div>

            {/* Delivery Address */}
            {deliveryMethod === 'delivery' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-red-900 mb-4">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address.street}
                      onChange={(e) => setAddress({...address, street: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                      placeholder={language === 'fr' ? 'Entrez votre adresse' : 'Enter street address'}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'fr' ? 'Ville *' : 'City *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({...address, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                        placeholder={language === 'fr' ? 'Entrez votre ville' : 'Enter city'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'fr' ? 'Code postal de livraison *' : 'Delivery Zipcode *'}
                      </label>
                      <select
                        required
                        value={address.postalCode}
                        onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm bg-white"
                      >
                        <option value="">
                          {language === 'fr' ? 'Sélectionnez votre code postal' : 'Select your zipcode'}
                        </option>
                        {DELIVERY_ZONES.map((zone) => (
                          <optgroup
                            key={zone.name}
                            label={`${zone.name} - ${language === 'fr' ? 'Commande minimum CHF' : 'Minimum Order: CHF'} ${zone.minOrder.toFixed(2)}, ${language === 'fr' ? 'Frais de livraison: CHF' : 'Delivery CHF'} ${zone.deliveryFee.toFixed(2)}`}
                          >
                            {zone.zipCodes.map((zip) => (
                              <option key={zip} value={zip}>
                                {zip}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      {selectedZone && (
                        <p className="mt-2 text-xs text-gray-600">
                          {language === 'fr'
                            ? `Commande minimum pour ${selectedZone.name} : CHF ${selectedZone.minOrder.toFixed(2)}. Frais de livraison : CHF ${selectedZone.deliveryFee.toFixed(2)}.`
                            : `Minimum order for ${selectedZone.name}: CHF ${selectedZone.minOrder.toFixed(2)}. Delivery fee: CHF ${selectedZone.deliveryFee.toFixed(2)}.`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-red-900 mb-4">
                {language === 'fr' ? 'Mode de paiement' : 'Payment Method'}
              </h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-red-300">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-red-500 focus:ring-red-500"
                  />
                  <div className="ml-3 flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center mr-3">
                      <i className="ri-bank-card-line text-xl text-blue-600"></i>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {language === 'fr' ? 'Carte de crédit/débit' : 'Credit/Debit Card'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {language === 'fr' ? 'Payez sécurisément avec Stripe' : 'Pay securely with Stripe'}
                      </div>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-red-300">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-red-500 focus:ring-red-500"
                  />
                  <div className="ml-3 flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center mr-3">
                      <i className="ri-hand-coin-line text-xl text-green-600"></i>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {language === 'fr' ? 'Paiement à la livraison' : 'Cash on Delivery'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {language === 'fr' ? 'Payez à la réception de votre commande' : 'Pay when you receive your order'}
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-red-900 mb-4">
                {language === 'fr' ? 'Instructions spéciales' : 'Special Instructions'}
              </h2>
              <div>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setSpecialInstructions(e.target.value);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  rows={4}
                  placeholder={language === 'fr' ? 'Des instructions spéciales pour votre commande...' : 'Any special instructions for your order...'}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {specialInstructions.length}/500
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="bg-white rounded-xl shadow-lg p-6 mt-auto">
              <h2 className="text-xl font-semibold text-red-900 mb-4">
                {language === 'fr' ? 'Résumé de la commande' : 'Order Summary'}
              </h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-shopping-cart-line text-2xl text-gray-400"></i>
                  </div>
                  <p className="text-gray-500">
                    {language === 'fr' ? 'Votre panier est vide' : 'Your cart is empty'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium text-red-900">
                          CHF {(parseFloat(item.price.replace('CHF ', '')) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{language === 'fr' ? 'Sous-total' : 'Subtotal'}</span>
                      <span>CHF {subtotal.toFixed(2)}</span>
                    </div>
                    {deliveryMethod === 'delivery' && selectedZone && (
                      <div className="flex justify-between text-sm">
                        <span>{language === 'fr' ? 'Frais de livraison' : 'Delivery Fee'}</span>
                        <span>CHF {deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>{language === 'fr' ? 'Total' : 'Total'}</span>
                      <span className="text-red-900">CHF {total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-3 mt-6">
                <button
                  type="submit"
                  disabled={isLoading || cartItems.length === 0}
                  className="w-full bg-gradient-to-r from-red-900 to-red-600 hover:from-red-800 hover:to-red-500 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-full font-medium transition-all duration-300"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      {language === 'fr' ? 'Traitement en cours...' : 'Processing...'}
                    </span>
                  ) : (
                    paymentMethod === 'stripe'
                      ? language === 'fr' ? 'Payer maintenant (Stripe)' : 'Pay Now (Stripe)'
                      : language === 'fr' ? 'Passer la commande (paiement à la livraison)' : 'Place Order (COD)'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { window.location.href = '/menu'; }}
                  className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-full font-medium transition-colors"
                >
                  {language === 'fr' ? 'Ajouter plus d’articles' : 'Add more items'}
                </button>

                <button
                  type="button"
                  onClick={handleClearCart}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-full font-medium transition-colors whitespace-nowrap"
                >
                  {language === 'fr' ? 'Vider le panier' : 'Clear Cart'}
                </button>
              </div>
            </div>
          </div>
        </form>
  );
}
