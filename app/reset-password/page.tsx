'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../components/LanguageProvider';

type AuthResponseUser = {
  id: number;
  name: string | null;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
};

export default function ResetPasswordPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = searchParams.get('token');
    setToken(t);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError(
        language === 'fr'
          ? 'Lien de réinitialisation invalide ou expiré.'
          : 'Invalid or expired reset link.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        language === 'fr'
          ? 'Les mots de passe ne correspondent pas.'
          : 'Passwords do not match.'
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = (await response.json()) as { user?: AuthResponseUser; error?: string };

      if (!response.ok || !data.user) {
        setError(
          data.error ||
            (language === 'fr'
              ? 'Lien de réinitialisation invalide ou expiré.'
              : 'Invalid or expired reset link.')
        );
        setIsSubmitting(false);
        return;
      }

      router.push('/');
    } catch {
      setError(
        language === 'fr'
          ? "Une erreur est survenue. Veuillez réessayer."
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasToken = token && token.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-50">
      <Header />
      <main className="pt-32 pb-16">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white border border-rose-200 rounded-3xl shadow-sm p-6 md:p-8">
            <div className="mb-6 text-center">
              <h1
                className="text-4xl font-bold mb-3 text-red-900"
                style={{ fontFamily: 'var(--font-pacifico)' }}
              >
                {language === 'fr' ? 'Nouveau mot de passe' : 'New Password'}
              </h1>
              <p className="text-sm text-red-800">
                {language === 'fr'
                  ? 'Choisissez un nouveau mot de passe sécurisé pour votre compte.'
                  : 'Choose a new secure password for your account.'}
              </p>
            </div>

            {!hasToken && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
                {language === 'fr'
                  ? 'Lien de réinitialisation invalide ou expiré.'
                  : 'Invalid or expired reset link.'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-red-900 mb-2">
                  {language === 'fr' ? 'Nouveau mot de passe' : 'New password'}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                  disabled={!hasToken}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-900 mb-2">
                  {language === 'fr' ? 'Confirmer le mot de passe' : 'Confirm password'}
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                  disabled={!hasToken}
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !hasToken}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? language === 'fr'
                    ? 'Mise à jour en cours...'
                    : 'Updating...'
                  : language === 'fr'
                    ? 'Mettre à jour le mot de passe'
                    : 'Update password'}
              </button>

              <p className="text-xs text-center text-gray-600">
                <a href="/login" className="text-red-600 hover:text-red-700 font-medium cursor-pointer">
                  {language === 'fr' ? 'Retour à la connexion' : 'Back to login'}
                </a>
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
