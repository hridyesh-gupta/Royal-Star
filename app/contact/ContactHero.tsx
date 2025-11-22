
'use client';

import { useLanguage } from '../../components/LanguageProvider';

export default function ContactHero() {
  const { language } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://public.readdy.ai/ai/video_res/30ca2a00-2b84-4875-a83f-4b149a37d8b6.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 text-white max-w-4xl mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-pacifico)' }}>
            {language === 'fr' ? 'Visitez le restaurant Royal Star' : 'Visit Royal Star Restaurant'}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Découvrez une cuisine indienne authentique et l’hospitalité suisse à Meyrin.'
              : 'Experience authentic Indian cuisine meets Swiss hospitality in Meyrin'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-white">
              {language === 'fr' ? 'Visitez notre restaurant' : 'Visit Our Restaurant'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mt-1">
                  <i className="ri-map-pin-line text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-white font-medium">16, Promenade des Champs-Fréchets</p>
                  <p className="text-white/80">1217 Meyrin, Switzerland</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mt-1">
                  <i className="ri-phone-line text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-white font-medium">+41 22 525 88 11</p>
                  <p className="text-white/80">077 938 51 69 / 077 998 07 46</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mt-1">
                  <i className="ri-mail-line text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-white font-medium">royal.star.geneve@gmail.com</p>
                  <p className="text-white/80">{language === 'fr' ? 'Nous répondons dans les 12 heures' : 'We reply within 12 hours'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-white">
              {language === 'fr' ? 'Horaires d’ouverture' : 'Opening Hours'}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">
                  {language === 'fr' ? 'Lundi - Dimanche' : 'Monday - Sunday'}
                </span>
                <span className="font-medium text-white">7:00 AM - 8:00 PM</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">
                {language === 'fr' ? 'Atouts du restaurant' : 'Restaurant Features'}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <i className="ri-check-line text-orange-500 mr-2"></i>
                  <span className="text-white/80 text-sm">
                    {language === 'fr' ? 'Cuisine indienne authentique' : 'Authentic Indian'}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-orange-500 mr-2"></i>
                  <span className="text-white/80 text-sm">
                    {language === 'fr' ? 'Hospitalité suisse' : 'Swiss Hospitality'}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-orange-500 mr-2"></i>
                  <span className="text-white/80 text-sm">
                    {language === 'fr' ? 'Vins premium' : 'Premium Wines'}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-orange-500 mr-2"></i>
                  <span className="text-white/80 text-sm">
                    {language === 'fr' ? 'Ambiance familiale' : 'Family Dining'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
