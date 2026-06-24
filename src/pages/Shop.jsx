import React, { useState } from 'react';
import { Search, ShoppingCart, Info, Eye, X, Check } from 'lucide-react';

export default function Shop({ products, addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qtyToAdd, setQtyToAdd] = useState(1);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Categories list
  const categories = [
    { id: 'all', label: 'Tous les produits' },
    { id: 'sticks', label: 'Sticks' },
    { id: 'capsules', label: 'Capsules' },
    { id: 'pastilles', label: 'Pastilles' },
  ];

  // Filtering products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setQtyToAdd(1);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2500);
  };

  const handleModalAddToCart = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct, qtyToAdd);
    setSelectedProduct(null);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">La Boutique HABAATEA</h1>
        <p className="max-w-lg mx-auto text-sm text-gray-400 font-light">
          Notre gamme de produits naturels à base de nigelle (Habba Sawda) soigneusement sélectionnés pour votre vitalité.
        </p>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-primary-dark-light border border-gray-800 p-5 rounded-2xl">
        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-primary-green text-white shadow-md'
                  : 'bg-primary-dark-lighter border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search bar */}
        <div className="relative w-full md:max-w-xs shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-primary-dark-lighter border border-gray-800 focus:border-accent-gold/40 text-sm text-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-primary-dark-light border border-gray-850 rounded-2xl">
          <p className="text-gray-400 text-base">Aucun produit ne correspond à votre recherche.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} 
            className="mt-4 text-sm text-accent-gold underline cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="flex flex-col bg-primary-dark-light border border-gray-800 hover:border-accent-gold/25 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-black overflow-hidden border-b border-gray-800">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Image overlay controls */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <button 
                    onClick={() => handleOpenProduct(product)}
                    className="p-3 rounded-full bg-primary-dark text-white border border-gray-700 hover:border-accent-gold hover:text-accent-gold transition-all duration-200 cursor-pointer"
                    title="Aperçu rapide"
                  >
                    <Eye className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary-green-glow uppercase tracking-wider">
                      {product.category}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      product.stock > 10 
                        ? 'bg-primary-green/10 text-primary-green-glow' 
                        : product.stock > 0 
                        ? 'bg-orange-500/10 text-orange-400' 
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      {product.stock > 10 ? 'En stock' : product.stock > 0 ? `Plus que ${product.stock} restants` : 'Rupture'}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-accent-gold-light transition-colors duration-150">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-800">
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-bold text-accent-gold">
                      {product.price.toLocaleString('fr-FR')} F CFA
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {product.unit}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenProduct(product)}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-gray-700 hover:border-accent-gold/40 text-gray-300 hover:text-white font-medium text-xs tracking-wide transition-all duration-150 cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <Info className="h-3.5 w-3.5" />
                      <span>Détails</span>
                    </button>
                    
                    <button
                      disabled={product.stock <= 0}
                      onClick={() => handleAddToCart(product, 1)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-accent-gold hover:bg-accent-gold-light text-primary-dark font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="h-3.5 w-3.5 stroke-[2.5]" />
                      <span>Ajouter</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-primary-dark border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-gray-400 hover:text-white hover:bg-black/60 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Column: Image */}
            <div className="w-full md:w-1/2 bg-black border-r border-gray-800 flex items-center justify-center min-h-[300px] md:min-h-0">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover max-h-[400px] md:max-h-full"
              />
            </div>

            {/* Right Column: Content details */}
            <div className="w-full md:w-1/2 p-8 overflow-y-auto flex flex-col justify-between space-y-6">
              
              {/* Product description info */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-primary-green-glow uppercase tracking-widest bg-primary-green/10 px-2 py-0.5 rounded-full">
                  {selectedProduct.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center justify-between py-1 border-y border-gray-800">
                  <span className="text-xl font-bold text-accent-gold">
                    {selectedProduct.price.toLocaleString('fr-FR')} F CFA
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {selectedProduct.unit}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Composition ingredients */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-accent-gold uppercase tracking-wider">Composition</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.composition.map((item, idx) => (
                    <span key={idx} className="text-[10px] bg-primary-dark-lighter border border-gray-800 text-gray-300 px-2.5 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits list */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-primary-green-glow uppercase tracking-wider">Bienfaits clés</h4>
                <ul className="space-y-1.5 text-[11px] text-gray-400 font-light">
                  {selectedProduct.benefits.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-primary-green-glow mt-0.5 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Usage Guide */}
              {selectedProduct.usage && (
                <div className="p-3.5 rounded-lg bg-primary-dark-light/50 border border-gray-850 space-y-1">
                  <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Conseils d'utilisation</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-light">{selectedProduct.usage}</p>
                </div>
              )}

              {/* Add to Cart Actions */}
              <div className="pt-4 border-t border-gray-850 flex items-center justify-between gap-4">
                {/* Quantity adjustment */}
                <div className="flex items-center border border-gray-800 rounded-full bg-primary-dark-light p-1">
                  <button 
                    disabled={qtyToAdd <= 1}
                    onClick={() => setQtyToAdd(prev => prev - 1)}
                    className="p-1 rounded-full text-gray-400 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold text-white">{qtyToAdd}</span>
                  <button 
                    onClick={() => setQtyToAdd(prev => prev + 1)}
                    className="p-1 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleModalAddToCart}
                  disabled={selectedProduct.stock <= 0}
                  className="flex-1 py-3 px-6 rounded-xl bg-accent-gold hover:bg-accent-gold-light text-primary-dark font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
                >
                  <ShoppingCart className="h-4 w-4 stroke-[2.5]" />
                  <span>Ajouter au panier</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-lg bg-primary-green border border-primary-green-glow text-white shadow-xl animate-bounce">
          <Check className="h-4.5 w-4.5 stroke-[3px]" />
          <span className="text-xs font-semibold">Produit ajouté au panier avec succès !</span>
        </div>
      )}

    </div>
  );
}
