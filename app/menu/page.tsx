'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MenuSection from './MenuSection';
import MenuHero from './MenuHero';

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <MenuHero />
      <MenuSection />
      <Footer />
    </div>
  );
}