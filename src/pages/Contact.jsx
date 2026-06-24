import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, CheckCircle2 } from 'lucide-react';

const DISTRIBUTION_POINTS = [
  {
    city: 'Kirène, Thiès (Siège & Production)',
    address: 'Zone de Production de Kirène, Région de Thiès',
    phone: '+221 33 855 87 87',
    type: 'Siège social et Site de transformation'
  },
  {
    city: 'Dakar (Showroom & Boutique)',
    address: 'Avenue Bourguiba, Dakar, Sénégal',
    phone: '+221 76 401 11 11',
    type: 'Boutique Officielle'
  },
  {
    city: 'Saint-Louis',
    address: 'Boutique Bio-Natur, Quartier Ndar',
    phone: '+221 77 550 00 00',
    type: 'Distributeur Exclusif'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [activePointIndex, setActivePointIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulating message transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">Contact & Points de Vente</h1>
        <div className="h-1 w-12 bg-accent-gold mx-auto rounded-full" />
        <p className="max-w-lg mx-auto text-sm text-gray-400 font-light">
          Vous avez une question, souhaitez devenir distributeur ou acheter nos produits ? Contactez-nous.
        </p>
      </div>

      {/* Main Grid: Form & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Contact Form Panel */}
        <div className="p-8 rounded-2xl bg-primary-dark-light border border-gray-800 space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-accent-gold-light" />
            <span>Envoyez-nous un Message</span>
          </h2>
          
          {submitSuccess ? (
            <div className="p-6 rounded-xl bg-primary-green/10 border border-primary-green-glow/30 flex flex-col items-center text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-primary-green-glow animate-pulse" />
              <h3 className="font-bold text-white text-base">Message envoyé !</h3>
              <p className="text-xs text-gray-400 max-w-xs">
                Merci pour votre intérêt. Notre équipe de conseillers HABAATEA vous répondra dans les plus brefs délais.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs text-gray-400 font-medium">Nom Complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Babacar Ndiaye"
                    className="w-full px-4 py-2.5 rounded-xl bg-primary-dark-lighter border border-gray-800 focus:border-accent-gold/40 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs text-gray-400 font-medium">Adresse Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ex: babacar@email.sn"
                    className="w-full px-4 py-2.5 rounded-xl bg-primary-dark-lighter border border-gray-800 focus:border-accent-gold/40 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs text-gray-400 font-medium">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Ex: Demande de partenariat de distribution"
                  className="w-full px-4 py-2.5 rounded-xl bg-primary-dark-lighter border border-gray-800 focus:border-accent-gold/40 text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs text-gray-400 font-medium">Votre Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Écrivez votre message ici..."
                  className="w-full px-4 py-2.5 rounded-xl bg-primary-dark-lighter border border-gray-800 focus:border-accent-gold/40 text-sm text-white focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-accent-gold hover:bg-accent-gold-light text-primary-dark font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Envoi en cours...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4 stroke-[2.5]" />
                    <span>Envoyer mon message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact details and distribution map */}
        <div className="space-y-8">
          
          {/* Quick info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-primary-dark-light border border-gray-800 flex flex-col items-center text-center space-y-2">
              <Phone className="h-5 w-5 text-accent-gold-light" />
              <h4 className="text-xs font-semibold text-white">Téléphone</h4>
              <p className="text-[10px] text-gray-400 leading-normal">+221 33 855 87 87<br/>+221 76 401 11 11</p>
            </div>
            <div className="p-5 rounded-xl bg-primary-dark-light border border-gray-800 flex flex-col items-center text-center space-y-2">
              <Mail className="h-5 w-5 text-accent-gold-light" />
              <h4 className="text-xs font-semibold text-white">Email</h4>
              <p className="text-[10px] text-gray-400">habaatea2026@gmail.com</p>
            </div>
            <div className="p-5 rounded-xl bg-primary-dark-light border border-gray-800 flex flex-col items-center text-center space-y-2">
              <MapPin className="h-5 w-5 text-accent-gold-light" />
              <h4 className="text-xs font-semibold text-white">Siège</h4>
              <p className="text-[10px] text-gray-400">Kirène, Thiès, Sénégal</p>
            </div>
          </div>

          {/* Custom Interactive Map Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-primary-dark-light to-primary-dark border border-gray-850 space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                <Globe className="h-4.5 w-4.5 text-primary-green-glow" />
                <span>Réseau de Distribution Sénégal</span>
              </h3>
              <p className="text-xs text-gray-400 font-light">
                Cliquez sur une ville pour afficher les informations de notre point de vente agréé.
              </p>
            </div>

            {/* Interactive City Buttons representing location points */}
            <div className="flex justify-center space-x-2 border-b border-gray-800 pb-4">
              {DISTRIBUTION_POINTS.map((pt, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePointIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activePointIndex === idx
                      ? 'bg-primary-green/20 text-accent-gold border border-accent-gold/45'
                      : 'bg-primary-dark-lighter border border-gray-850 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {pt.city.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Active distribution details */}
            <div className="p-5 rounded-xl bg-primary-dark-light/50 border border-gray-850 space-y-3 min-h-[140px] flex flex-col justify-center">
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-accent-gold bg-accent-gold/10 px-2 py-0.5 rounded">
                  {DISTRIBUTION_POINTS[activePointIndex].type}
                </span>
                <h4 className="font-serif text-base font-bold text-white">
                  {DISTRIBUTION_POINTS[activePointIndex].city}
                </h4>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-400 font-light">
                <li className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-accent-gold-light mt-0.5 shrink-0" />
                  <span>{DISTRIBUTION_POINTS[activePointIndex].address}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-3.5 w-3.5 text-accent-gold-light shrink-0" />
                  <span>{DISTRIBUTION_POINTS[activePointIndex].phone}</span>
                </li>
              </ul>
            </div>
            
            {/* Visual Vector Representation of Senegal map */}
            <div className="relative h-28 bg-primary-dark-lighter border border-gray-850 rounded-xl overflow-hidden flex items-center justify-center">
              {/* Senegal outline placeholder (using styled CSS elements) */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:16px_16px]" />
              <div className="text-[10px] text-gray-500 border border-gray-800 px-3 py-1 bg-primary-dark rounded-full z-10 flex items-center space-x-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-green animate-ping" />
                <span>Production 100% Locale • Sénégal</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
