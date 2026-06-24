import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ChevronRight } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  toggleCart, 
  cartItems, 
  updateQuantity, 
  removeItem, 
  onCheckout 
}) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const formatPrice = (price) => {
    return price.toLocaleString('fr-FR') + ' F CFA';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-primary-dark border-l border-gray-800 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex h-20 items-center justify-between px-6 border-b border-gray-800 bg-primary-dark-light">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="h-5 w-5 text-accent-gold" />
                <h2 className="text-lg font-bold tracking-wide text-white">Mon Panier</h2>
                {cartItems.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-primary-green/30 text-primary-green-glow text-xs font-semibold">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)} articles
                  </span>
                )}
              </div>
              <button 
                onClick={toggleCart} 
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-primary-dark-lighter transition-all duration-150 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary-dark-lighter border border-gray-800 text-gray-500">
                    <ShoppingBag className="h-10 w-10" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-300">Votre panier est vide</p>
                    <p className="text-sm text-gray-500 max-w-xs">Découvrez notre gamme et commencez votre voyage bien-être avec HABAATEA.</p>
                  </div>
                  <button 
                    onClick={() => {
                      toggleCart();
                      onCheckout('shop'); // redirects to shop
                    }} 
                    className="px-6 py-2.5 rounded-full bg-primary-green hover:bg-primary-green-light text-white font-medium text-sm transition-all duration-200 cursor-pointer shadow-md"
                  >
                    Voir la boutique
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center space-x-4 p-3 rounded-xl bg-primary-dark-light border border-gray-800 hover:border-gray-700 transition-all duration-200"
                  >
                    {/* Image */}
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-20 w-20 rounded-lg object-cover border border-gray-700 bg-black shrink-0"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-white truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{item.unit}</p>
                      
                      <div className="flex items-center justify-between">
                        {/* Qty Controls */}
                        <div className="flex items-center border border-gray-700 rounded-full bg-primary-dark-lighter p-0.5">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full text-gray-400 hover:text-white transition-colors duration-150 cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full text-gray-400 hover:text-white transition-colors duration-150 cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-semibold text-accent-gold-light">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Delete Icon */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 cursor-pointer shrink-0"
                      aria-label="Supprimer l'article"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-800 bg-primary-dark-light space-y-4">
                <div className="flex items-center justify-between text-base">
                  <span className="font-medium text-gray-300">Sous-total</span>
                  <span className="font-bold text-accent-gold text-lg">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Frais de livraison calculés à l'étape suivante. Expédition rapide sur tout le Sénégal.
                </p>
                <button
                  onClick={() => {
                    toggleCart();
                    onCheckout('checkout');
                  }}
                  className="flex w-full items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-accent-gold hover:bg-accent-gold-light text-primary-dark font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-lg hover:shadow-accent-gold/10"
                >
                  <span>Passer la commande</span>
                  <ChevronRight className="h-4 w-4 stroke-[3px]" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
