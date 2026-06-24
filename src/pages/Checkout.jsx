import React, { useState } from 'react';
import { CreditCard, Truck, CheckCircle2, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react';

const SHIPPING_OPTIONS = [
  { id: 'dakar-express', name: 'Livraison Express (Dakar)', price: 2000, time: '24 heures' },
  { id: 'senegal-standard', name: 'Livraison Régions (Sénégal)', price: 3500, time: '2 à 3 jours' },
  { id: 'pickup-sede', name: 'Retrait au Siège (Dakar)', price: 0, time: 'Gratuit - Prêt sous 2h' },
];

export default function Checkout({ cartItems, clearCart, onNavigate, onOrderPlaced }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dakar',
  });
  const [selectedShipping, setSelectedShipping] = useState('dakar-express');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingCost = SHIPPING_OPTIONS.find(o => o.id === selectedShipping)?.price || 0;
  const total = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsProcessing(true);
    // Simulating API validation and database addition
    setTimeout(() => {
      const orderId = 'HT-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('fr-FR'),
        client: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        address: formData.address,
        items: cartItems.map(i => `${i.name} (x${i.quantity})`).join(', '),
        total: total,
        status: 'En attente',
      };
      
      // Save order to the app shell simulated database
      onOrderPlaced(newOrder);

      setConfirmedOrderId(orderId);
      setIsProcessing(false);
      setOrderConfirmed(true);
      clearCart();
    }, 2000);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('fr-FR') + ' F CFA';
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="p-4 bg-primary-green/10 border border-primary-green-glow/30 rounded-full inline-flex text-primary-green-glow">
          <CheckCircle2 className="h-16 w-16 animate-pulse" />
        </div>
        <div className="space-y-3">
          <h1 className="font-serif text-3xl font-bold text-white">Commande Confirmée !</h1>
          <p className="text-sm text-gray-400 font-light max-w-sm mx-auto">
            Merci pour votre commande. Votre transaction a été validée avec succès.
          </p>
        </div>

        {/* Invoice Summary */}
        <div className="p-6 rounded-2xl bg-primary-dark-light border border-gray-800 text-left space-y-4">
          <h3 className="font-semibold text-white text-sm pb-2 border-b border-gray-800 flex justify-between">
            <span>Récapitulatif de Commande</span>
            <span className="text-accent-gold">{confirmedOrderId}</span>
          </h3>
          <ul className="space-y-2 text-xs text-gray-400 font-light">
            <li className="flex justify-between">
              <span>Client :</span>
              <span className="text-white font-medium">{formData.firstName} {formData.lastName}</span>
            </li>
            <li className="flex justify-between">
              <span>Téléphone :</span>
              <span className="text-white font-medium">{formData.phone}</span>
            </li>
            <li className="flex justify-between">
              <span>Destination :</span>
              <span className="text-white font-medium">{formData.city}, Sénégal</span>
            </li>
            <li className="flex justify-between pt-2 border-t border-gray-850">
              <span className="font-semibold text-gray-300">Montant Total Payé :</span>
              <span className="font-bold text-accent-gold text-sm">{formatPrice(total)}</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-3 rounded-full bg-accent-gold hover:bg-accent-gold-light text-primary-dark font-bold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-md"
          >
            Retourner à la boutique
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className="px-6 py-3 rounded-full border border-gray-700 hover:border-gray-600 bg-primary-dark-light/50 text-white font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer"
          >
            Suivre dans l'espace Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back button */}
      <button 
        onClick={() => onNavigate('shop')} 
        className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-accent-gold transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Retour à la Boutique</span>
      </button>

      <div className="text-center space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">Finaliser ma commande</h1>
        <p className="max-w-lg mx-auto text-sm text-gray-400 font-light">
          Veuillez remplir vos informations de livraison pour recevoir vos produits HABAATEA.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-primary-dark-light border border-gray-800 rounded-2xl space-y-4">
          <ShoppingBag className="h-10 w-10 text-gray-600 mx-auto" />
          <p className="text-gray-400 text-sm">Votre panier est vide. Vous ne pouvez pas passer de commande.</p>
          <button 
            onClick={() => onNavigate('shop')} 
            className="px-6 py-2.5 rounded-full bg-primary-green hover:bg-primary-green-light text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Aller à la Boutique
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Billing Info Inputs */}
          <div className="lg:col-span-2 p-8 rounded-2xl bg-primary-dark-light border border-gray-800 space-y-6">
            <h2 className="font-serif text-xl font-bold text-white pb-3 border-b border-gray-800">
              1. Informations de Livraison
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Ex: Babacar"
                  className="w-full px-4 py-2.5 rounded-xl bg-primary-dark-lighter border border-gray-800 focus:border-accent-gold/40 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Ex: Ndiaye"
                  className="w-full px-4 py-2.5 rounded-xl bg-primary-dark-lighter border border-gray-800 focus:border-accent-gold/40 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium">Téléphone (SMS & Appel de livraison)</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Ex: +221 77 123 45 67"
                  className="w-full px-4 py-2.5 rounded-xl bg-primary-dark-lighter border border-gray-800 focus:border-accent-gold/40 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium">Adresse Email (Facultatif)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ex: babacar@email.sn"
                  className="w-full px-4 py-2.5 rounded-xl bg-primary-dark-lighter border border-gray-800 focus:border-accent-gold/40 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs text-gray-400 font-medium">Adresse complète (Rue, Quartier, Appartement)</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Ex: Villa 124, Liberté 6"
                  className="w-full px-4 py-2.5 rounded-xl bg-primary-dark-lighter border border-gray-800 focus:border-accent-gold/40 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium">Ville / Région</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-primary-dark-lighter border border-gray-800 focus:border-accent-gold/40 text-sm text-white focus:outline-none transition-colors"
                >
                  <option value="Dakar">Dakar</option>
                  <option value="Thiès">Thiès</option>
                  <option value="Saint-Louis">Saint-Louis</option>
                  <option value="Mbour">Mbour</option>
                  <option value="Ziguinchor">Ziguinchor</option>
                  <option value="Kaolack">Kaolack</option>
                  <option value="Autre">Autre Région / International</option>
                </select>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <h3 className="font-serif text-base font-bold text-white flex items-center space-x-2">
                <Truck className="h-4.5 w-4.5 text-accent-gold" />
                <span>2. Mode d'expédition</span>
              </h3>
              
              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((opt) => (
                  <label 
                    key={opt.id} 
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedShipping === opt.id
                        ? 'bg-primary-green/10 border-primary-green text-white'
                        : 'bg-primary-dark-lighter border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="shipping" 
                        value={opt.id}
                        checked={selectedShipping === opt.id}
                        onChange={() => setSelectedShipping(opt.id)}
                        className="accent-primary-green"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">{opt.name}</p>
                        <p className="text-[11px] text-gray-500">Délai estimé : {opt.time}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-accent-gold-light">
                      {opt.price === 0 ? 'Gratuit' : `+ ${formatPrice(opt.price)}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Checkout Invoice summary column */}
          <div className="p-6 rounded-2xl bg-primary-dark-light border border-gray-800 space-y-6">
            <h2 className="font-serif text-lg font-bold text-white pb-3 border-b border-gray-800">
              Récapitulatif
            </h2>

            {/* Items List */}
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 truncate max-w-[160px]">{item.name} <strong className="text-white font-medium">x{item.quantity}</strong></span>
                  <span className="text-gray-300 font-semibold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-4 border-t border-gray-800 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Livraison</span>
                <span>{shippingCost === 0 ? 'Gratuit' : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-gray-850">
                <span>Total à Payer</span>
                <span className="text-accent-gold">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Simulated Payment Notice */}
            <div className="p-3.5 rounded-lg bg-primary-dark-lighter border border-gray-850 space-y-2 text-[10px] text-gray-500 leading-normal">
              <div className="flex items-center space-x-1.5 text-accent-gold-light font-semibold">
                <CreditCard className="h-3.5 w-3.5" />
                <span>Paiement à la livraison / Wave</span>
              </div>
              <p>
                Réglez en espèces à la livraison auprès du livreur ou par transfert Wave / Orange Money. Aucun frais caché.
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-accent-gold hover:bg-accent-gold-light text-primary-dark font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Traitement...</span>
              ) : (
                <>
                  <span>Confirmer ma commande</span>
                  <ChevronRight className="h-4 w-4 stroke-[3.5]" />
                </>
              )}
            </button>

          </div>

        </form>
      )}

    </div>
  );
}
