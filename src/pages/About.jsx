import React from 'react';
import { Target, Eye, ShieldCheck, Heart, UserCheck, TrendingUp, Sprout } from 'lucide-react';

import habyImg from '../assets/team-haby-diop.jpg';
import fatouImg from '../assets/team-fatou-sow-gueye.jpg';
import amaraImg from '../assets/team-amara-diabira.jpg';
import aissatouImg from '../assets/team-aissatou-coura-dieng.jpg';
import moussaImg from '../assets/team-moussa-diagana.jpg';
import awaImg from '../assets/team-awa-keita.jpg';
import seynabouImg from '../assets/team-seynabou-cisse.jpg';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">À Propos de HABAATEA</h1>
        <div className="h-1 w-12 bg-accent-gold mx-auto rounded-full" />
        <p className="max-w-lg mx-auto text-sm text-gray-400 font-light leading-relaxed">
          Découvrez notre histoire, notre vision, et notre engagement pour le bien-être naturel et l'économie locale.
        </p>
      </div>

      {/* Narrative Section (Histoire) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-accent-gold-light">Notre Histoire</h2>
          <p className="text-sm text-gray-300 leading-relaxed font-light">
            Le nom <strong>HABAATEA</strong> est né de la fusion harmonieuse entre « Habba » (faisant référence à la graine de nigelle ou <em>Habba Sawda</em>) et « Tea » (le thé), symbolisant la rencontre entre un héritage ancestral de guérison naturelle et la modernité des modes de consommation quotidienne.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed font-light">
            Fondée au Sénégal, notre entreprise est née d'un constat simple : la nigelle possède des vertus curatives exceptionnelles, reconnues depuis des millénaires par la médecine traditionnelle et validées par la science moderne. Cependant, son accès sous des formats pratiques, qualitatifs et agréables à consommer au quotidien restait limité.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed font-light">
            Nous avons donc relevé le défi de transformer et de valoriser cette graine miraculeuse en concevant une gamme innovante de sticks d'infusions instantanées, de capsules concentrées et de pastilles apaisantes, élaborés avec des ingrédients naturels soigneusement sélectionnés comme le gingembre, le citron et la menthe.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-dark-light to-primary-dark border border-gray-800 space-y-6">
          <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
            <span className="text-accent-gold text-lg">“</span>
            <span>Une inspiration traditionnelle et spirituelle</span>
          </h3>
          <p className="text-sm text-gray-400 italic leading-relaxed font-light">
            La nigelle occupe une place sacrée dans notre culture. Le Prophète Muhammad (Paix et Salut sur Lui) a dit :
          </p>
          <blockquote className="border-l-2 border-accent-gold pl-4 text-sm text-gray-200 italic font-medium">
            « Utilisez la graine de nigelle, car elle contient un remède contre toute maladie, sauf la mort. »
          </blockquote>
          <p className="text-xs text-gray-500">
            — Hadith authentique (Rapporté par Al-Bukhari et Muslim)
          </p>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            HABAATEA concrétise cet enseignement en proposant des produits sûrs, certifiés et faciles à intégrer dans la vie d'un étudiant, d'un actif pressé ou d'une famille soucieuse de son hygiène de vie.
          </p>
        </div>
      </section>

      {/* Vision, Mission, Valeurs Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mission */}
        <div className="p-8 rounded-2xl bg-primary-dark-light border border-gray-800 space-y-4 flex flex-col items-start hover:border-primary-green/30 transition-all duration-300">
          <div className="p-3 rounded-xl bg-primary-green/10 text-primary-green-glow">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white">Notre Mission</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Rendre les vertus exceptionnelles de la nigelle accessibles au plus grand nombre en proposant des produits sains, savoureux et innovants, facilitant le bien-être naturel au quotidien.
          </p>
        </div>

        {/* Vision */}
        <div className="p-8 rounded-2xl bg-primary-dark-light border border-gray-800 space-y-4 flex flex-col items-start hover:border-accent-gold/25 transition-all duration-300">
          <div className="p-3 rounded-xl bg-accent-gold/10 text-accent-gold-light">
            <Eye className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white">Notre Vision</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Devenir la marque de référence en Afrique de l'Ouest et à l'international pour les remèdes et compléments naturels de nigelle, en alliant le meilleur de la tradition et de la science alimentaire.
          </p>
        </div>

        {/* Valeurs */}
        <div className="p-8 rounded-2xl bg-primary-dark-light border border-gray-800 space-y-4 flex flex-col items-start hover:border-primary-green/30 transition-all duration-300">
          <div className="p-3 rounded-xl bg-primary-green/10 text-primary-green-glow">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white">Nos Valeurs</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Authenticité dans nos approvisionnements, excellence et pureté dans nos procédés de transformation, confiance absolue garantie à nos clients et engagement social pour nos producteurs.
          </p>
        </div>
      </section>

      {/* Social and Economic Impact Section */}
      <section className="p-8 md:p-12 rounded-2xl bg-gradient-to-b from-primary-dark-light to-primary-dark border border-gray-850 space-y-10">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Notre Impact Économique & Social</h2>
          <div className="h-1 w-12 bg-primary-green-glow mx-auto rounded-full" />
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            HABAATEA est plus qu'une marque commerciale : nous sommes un moteur de développement local engagé au cœur du Sénégal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sourcing Agricole Local */}
          <div className="space-y-3 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="p-2.5 rounded-full bg-primary-green/10 border border-primary-green/20 text-primary-green-glow">
              <Sprout className="h-5 w-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">Valorisation de l'Agriculture Sénégalaise</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              En collaborant directement avec des coopératives agricoles locales au Sénégal pour l'achat de la nigelle, de la menthe et du citron, nous garantissons des revenus équitables aux producteurs et limitons les intermédiaires.
            </p>
          </div>

          {/* Emploi Jeunes */}
          <div className="space-y-3 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="p-2.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold-light">
              <UserCheck className="h-5 w-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">Soutien à l'Entrepreneuriat Jeune</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Notre centre de transformation et notre logistique emploient de jeunes diplômés et techniciens sénégalais. HABAATEA est un incubateur de talents locaux en agroalimentaire et commerce digital.
            </p>
          </div>

          {/* Agro-industrie */}
          <div className="space-y-3 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="p-2.5 rounded-full bg-primary-green/10 border border-primary-green/20 text-primary-green-glow">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">Développement Agro-industriel</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Nous investissons dans des équipements de broyage, d'extraction d'huile à froid et de conditionnement modernes. Nous prouvons que le Sénégal peut exporter des produits finis à forte valeur ajoutée.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl font-bold text-white">Notre Équipe</h2>
          <div className="h-1 w-12 bg-accent-gold mx-auto rounded-full" />
          <p className="max-w-lg mx-auto text-sm text-gray-400 font-light">
            Découvrez les professionnels dévoués qui œuvrent chaque jour pour la qualité et le succès de HABAATEA au Sénégal.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: 'Haby Diop', role: 'Assistante Commerciale', initials: 'HD', image: habyImg },
            { name: 'Fatou Sow Gueye', role: 'Assistante RH', initials: 'FSG', image: fatouImg },
            { name: 'Amara Diabira', role: 'Assistant Logistique', initials: 'AD', image: amaraImg },
            { name: 'Aïssatou Coura Dieng', role: 'Assistante Finance', initials: 'ACD', image: aissatouImg },
            { name: 'Moussa Diagana', role: 'Assistant de Production', initials: 'MD', image: moussaImg },
            { name: 'Awa Keïta', role: 'Assistante Comptable', initials: 'AK', image: awaImg },
            { name: 'Seynabou Cissé', role: 'Assistante Qualité', initials: 'SC', image: seynabouImg }
          ].map((member, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-primary-dark-light border border-gray-800 hover:border-accent-gold/25 transition-all duration-300 flex flex-col items-center text-center space-y-4 group"
            >
              {/* Profile Image / Circle with Initials */}
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-accent-gold/30 group-hover:border-accent-gold transition-colors duration-300 bg-primary-dark-lighter flex items-center justify-center shrink-0">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-accent-gold font-bold text-base">{member.initials}</span>
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

    </div>
  );
}
