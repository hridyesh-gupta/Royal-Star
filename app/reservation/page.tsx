import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ReservationForm from './ReservationForm';

export default function ReservationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-50">
      <Header />
      <main className="pt-32 pb-16">
        <ReservationForm />
      </main>
      <Footer />
    </div>
  );
}
