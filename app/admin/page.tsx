'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../components/LanguageProvider';

type AuthUser = {
  id: number;
  name: string | null;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
};

type PromoCode = {
  id: number;
  code: string;
  percentage: number;
  active: boolean;
  isNewcomer: boolean;
  createdAt: string;
};

export default function AdminPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [newCode, setNewCode] = useState('');
  const [newPercentage, setNewPercentage] = useState('30');
  const [newIsNewcomer, setNewIsNewcomer] = useState(false);

  const loadPromoCodes = async () => {
    setPromoLoading(true);
    setPromoError(null);

    try {
      const response = await fetch('/api/promocodes');
      if (!response.ok) {
        throw new Error('Failed to load promo codes');
      }

      const data = (await response.json()) as { promoCodes: PromoCode[] };
      setPromoCodes(Array.isArray(data.promoCodes) ? data.promoCodes : []);
    } catch (error) {
      console.error('Error loading promo codes:', error);
      setPromoError(
        language === 'fr'
          ? 'Impossible de charger les codes promo.'
          : 'Unable to load promo codes.'
      );
    } finally {
      setPromoLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await fetch('/api/auth/me', { method: 'GET' });
        if (!response.ok) {
          if (isMounted) {
            router.replace('/login?from=admin');
          }
          return;
        }

        const data = (await response.json()) as { user: AuthUser | null };

        if (!data.user || data.user.role !== 'ADMIN') {
          if (isMounted) {
            router.replace('/login?from=admin');
          }
          return;
        }

        if (isMounted) {
          setUser(data.user);
          await loadPromoCodes();
        }
      } catch {
        if (isMounted) {
          router.replace('/login?from=admin');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [router, language]);

  const handleCreatePromo = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedCode = newCode.trim();
    const percentageValue = parseInt(newPercentage, 10);

    if (!trimmedCode || Number.isNaN(percentageValue)) {
      setPromoError(
        language === 'fr'
          ? 'Veuillez entrer un code et un pourcentage valides.'
          : 'Please enter a valid code and percentage.'
      );
      return;
    }

    setPromoLoading(true);
    setPromoError(null);

    try {
      const response = await fetch('/api/promocodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: trimmedCode,
          percentage: percentageValue,
          active: true,
          isNewcomer: newIsNewcomer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          data?.error ||
          (language === 'fr'
            ? "Impossible de créer le code promo."
            : 'Unable to create promo code.');
        setPromoError(message);
        return;
      }

      setNewCode('');
      setNewPercentage('30');
      setNewIsNewcomer(false);
      await loadPromoCodes();
    } catch (error) {
      console.error('Error creating promo code:', error);
      setPromoError(
        language === 'fr'
          ? "Une erreur s'est produite lors de la création du code promo."
          : 'An error occurred while creating the promo code.'
      );
    } finally {
      setPromoLoading(false);
    }
  };

  const handleDeletePromo = async (id: number) => {
    if (!window.confirm(
      language === 'fr'
        ? 'Supprimer ce code promo ?'
        : 'Delete this promo code?'
    )) {
      return;
    }

    try {
      const response = await fetch(`/api/promocodes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Failed to delete promo code');
        return;
      }

      setPromoCodes((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting promo code:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-50">
      <Header />
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border border-rose-200 rounded-3xl shadow-sm p-6 md:p-8">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <i className="ri-loader-4-line text-3xl text-red-500 animate-spin" />
              </div>
            ) : !user ? (
              <div className="text-center py-10">
                <p className="text-red-800 text-lg">
                  {language === 'fr'
                    ? 'Redirection vers la page de connexion...'
                    : 'Redirecting to login page...'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h1
                  className="text-4xl font-bold mb-3 text-red-900"
                  style={{ fontFamily: 'var(--font-pacifico)' }}
                >
                  {language === 'fr' ? 'Tableau de bord administrateur' : 'Admin Dashboard'}
                </h1>
                <p className="text-red-800 text-sm mb-4">
                  {language === 'fr'
                    ? "Seuls les comptes administrateurs peuvent accéder à cette page."
                    : 'Only administrator accounts can access this page.'}
                </p>
                <div className="mt-6 space-y-6">
                  <p className="text-sm text-gray-700 mb-2">
                    {language === 'fr'
                      ? 'Utilisez ce tableau de bord pour gérer les codes promo utilisés lors du paiement (par exemple le code de bienvenue pour les nouveaux clients).'
                      : 'Use this dashboard to manage promo codes applied at checkout (for example the newcomer welcome code).'}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                      <h2 className="text-lg font-semibold text-red-900 mb-3">
                        {language === 'fr' ? 'Générateur de code promo' : 'Promo Code Generator'}
                      </h2>
                      <form onSubmit={handleCreatePromo} className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-red-900 mb-1">
                            {language === 'fr' ? 'Code' : 'Code'}
                          </label>
                          <input
                            type="text"
                            value={newCode}
                            onChange={(e) => setNewCode(e.target.value)}
                            className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                            placeholder={language === 'fr' ? 'Ex: BIENVENUE30' : 'Ex: WELCOME30'}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-red-900 mb-1">
                            {language === 'fr' ? 'Réduction (%)' : 'Discount (%)'}
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={90}
                            value={newPercentage}
                            onChange={(e) => setNewPercentage(e.target.value)}
                            className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                            required
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            id="newcomer-toggle"
                            type="checkbox"
                            checked={newIsNewcomer}
                            onChange={(e) => setNewIsNewcomer(e.target.checked)}
                            className="rounded border-red-300 text-red-600 focus:ring-red-500"
                          />
                          <label htmlFor="newcomer-toggle" className="text-sm text-red-900">
                            {language === 'fr'
                              ? 'Code de bienvenue pour les nouveaux clients'
                              : 'Newcomer welcome code'}
                          </label>
                        </div>
                        <button
                          type="submit"
                          disabled={promoLoading}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full text-sm font-semibold transition-colors disabled:opacity-60"
                        >
                          {promoLoading
                            ? language === 'fr'
                              ? 'Création en cours...'
                              : 'Creating...'
                            : language === 'fr'
                              ? 'Créer le code promo'
                              : 'Create Promo Code'}
                        </button>
                        {promoError && (
                          <p className="text-xs text-red-700 mt-1">{promoError}</p>
                        )}
                      </form>
                    </div>

                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                      <h2 className="text-lg font-semibold text-red-900 mb-3">
                        {language === 'fr' ? 'Codes promo actifs' : 'Active Promo Codes'}
                      </h2>
                      {promoLoading && (
                        <div className="flex items-center justify-center py-6">
                          <i className="ri-loader-4-line text-xl text-red-500 animate-spin" />
                        </div>
                      )}
                      {!promoLoading && promoCodes.length === 0 && (
                        <p className="text-sm text-red-800">
                          {language === 'fr'
                            ? 'Aucun code promo actif pour le moment.'
                            : 'No active promo codes yet.'}
                        </p>
                      )}
                      {!promoLoading && promoCodes.length > 0 && (
                        <div className="space-y-3">
                          {promoCodes.map((promo) => (
                            <div
                              key={promo.id}
                              className="flex items-center justify-between bg-white border border-rose-100 rounded-xl px-3 py-2"
                            >
                              <div>
                                <p className="font-mono text-sm text-red-900">{promo.code}</p>
                                <p className="text-xs text-red-800">
                                  {promo.percentage}%
                                  {promo.isNewcomer && (
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-600 text-white">
                                      {language === 'fr' ? 'Nouveaux clients' : 'Newcomers'}
                                    </span>
                                  )}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleDeletePromo(promo.id)}
                                className="text-xs text-red-700 hover:text-red-900 font-semibold"
                              >
                                {language === 'fr' ? 'Supprimer' : 'Delete'}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
