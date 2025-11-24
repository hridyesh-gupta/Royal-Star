
'use client';

import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="bg-brand-red-dark text-white">      
      {/* Main Footer */}
      <div className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <img 
                  // src="https://static.readdy.ai/image/d8d2cb7f50a8dd49f4a2ee558dead2a7/b61ee4a13a9d6045fa7fc64f195e7bcb.png" 
                  src="/Logo.jpg"
                  alt="Royal Star Cafe Logo" 
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                {language === 'fr'
                  ? 'Découvrez l\'hospitalité suisse et un café d\'exception au cœur du quartier Meyrin à Genève. Là où le charme traditionnel suisse rencontre la culture des saveurs authentiques et un accueil chaleureux.'
                  : 'Discover Swiss hospitality and an exceptional cafe in the heart of Geneva\'s Meyrin district. Where traditional Swiss charm meets the culture of authentic flavors and warm hospitality.'}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center hover:bg-brand-red-dark transition-colors cursor-pointer">
                  <i className="ri-facebook-fill text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center hover:bg-brand-red-dark transition-colors cursor-pointer">
                  <i className="ri-instagram-line text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center hover:bg-brand-red-dark transition-colors cursor-pointer">
                  <i className="ri-twitter-fill text-white"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4 text-brand-white">
                {language === 'fr' ? 'Informations de contact' : 'Contact Info'}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center text-white/80">
                  <i className="ri-map-pin-line mr-3 text-brand-red"></i>
                  <span>Promenade des Champs-Fréchets 16, CH-1217 Meyrin</span>
                </div>
                <div className="flex items-center text-white/80">
                  <i className="ri-phone-line mr-3 text-brand-red"></i>
                  <span>+41 22 525 88 11 </span> 
                  {/* / 077 938 51 69 / 077 998 07 46 */}
                </div>
                <div className="flex items-center text-white/80">
                  <i className="ri-mail-line mr-3 text-brand-red"></i>
                  <span>royal.star.geneve@gmail.com</span>
                </div>
                <div className="flex items-center text-white/80">
                  <i className="ri-time-line mr-3 text-brand-red"></i>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: language === 'fr'
                        ? 'Sam 08h00 - 00h00<br />Dim 08h00 - 22h30<br />Lun 07h30 - 22h00<br />Mar 07h30 - 22h00<br />Mer 07h30 - 22h00<br />Jeu 07h30 - 23h00<br />Ven 07h30 - 00h00'
                        : 'Sat 8:00 AM - 12:00 AM<br />Sun 8:00 AM - 10:30 PM<br />Mon 7:30 AM - 10:00 PM<br />Tue 7:30 AM - 10:00 PM<br />Wed 7:30 AM - 10:00 PM<br />Thu 7:30 AM - 11:00 PM<br />Fri 7:30 AM - 12:00 AM'
                    }}
                  />

                </div>
              </div>
            </div>
          </div>
          <hr className="border-white/20 my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
             <span className="text-white-400 text-sm">
                {language === 'fr' ? 'Développé et maintenu avec ❤️ par' : 'Developed and maintained with ❤️ by'} <strong><a href="https://ai.hridx.tech/" className="text-amber-400 underline underline-offset-4">HridxAI</a></strong>...
              </span>
              <br />
            <p className="text-white/60 text-sm">
              {language === 'fr'
                ? '2024 Royal Star Cafe. Tous droits réservés.'
                : '2024 Royal Star Cafe. All rights reserved.'}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-brand-red text-sm transition-colors cursor-pointer">
                {language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
              </a>
              <a href="#" className="text-white/60 hover:text-brand-red text-sm transition-colors cursor-pointer">
                {language === 'fr' ? 'Conditions d’utilisation' : 'Terms of Service'}
              </a>
              {/* <a href="#" className="text-white/60 hover:text-red-400 text-sm transition-colors cursor-pointer">
                {language === 'fr' ? 'Politique de cookies' : 'Cookie Policy'}
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
