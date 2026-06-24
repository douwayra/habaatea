import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, ArrowUp } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer({ setActiveTab }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-dark border-t border-gray-900 text-gray-400 mt-auto">
      {/* Upper part */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <img 
              src={logo} 
              alt="HABAATEA Logo" 
              className="h-24 w-auto brightness-105"
            />
            <p className="text-sm leading-relaxed text-gray-300">
              « HABAATEA : L’héritage de la nigelle, l’innovation au service du bien-être. »
            </p>
            <p className="text-xs text-gray-500 leading-normal italic">
              "Utilisez la graine de nigelle, car elle contient un remède contre toute maladie..." - Hadith
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-accent-gold text-sm font-semibold tracking-wider uppercase">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-accent-gold transition-colors duration-150 cursor-pointer">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('shop')} className="hover:text-accent-gold transition-colors duration-150 cursor-pointer">
                  Boutique
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-accent-gold transition-colors duration-150 cursor-pointer">
                  À Propos de nous
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-accent-gold transition-colors duration-150 cursor-pointer">
                  Contact & Assistance
                </button>
              </li>
            </ul>
          </div>

          {/* Social Impact / Sourcing */}
          <div className="space-y-4">
            <h3 className="text-primary-green-glow text-sm font-semibold tracking-wider uppercase">Notre Engagement</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              HABAATEA s’engage pour l'agro-industrie sénégalaise en transformant localement nos ingrédients. Nous créons des opportunités économiques pour la jeunesse et soutenons les coopératives agricoles locales.
            </p>
          </div>

          {/* Contacts info */}
          <div className="space-y-4">
            <h3 className="text-accent-gold text-sm font-semibold tracking-wider uppercase">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-accent-gold-light shrink-0 mt-0.5" />
                <span>Kirène, Thiès, Sénégal</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent-gold-light shrink-0" />
                <span>+221 33 855 87 87 / +221 76 401 11 11</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent-gold-light shrink-0" />
                <span>habaatea2026@gmail.com</span>
              </li>
            </ul>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 rounded-full bg-primary-dark-light hover:bg-accent-gold/20 hover:text-accent-gold transition-all duration-200" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-dark-light hover:bg-accent-gold/20 hover:text-accent-gold transition-all duration-200" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-dark-light hover:bg-accent-gold/20 hover:text-accent-gold transition-all duration-200" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lower part */}
      <div className="bg-primary-dark-light border-t border-gray-900 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} HABAATEA. Tous droits réservés. Conçu pour la promotion du bien-être naturel.
          </p>
          <button 
            onClick={scrollToTop} 
            className="mt-4 sm:mt-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-primary-dark-lighter border border-gray-800 text-xs font-medium text-gray-300 hover:text-accent-gold hover:border-accent-gold/30 transition-all duration-200 cursor-pointer"
          >
            <span>Retour en haut</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
