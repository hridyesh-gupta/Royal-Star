import Header from '../../components/Header';
import Footer from '../../components/Footer';
import EventsSection from '../../components/EventsSection';

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-10">
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
}
