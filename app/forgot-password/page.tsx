'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../components/LanguageProvider';

export default function ForgotPasswordPage() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setError(
          language === 'fr'
            ? "Une erreur est survenue. Veuillez réessayer plus tard."
            : 'Something went wrong. Please try again later.'
        );
      } else {
        setSubmitted(true);
      }
    } catch {
      setError(
        language === 'fr'
          ? "Une erreur est survenue. Veuillez réessayer plus tard."
          : 'Something went wrong. Please try again later.'
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
                {language === 'fr' ? 'Réinitialiser le mot de passe' : 'Reset Password'}
              </h1>
              <p className="text-sm text-red-800">
                {language === 'fr'
                  ? 'Saisissez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.'
                  : 'Enter your email address and we will send you a link to reset your password.'}
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

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              {submitted && !error && (
                <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  {language === 'fr'
                    ? "Si un compte existe avec cette adresse e-mail, un lien de réinitialisation a été envoyé."
                    : 'If an account exists with this email, a password reset link has been sent.'}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? language === 'fr'
                    ? 'Envoi en cours...'
                    : 'Sending...'
                  : language === 'fr'
                    ? 'Envoyer le lien de réinitialisation'
                    : 'Send reset link'}
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
