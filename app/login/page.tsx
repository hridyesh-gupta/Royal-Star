'use client';

import { useState } from 'react';
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

export default function LoginPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as { user?: AuthResponseUser; error?: string };

      if (!response.ok || !data.user) {
        setError(
          data.error ||
            (language === 'fr' ? 'Identifiants invalides. Veuillez réessayer.' : 'Invalid credentials. Please try again.')
        );
        setIsSubmitting(false);
        return;
      }

      const from = searchParams.get('from');

      if (from && from !== 'admin') {
        router.push(from.startsWith('/') ? from : `/${from}`);
      } else {
        router.push('/');
      }
    } catch {
      setError(language === 'fr' ? 'Une erreur est survenue. Veuillez réessayer.' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                {language === 'fr' ? 'Connexion' : 'Login'}
              </h1>
              <p className="text-sm text-red-800">
                {language === 'fr'
                  ? 'Connectez-vous pour accéder à votre compte Royal Star.'
                  : 'Log in to access your Royal Star account.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-red-900 mb-2">
                  {language === 'fr' ? 'Adresse e-mail' : 'Email address'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-900 mb-2">
                  {language === 'fr' ? 'Mot de passe' : 'Password'}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                />
              </div>

              <div className="text-right text-xs">
                <a
                  href="/forgot-password"
                  className="text-red-600 hover:text-red-700 font-medium cursor-pointer"
                >
                  {language === 'fr' ? 'Mot de passe oublié ?' : 'Forgot password?'}
                </a>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? language === 'fr'
                    ? 'Connexion en cours...'
                    : 'Signing in...'
                  : language === 'fr'
                    ? 'Se connecter'
                    : 'Login'}
              </button>

              <p className="text-xs text-center text-gray-600">
                {language === 'fr' ? "Vous n'avez pas de compte ?" : 'Do not have an account yet?'}{' '}
                <a
                  href="/register"
                  className="text-red-600 hover:text-red-700 font-medium cursor-pointer"
                >
                  {language === 'fr' ? 'Créer un compte' : 'Create an account'}
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
