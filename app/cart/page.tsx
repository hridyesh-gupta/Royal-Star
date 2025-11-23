
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CartHero from './CartHero';
import CartItems from './CartItems';

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <CartHero />
      <section className="bg-gradient-to-br from-red-50 to-red-50 min-h-screen">
        <CartItems />
      </section>
      <Footer />
    </div>
  );
}
