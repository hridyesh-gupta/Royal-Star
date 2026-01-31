'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../components/LanguageProvider';

type AuthResponseUser = {
  id: number;
  name: string | null;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
};

export default function RegisterPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (password !== confirmPassword) {
      setError(
        language === 'fr'
          ? 'Les mots de passe ne correspondent pas.'
          : 'Passwords do not match.'
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = (await response.json()) as {
        user?: AuthResponseUser;
        error?: string;
        newcomerEmailSent?: boolean;
      };

      if (!response.ok || !data.user) {
        setError(
          data.error ||
            (language === 'fr'
              ? "Une erreur est survenue lors de l'inscription."
              : 'Something went wrong while creating your account.')
        );
        setIsSubmitting(false);
        return;
      }
      const sent = data.newcomerEmailSent === true;

      if (sent) {
        setSuccessMessage(
          language === 'fr'
            ? "Votre compte a été créé. Un email contenant votre code promo de bienvenue vous a été envoyé."
            : 'Your account has been created. We have sent an email with your newcomer promo code.'
        );
      } else {
        setSuccessMessage(
          language === 'fr'
            ? 'Votre compte a été créé avec succès.'
            : 'Your account has been created successfully.'
        );
      }

      setTimeout(() => {
        router.push('/');
      }, 6000);
    } catch {
      setError(
        language === 'fr'
          ? 'Une erreur est survenue. Veuillez réessayer.'
          : 'Something went wrong. Please try again.'
      );
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
                {language === 'fr' ? 'Créer un compte' : 'Create Account'}
              </h1>
              <p className="text-sm text-red-800">
                {language === 'fr'
                  ? 'Rejoignez Royal Star pour une expérience de commande plus fluide.'
                  : 'Join Royal Star for a smoother ordering experience.'}
              </p>
            </div>

            {successMessage && (
              <div className="mb-4 text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-red-900 mb-2">
                  {language === 'fr' ? 'Nom complet' : 'Full name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                />
              </div>

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
                />
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
                    ? "Création du compte..."
                    : 'Creating account...'
                  : language === 'fr'
                    ? "S'inscrire"
                    : 'Register'}
              </button>

              <p className="text-xs text-center text-gray-600">
                {language === 'fr' ? 'Vous avez déjà un compte ?' : 'Already have an account?'}{' '}
                <a
                  href="/login"
                  className="text-red-600 hover:text-red-700 font-medium cursor-pointer"
                >
                  {language === 'fr' ? 'Se connecter' : 'Login'}
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
