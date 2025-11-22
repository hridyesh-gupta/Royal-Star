
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ChefSpecialSection from '@/components/ChefSpecialSection';
import BrandValuesSection from '@/components/BrandValuesSection';
import SpecialOffersSection from '@/components/SpecialOffersSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ChefSpecialSection />
        <BrandValuesSection />
        <SpecialOffersSection />
      </main>
      <Footer />
    </div>
  );
}
