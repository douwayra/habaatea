import sticksMentheImg from '../assets/sticks-nigelle-menthe-v2.jpg';
import sticksNatureImg from '../assets/sticks-nigelle-nature-v2.jpg';
import sticksGingembreCitronImg from '../assets/sticks-nigelle-gingembre-citron-v2.jpg';
import capsulesGingembreCitronImg from '../assets/capsules-nigelle-gingembre-citron-v2.jpg';
import capsulesMentheImg from '../assets/capsules-nigelle-menthe-v2.jpg';
import pastillesMentheImg from '../assets/pastilles-nigelle-menthe-v2.jpg';
import pastillesGingembreCitronImg from '../assets/pastilles-nigelle-gingembre-citron-v2.jpg';

export const INITIAL_PRODUCTS = [
  {
    id: 'sticks-nigelle-menthe',
    name: 'Boîte de Sticks (Nigelle-Menthe)',
    category: 'sticks',
    price: 3500,
    unit: 'Boîte de 20 sticks',
    description: 'Il s’agit d’une boîte de thé (stick perforé), à base de la graine de nigelle et des feuilles de menthe de la marque HABAATEA. Pratique et sain pour fortifier votre organisme au quotidien.',
    composition: [
      'Graine de nigelle (Habba Sawda)',
      'Feuilles de menthe douce séchées'
    ],
    benefits: [
      'Renforce le système immunitaire',
      'Favorise une excellente digestion',
      'Haleine fraîche et agréable en bouche'
    ],
    usage: 'Plonger le stick perforé dans une tasse d’eau chaude, remuer doucement et laisser infuser 3 à 5 minutes.',
    stock: 35,
    popular: true,
    image: sticksMentheImg
  },
  {
    id: 'sticks-nigelle-nature',
    name: 'Boîte de Sticks (Nigelle Nature)',
    category: 'sticks',
    price: 3500,
    unit: 'Boîte de 20 sticks',
    description: 'Une boîte de thé (stick perforé), contenant de la graine de nigelle pure de la marque HABAATEA. Sans additifs, idéal pour retrouver la puissance brute de la Habba Sawda.',
    composition: [
      '100% Graine de nigelle pure (Habba Sawda)'
    ],
    benefits: [
      'Renforce les défenses naturelles de l’organisme',
      'Excellente source d’antioxydants',
      'Aide à combattre la fatigue physique et intellectuelle'
    ],
    usage: 'Plonger le stick perforé dans une tasse d’eau chaude ou de thé chaud, laisser infuser 3 à 5 minutes.',
    stock: 40,
    popular: false,
    image: sticksNatureImg
  },
  {
    id: 'sticks-nigelle-gingembre-citron',
    name: 'Boîte de Sticks (Nigelle-Gingembre-Citron)',
    category: 'sticks',
    price: 3500,
    unit: 'Boîte de 20 sticks',
    description: 'Il s’agit d’une boîte de thé (stick perforé), à base de la graine de nigelle, du gingembre ainsi que du citron de la marque HABAATEA. Un allié puissant pour purifier et redynamiser l’organisme.',
    composition: [
      'Graine de nigelle (Habba Sawda)',
      'Gingembre séché moulu',
      'Extrait naturel de citron'
    ],
    benefits: [
      'Effet tonifiant et énergisant immédiat',
      'Aide à détoxifier le foie et l’estomac',
      'Puissant antiviral et anti-inflammatoire'
    ],
    usage: 'Plonger le stick perforé dans une tasse d’eau chaude, laisser infuser puis déguster chaud.',
    stock: 50,
    popular: true,
    image: sticksGingembreCitronImg
  },
  {
    id: 'capsules-nigelle-gingembre-citron',
    name: 'Capsules (Nigelle-Gingembre-Citron)',
    category: 'capsules',
    price: 2500,
    unit: 'Boîte de 10 capsules',
    description: 'Une infusion unique alliant la puissance de la nigelle à la fraîcheur du citron et au caractère du gingembre. Conditionné sous format de capsules modernes, compatibles avec les machines à café courantes.',
    composition: [
      'Graine de nigelle moulue',
      'Gingembre moulu',
      'Zeste de citron déshydraté'
    ],
    benefits: [
      'Extraction optimale des principes actifs sous pression',
      'Facilite la digestion après le repas',
      'Riche en vitamine C et minéraux essentiels'
    ],
    usage: 'Insérer la capsule dans votre machine compatible et faire couler de l’eau chaude (format long recommandé).',
    stock: 25,
    popular: true,
    image: capsulesGingembreCitronImg
  },
  {
    id: 'capsules-nigelle-menthe',
    name: 'Capsules (Nigelle-Menthe)',
    category: 'capsules',
    price: 2500,
    unit: 'Boîte de 10 capsules',
    description: 'Une infusion unique alliant la puissance de la graine de nigelle et les feuilles de menthe. Un format capsule rapide pour une boisson apaisante et bienfaisante.',
    composition: [
      'Graine de nigelle (Habba Sawda)',
      'Feuilles de menthe broyées'
    ],
    benefits: [
      'Soulage les maux de gorge et encombrements',
      'Procure une détente digestive rapide',
      'Format pratique pour le bureau ou la maison'
    ],
    usage: 'Insérer la capsule dans votre machine et faire couler de l’eau chaude (format long).',
    stock: 30,
    popular: false,
    image: capsulesMentheImg
  },
  {
    id: 'pastilles-nigelle-menthe',
    name: 'Pastilles (Nigelle-Menthe)',
    category: 'pastilles',
    price: 1000,
    unit: 'Boîte métallique de pastilles',
    description: 'Pastilles aromatisées formulées à base de graines de nigelle et de feuilles de menthe. Pratiques à sucer pour calmer les irritations bucco-dentaires ou rafraîchir l’haleine.',
    composition: [
      'Graines de nigelle (Habba Sawda) moulues',
      'Huile essentielle de menthe poivrée',
      'Miel naturel'
    ],
    benefits: [
      'Adoucit la gorge en cas d’irritation',
      'Action purifiante pour la bouche',
      'Facile à transporter dans sa boîte métallique de poche'
    ],
    usage: 'Sucer une pastille dès que le besoin s’en fait sentir. Ne pas croquer.',
    stock: 18,
    popular: true,
    image: pastillesMentheImg
  },
  {
    id: 'pastilles-nigelle-gingembre-citron',
    name: 'Pastilles (Nigelle-Gingembre-Citron)',
    category: 'pastilles',
    price: 1000,
    unit: 'Boîte métallique de pastilles',
    description: 'Pastilles aromatisées formulées à base de graines de nigelle, de gingembre et de citron. Alliez plaisir et santé naturelle grâce à ce format pastille nomade.',
    composition: [
      'Graine de nigelle (Habba Sawda)',
      'Extrait de gingembre',
      'Huile essentielle de citron bio'
    ],
    benefits: [
      'Soulage le mal des transports ou nausées légères',
      'Booste la vitalité de la gorge',
      'Goût frais, épicé et fruité'
    ],
    usage: 'Sucer lentement une pastille à tout moment de la journée.',
    stock: 12,
    popular: false,
    image: pastillesGingembreCitronImg
  }
];
