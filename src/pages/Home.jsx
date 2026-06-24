import React, { useEffect, useState } from 'react';
import { Leaf, Award, Heart, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import logo from '../assets/logo.png';

import habyImg from '../assets/team-haby-diop.jpg';
import fatouImg from '../assets/team-fatou-sow-gueye.jpg';
import amaraImg from '../assets/team-amara-diabira.jpg';
import aissatouImg from '../assets/team-aissatou-coura-dieng.jpg';
import moussaImg from '../assets/team-moussa-diagana.jpg';
import awaImg from '../assets/team-awa-keita.jpg';
import seynabouImg from '../assets/team-seynabou-cisse.jpg';

const STATS_DATA = [
  { value: 100, suffix: '%', label: 'Ingrédients Naturels' },
  { value: 10, suffix: 'k+', label: 'Clients Satisfaits' },
  { value: 3, suffix: ' formats', label: 'sticks, capsules, pastilles' },
  { value: 100, suffix: '%', label: 'Transformation au Sénégal' }
];

const REVIEWS = [
  {
    name: 'Aminata Diallo',
    role: 'Nutritionniste',
    text: 'Les sticks instantanés HABAATEA font désormais partie de ma routine matinale. Le mélange nigelle-gingembre est parfait pour stimuler l\'immunité, et le goût est excellent grâce à la menthe.',
    rating: 5
  },
  {
    name: 'Moustapha Diop',
    role: 'Sportif de haut niveau',
    text: 'L\'huile de nigelle en capsules m\'aide énormément pour la récupération musculaire et les inflammations après mes entraînements. Un produit premium de grande qualité locale !',
    rating: 5
  },
  {
    name: 'Fatou Binetou Ndiaye',
    role: 'Mère de famille',
    text: 'Les pastilles nigelle et menthe sont formidables pour adoucir la gorge. Mes enfants les adorent dès le premier signe de rhume. Je recommande vivement HABAATEA.',
    rating: 5
  }
];

export default function Home({ setActiveTab, products }) {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [counters, setCounters] = useState(STATS_DATA.map(() => 0));

  // Animating counters on component mount
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounters(prev => 
        prev.map((c, i) => {
          const target = STATS_DATA[i].value;
          const increment = target / steps;
          const currentVal = Math.floor(increment * step);
          return currentVal >= target ? target : currentVal;
        })
      );

      if (step >= steps) {
        setCounters(STATS_DATA.map(s => s.value));
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Immersive Hero Banner */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-black overflow-hidden px-4">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        >
          <source src="/nigelle.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>

        {/* Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-green/10 via-primary-dark/85 to-primary-dark z-0" />
        
        {/* Abstract animated background particles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-accent-gold blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary-green blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 px-4 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary-green/10 border border-primary-green/30 text-accent-gold-light text-xs font-semibold uppercase tracking-wider animate-bounce">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Nouveau au Sénégal</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            L'héritage de la nigelle,
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-accent-gold-light">
              l'innovation au service du bien-être.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed">
            HABAATEA valorise la graine de nigelle (Habba Sawda) à travers une gamme de produits pratiques, naturels et sains, adaptés aux modes de vie contemporains.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-4">
            <button
              onClick={() => setActiveTab('shop')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent-gold hover:bg-accent-gold-light text-primary-dark font-bold text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg hover:shadow-accent-gold/20"
            >
              Découvrir la boutique
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-gray-700 hover:border-accent-gold/50 bg-primary-dark-light/50 hover:bg-primary-dark-light text-white font-semibold text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer"
            >
              Notre histoire
            </button>
          </div>
        </div>
      </section>

      {/* 2. Prophetic Reference Quote */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-b from-primary-dark-light to-primary-dark border border-accent-gold/10 overflow-hidden">
          {/* Gold quote mark decoration */}
          <div className="absolute -top-10 -left-10 text-[180px] font-serif text-accent-gold/5 select-none pointer-events-none">
            “
          </div>
          
          <div className="relative z-10 text-center space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-accent-gold font-semibold">Héritage Prophétique</h3>
            
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-gray-100 italic leading-relaxed max-w-3xl mx-auto">
              « Utilisez la graine de nigelle, car elle contient un remède contre toute maladie, sauf la mort. »
            </blockquote>
            
            <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest font-medium">
              — Rapporté par Al-Bukhari et Muslim
            </div>
            
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-400 font-light leading-relaxed pt-2">
              Un savoir millénaire de la phytothérapie traditionnelle aujourd'hui validé par la science, sublimé par la vision d'innovation d'HABAATEA.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">Nos Créations Vedettes</h2>
            <div className="h-1 w-12 bg-accent-gold mx-auto rounded-full" />
            <p className="max-w-lg mx-auto text-sm text-gray-400 font-light">
              Explorez nos produits phares formulés à base de nigelle pure et d'extraits naturels aromatiques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <div 
                key={product.id}
                className="group relative flex flex-col rounded-2xl bg-primary-dark-light border border-gray-800 hover:border-accent-gold/20 transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-black border-b border-gray-800">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.popular && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent-gold text-primary-dark font-semibold text-[10px] uppercase tracking-wider">
                      Populaire
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold text-primary-green-glow uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-accent-gold-light transition-colors duration-150">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 font-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                    <span className="text-base font-bold text-accent-gold">
                      {product.price.toLocaleString('fr-FR')} F CFA
                    </span>
                    <button
                      onClick={() => setActiveTab('shop')}
                      className="px-4 py-2 rounded-full border border-primary-green hover:bg-primary-green text-white font-medium text-xs transition-all duration-150 cursor-pointer"
                    >
                      Voir le produit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Ingredients & Benefits Grid */}
      <section className="bg-primary-dark-light/50 border-y border-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">Nos Ingrédients Actifs</h2>
            <div className="h-1 w-12 bg-primary-green-glow mx-auto rounded-full" />
            <p className="max-w-lg mx-auto text-sm text-gray-400 font-light">
              Le secret d'HABAATEA réside dans l'harmonie entre la graine de nigelle et des composants naturels sélectionnés avec rigueur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'La Nigelle (Habba Sawda)',
                description: 'Reine des plantes médicinales, riche en thymoquinone. Elle renforce l\'immunité, possède des propriétés antioxydantes, digestives et énergisantes.',
                color: 'border-accent-gold'
              },
              {
                title: 'Le Gingembre Bio',
                description: 'Apporte une note chaleureuse et piquante. Reconnu pour ses effets toniques généraux, anti-inflammatoires et stimulants pour l\'organisme.',
                color: 'border-amber-600'
              },
              {
                title: 'Le Citron Naturel',
                description: 'Riche en vitamine C pour stimuler la vitalité. Sa fraîcheur acidulée équilibre l\'amertume de la nigelle pour une infusion équilibrée.',
                color: 'border-yellow-500'
              },
              {
                title: 'La Menthe Douce',
                description: 'Rafraîchit l\'haleine, apaise le système digestif et procure une note aromatique finale douce, relaxante et agréable en bouche.',
                color: 'border-primary-green'
              }
            ].map((ing, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-xl bg-primary-dark border-l-4 ${ing.color} space-y-4 shadow-md`}
              >
                <h3 className="font-serif font-bold text-white text-base">{ing.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{ing.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Statistics/Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-gradient-to-r from-primary-dark-light to-primary-dark border border-gray-800 p-8 rounded-2xl">
          {STATS_DATA.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-3xl sm:text-5xl font-bold font-serif text-accent-gold">
                {counters[idx]}
                <span className="text-sm font-sans font-medium text-accent-gold-light ml-0.5">{stat.suffix}</span>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Brand Commitments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">Nos Engagements</h2>
          <div className="h-1 w-12 bg-accent-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Leaf className="h-6 w-6 text-accent-gold" />,
              title: '100% Naturel et Sourcing Local',
              description: 'Pas d\'additifs chimiques, de conservateurs artificiels ou d\'arômes synthétiques. Nous privilégions les graines cultivées et récoltées par nos agriculteurs locaux au Sénégal.'
            },
            {
              icon: <Award className="h-6 w-6 text-accent-gold" />,
              title: 'Qualité Premium Garantie',
              description: 'Toutes nos graines de nigelle subissent des contrôles de pureté rigoureux. Notre huile est pressée à froid de manière à conserver l\'intégralité des principes actifs (thymoquinone).'
            },
            {
              icon: <Heart className="h-6 w-6 text-accent-gold" />,
              title: 'Impact Économique et Social',
              description: 'Nous structurons la chaîne de valeur locale en assurant la transformation au Sénégal. Nous favorisons le développement de l\'agro-industrie et de l\'emploi des jeunes.'
            }
          ].map((comm, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-2xl bg-primary-dark-light border border-gray-800 text-center space-y-4 flex flex-col items-center"
            >
              <div className="p-3 rounded-full bg-accent-gold/10 border border-accent-gold/20">
                {comm.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-white">{comm.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">{comm.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Client Reviews Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-semibold text-white">Ce qu'en disent nos clients</h2>
            <div className="h-1 w-12 bg-primary-green-glow mx-auto rounded-full" />
          </div>

          <div className="relative p-8 md:p-10 rounded-2xl bg-primary-dark-light border border-gray-800">
            <div className="flex flex-col items-center space-y-6">
              {/* Rating stars */}
              <div className="flex space-x-1">
                {[...Array(REVIEWS[activeReviewIndex].rating)].map((_, i) => (
                  <span key={i} className="text-accent-gold text-lg">★</span>
                ))}
              </div>
              
              <p className="text-sm md:text-base text-gray-300 italic leading-relaxed text-center font-light">
                "{REVIEWS[activeReviewIndex].text}"
              </p>

              <div>
                <h4 className="font-semibold text-white text-sm">{REVIEWS[activeReviewIndex].name}</h4>
                <p className="text-xs text-gray-500">{REVIEWS[activeReviewIndex].role}</p>
              </div>
            </div>

            {/* Slider arrows */}
            <div className="absolute inset-y-0 -left-4 sm:-left-6 flex items-center">
              <button 
                onClick={prevReview}
                className="p-2 rounded-full bg-primary-dark border border-gray-800 hover:border-accent-gold/30 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute inset-y-0 -right-4 sm:-right-6 flex items-center">
              <button 
                onClick={nextReview}
                className="p-2 rounded-full bg-primary-dark border border-gray-800 hover:border-accent-gold/30 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5 Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl font-semibold text-white">Notre Équipe HABAATEA</h2>
          <div className="h-1 w-12 bg-accent-gold mx-auto rounded-full" />
          <p className="max-w-lg mx-auto text-sm text-gray-400 font-light">
            Découvrez les professionnels passionnés qui garantissent la qualité et la saveur unique de nos produits au Sénégal.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: 'Haby Diop', role: 'Assistante Commerciale', image: habyImg },
            { name: 'Fatou Sow Gueye', role: 'Assistante RH', image: fatouImg },
            { name: 'Amara Diabira', role: 'Assistant Logistique', image: amaraImg },
            { name: 'Aïssatou Coura Dieng', role: 'Assistante Finance', image: aissatouImg },
            { name: 'Moussa Diagana', role: 'Assistant de Production', image: moussaImg },
            { name: 'Awa Keïta', role: 'Assistante Comptable', image: awaImg },
            { name: 'Seynabou Cissé', role: 'Assistante Qualité', image: seynabouImg }
          ].map((member, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-primary-dark-light border border-gray-800 hover:border-accent-gold/20 transition-all duration-300 flex flex-col items-center text-center space-y-4 group"
            >
              {/* Profile Image / Circle */}
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-accent-gold/30 group-hover:border-accent-gold transition-colors duration-300 bg-primary-dark-lighter flex items-center justify-center shrink-0">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-accent-gold font-bold text-base">H</span>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-white text-xs">{member.name}</h4>
                <p className="text-[10px] text-primary-green-glow font-medium uppercase tracking-wider">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Call To Action (Bottom) */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="p-12 rounded-2xl bg-gradient-to-r from-primary-green/20 via-primary-dark-light to-primary-green/10 border border-primary-green/30 space-y-6">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">Commencez Votre Voyage Bien-Être</h2>
          <p className="max-w-md mx-auto text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Rejoignez HABAATEA et découvrez la graine bénie sous un nouveau jour. Profitez d'une livraison rapide sur Dakar et toutes les régions du Sénégal.
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            className="px-8 py-3.5 rounded-full bg-accent-gold hover:bg-accent-gold-light text-primary-dark font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md hover:shadow-accent-gold/10"
          >
            Découvrir la Boutique
          </button>
        </div>
      </section>
    </div>
  );
}
