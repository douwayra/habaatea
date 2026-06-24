import React, { useState } from 'react';
import { 
  TrendingUp, ShoppingBag, Users, DollarSign, Plus, Edit, Trash2, CheckCircle, Package, Truck, Search, X 
} from 'lucide-react';

export default function AdminDashboard({ 
  products, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct,
  orders,
  onUpdateOrderStatus 
}) {
  const [activeSubTab, setActiveSubTab] = useState('stats');
  
  // Search & Filter States
  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [productSearchTerm, setProductSearchTerm] = useState('');

  // Product CRUD Modal States
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null if adding
  const [productFormData, setProductFormData] = useState({
    name: '',
    category: 'sticks',
    price: 3000,
    unit: '',
    description: '',
    composition: '',
    benefits: '',
    stock: 20,
  });

  // 1. Calculate dashboard metrics based on simulated state
  const totalSales = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;
  const averageBasket = totalOrdersCount > 0 ? Math.round(totalSales / totalOrdersCount) : 0;
  
  // Group orders by status
  const ordersPending = orders.filter(o => o.status === 'En attente').length;
  const ordersShipped = orders.filter(o => o.status === 'Expédiée').length;
  const ordersDelivered = orders.filter(o => o.status === 'Livrée').length;

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.client.toLowerCase().includes(orderSearchTerm.toLowerCase()) || 
                          o.id.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
                          o.phone.includes(orderSearchTerm);
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered products
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return price.toLocaleString('fr-FR') + ' F CFA';
  };

  // Product modal trigger: Add
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      category: 'sticks',
      price: 3000,
      unit: 'Boîte de 20 sticks',
      description: '',
      composition: 'Graine de nigelle, Gingembre, Menthe',
      benefits: 'Stimule l\'immunité, Aide à la digestion',
      stock: 20,
    });
    setShowProductModal(true);
  };

  // Product modal trigger: Edit
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      unit: product.unit || '',
      description: product.description,
      composition: product.composition.join(', '),
      benefits: product.benefits.join(', '),
      stock: product.stock,
    });
    setShowProductModal(true);
  };

  // Product modal form submit
  const handleProductSubmit = (e) => {
    e.preventDefault();

    const formattedProduct = {
      name: productFormData.name,
      category: productFormData.category,
      price: Number(productFormData.price),
      unit: productFormData.unit,
      description: productFormData.description,
      composition: productFormData.composition.split(',').map(s => s.trim()).filter(Boolean),
      benefits: productFormData.benefits.split(',').map(s => s.trim()).filter(Boolean),
      stock: Number(productFormData.stock),
      image: editingProduct ? editingProduct.image : products[0]?.image // default image placeholder from seed
    };

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, formattedProduct);
    } else {
      const newId = 'product-' + Date.now();
      onAddProduct({ ...formattedProduct, id: newId });
    }

    setShowProductModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white flex items-center space-x-2">
            <span>Administration HABAATEA</span>
          </h1>
          <p className="text-xs text-gray-400 font-light mt-1">
            Gérez vos stocks de nigelle, modifiez vos produits et contrôlez les livraisons en cours.
          </p>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex bg-primary-dark-light border border-gray-850 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveSubTab('stats')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeSubTab === 'stats' ? 'bg-accent-gold text-primary-dark' : 'text-gray-400 hover:text-white'
            }`}
          >
            Indicateurs
          </button>
          <button
            onClick={() => setActiveSubTab('products')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeSubTab === 'products' ? 'bg-accent-gold text-primary-dark' : 'text-gray-400 hover:text-white'
            }`}
          >
            Produits
          </button>
          <button
            onClick={() => setActiveSubTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeSubTab === 'orders' ? 'bg-accent-gold text-primary-dark' : 'text-gray-400 hover:text-white'
            }`}
          >
            Commandes ({ordersPending})
          </button>
        </div>
      </div>

      {/* SUBTAB 1: STATISTICS / METRICS */}
      {activeSubTab === 'stats' && (
        <div className="space-y-10">
          {/* Stats Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-primary-dark-light border border-gray-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-gray-500 font-medium">Chiffre d'Affaires</span>
                <p className="text-xl sm:text-2xl font-bold text-white">{formatPrice(totalSales)}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-primary-green/10 text-primary-green-glow">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary-dark-light border border-gray-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-gray-500 font-medium">Commandes Totales</span>
                <p className="text-xl sm:text-2xl font-bold text-white">{totalOrdersCount} commandes</p>
              </div>
              <div className="p-3.5 rounded-xl bg-accent-gold/10 text-accent-gold-light">
                <ShoppingBag className="h-6 w-6" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary-dark-light border border-gray-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-gray-500 font-medium">Panier Moyen</span>
                <p className="text-xl sm:text-2xl font-bold text-white">{formatPrice(averageBasket)}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-primary-green/10 text-primary-green-glow">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary-dark-light border border-gray-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-gray-500 font-medium">Commandes en attente</span>
                <p className="text-xl sm:text-2xl font-bold text-white">{ordersPending} en attente</p>
              </div>
              <div className="p-3.5 rounded-xl bg-orange-500/10 text-orange-400">
                <Truck className="h-6 w-6 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Quick Distribution Summary charts block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sales performance graph mock */}
            <div className="p-6 rounded-2xl bg-primary-dark-light border border-gray-800 space-y-4">
              <h3 className="font-serif text-base font-bold text-white">Performances de Livraison</h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 flex items-center space-x-1.5"><span className="h-2 w-2 rounded-full bg-orange-400" /> <span>En attente de traitement</span></span>
                    <span className="text-white font-bold">{ordersPending} commandes</span>
                  </div>
                  <div className="h-2 w-full bg-primary-dark-lighter rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: `${totalOrdersCount > 0 ? (ordersPending / totalOrdersCount) * 100 : 0}%` }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 flex items-center space-x-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> <span>Expédiées</span></span>
                    <span className="text-white font-bold">{ordersShipped} commandes</span>
                  </div>
                  <div className="h-2 w-full bg-primary-dark-lighter rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${totalOrdersCount > 0 ? (ordersShipped / totalOrdersCount) * 100 : 0}%` }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 flex items-center space-x-1.5"><span className="h-2 w-2 rounded-full bg-primary-green-glow" /> <span>Livrées avec succès</span></span>
                    <span className="text-white font-bold">{ordersDelivered} commandes</span>
                  </div>
                  <div className="h-2 w-full bg-primary-dark-lighter rounded-full overflow-hidden">
                    <div className="h-full bg-primary-green-glow" style={{ width: `${totalOrdersCount > 0 ? (ordersDelivered / totalOrdersCount) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Popular items mock list */}
            <div className="p-6 rounded-2xl bg-primary-dark-light border border-gray-800 space-y-4">
              <h3 className="font-serif text-base font-bold text-white">Popularité des Formats</h3>
              <div className="space-y-3">
                {products.map(p => (
                  <div key={p.id} className="flex items-center justify-between text-xs border-b border-gray-850 pb-2">
                    <div className="flex items-center space-x-2">
                      <img src={p.image} alt={p.name} className="h-8 w-8 rounded object-cover border border-gray-800" />
                      <span className="text-gray-300 font-medium">{p.name}</span>
                    </div>
                    <span className="text-accent-gold-light font-bold">Stock: {p.stock}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: PRODUCTS CATALOG MANAGER */}
      {activeSubTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-primary-dark-light border border-gray-850 p-4 rounded-xl">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher par nom..."
                value={productSearchTerm}
                onChange={(e) => setProductSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-primary-dark-lighter border border-gray-800 text-xs text-white focus:outline-none focus:border-accent-gold/45"
              />
            </div>
            
            <button
              onClick={handleOpenAddModal}
              className="w-full sm:w-auto py-2 px-4 rounded-lg bg-accent-gold hover:bg-accent-gold-light text-primary-dark font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Nouveau produit</span>
            </button>
          </div>

          {/* Products List Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-primary-dark-light border-b border-gray-800 text-gray-400 font-medium">
                  <th className="p-4">Visuel</th>
                  <th className="p-4">Désignation</th>
                  <th className="p-4">Catégorie</th>
                  <th className="p-4">Prix unitaire</th>
                  <th className="p-4">Quantité en stock</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850 bg-primary-dark-light/40">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-primary-dark-light/80 transition-colors">
                    <td className="p-4 shrink-0">
                      <img src={p.image} alt={p.name} className="h-10 w-10 rounded object-cover border border-gray-800 bg-black" />
                    </td>
                    <td className="p-4 font-semibold text-white">
                      <div>{p.name}</div>
                      <div className="text-[10px] text-gray-500 font-normal">{p.unit}</div>
                    </td>
                    <td className="p-4 text-gray-400 capitalize">{p.category}</td>
                    <td className="p-4 text-accent-gold font-bold">{formatPrice(p.price)}</td>
                    <td className="p-4">
                      {/* Interactive inline stock indicator */}
                      <span className={`px-2 py-0.5 rounded font-semibold ${
                        p.stock > 10 ? 'bg-primary-green/20 text-primary-green-glow' : p.stock > 0 ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {p.stock} unités
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 rounded bg-primary-dark-lighter hover:bg-accent-gold/20 text-gray-400 hover:text-accent-gold transition-colors cursor-pointer"
                          title="Modifier"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-2 rounded bg-primary-dark-lighter hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: ORDERS PROCESSOR */}
      {activeSubTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-primary-dark-light border border-gray-850 p-4 rounded-xl">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher par client ou ID..."
                value={orderSearchTerm}
                onChange={(e) => setOrderSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-primary-dark-lighter border border-gray-800 text-xs text-white focus:outline-none focus:border-accent-gold/45"
              />
            </div>

            <div className="flex bg-primary-dark-lighter p-1 rounded-lg border border-gray-850">
              {['all', 'En attente', 'Expédiée', 'Livrée'].map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderStatusFilter(status)}
                  className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    orderStatusFilter === status ? 'bg-primary-green/20 text-accent-gold' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {status === 'all' ? 'Toutes' : status}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Data list */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-primary-dark-light border border-gray-800 rounded-xl">
              <p className="text-gray-400 text-xs">Aucune commande trouvée.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-primary-dark-light border-b border-gray-800 text-gray-400 font-medium">
                    <th className="p-4">Date & ID</th>
                    <th className="p-4">Client / Contact</th>
                    <th className="p-4">Articles commandés</th>
                    <th className="p-4">Lieu de Livraison</th>
                    <th className="p-4">Prix Facturé</th>
                    <th className="p-4 text-center">Statut de Livraison</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850 bg-primary-dark-light/40">
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-primary-dark-light/80 transition-colors">
                      <td className="p-4 font-semibold text-white">
                        <div>{o.id}</div>
                        <div className="text-[10px] text-gray-500 font-normal">{o.date}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-gray-200">{o.client}</div>
                        <div className="text-[10px] text-gray-500">{o.phone}</div>
                      </td>
                      <td className="p-4 text-gray-300 max-w-[200px] truncate">{o.items}</td>
                      <td className="p-4 text-gray-300">{o.address}, <strong className="text-white font-medium">{o.city}</strong></td>
                      <td className="p-4 text-accent-gold font-bold">{formatPrice(o.total)}</td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center space-y-1">
                          <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                            o.status === 'En attente' ? 'bg-orange-500/20 text-orange-400' : o.status === 'Expédiée' ? 'bg-blue-500/20 text-blue-400' : 'bg-primary-green/20 text-primary-green-glow'
                          }`}>
                            {o.status}
                          </span>
                          
                          {/* Toggle control to move status forward */}
                          {o.status !== 'Livrée' && (
                            <button
                              onClick={() => {
                                const nextStat = o.status === 'En attente' ? 'Expédiée' : 'Livrée';
                                onUpdateOrderStatus(o.id, nextStat);
                              }}
                              className="text-[9px] text-accent-gold hover:underline cursor-pointer"
                            >
                              Passer à {o.status === 'En attente' ? 'Expédiée' : 'Livrée'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* CRUD Product Modal Dialog */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-primary-dark border border-gray-800 rounded-2xl overflow-hidden shadow-2xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="font-serif text-xl font-bold text-white">
                {editingProduct ? 'Modifier le Produit' : 'Ajouter un Produit'}
              </h2>
              <button 
                onClick={() => setShowProductModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-400 font-medium">Nom du Produit</label>
                  <input
                    type="text"
                    required
                    value={productFormData.name}
                    onChange={(e) => setProductFormData({...productFormData, name: e.target.value})}
                    placeholder="Ex: Sticks premium nigelle"
                    className="w-full px-3 py-2 rounded-lg bg-primary-dark-lighter border border-gray-800 text-white focus:outline-none focus:border-accent-gold/45"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400 font-medium">Catégorie</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) => setProductFormData({...productFormData, category: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-primary-dark-lighter border border-gray-800 text-white focus:outline-none focus:border-accent-gold/45"
                  >
                    <option value="sticks">Sticks</option>
                    <option value="capsules">Capsules</option>
                    <option value="pastilles">Pastilles</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-400 font-medium">Prix (F CFA)</label>
                  <input
                    type="number"
                    required
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({...productFormData, price: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-primary-dark-lighter border border-gray-800 text-white focus:outline-none focus:border-accent-gold/45"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400 font-medium">Format / Unité</label>
                  <input
                    type="text"
                    required
                    value={productFormData.unit}
                    onChange={(e) => setProductFormData({...productFormData, unit: e.target.value})}
                    placeholder="Ex: Boîte de 20 sticks"
                    className="w-full px-3 py-2 rounded-lg bg-primary-dark-lighter border border-gray-800 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400 font-medium">Stock Initial</label>
                  <input
                    type="number"
                    required
                    value={productFormData.stock}
                    onChange={(e) => setProductFormData({...productFormData, stock: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-primary-dark-lighter border border-gray-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 font-medium">Description</label>
                <textarea
                  rows="3"
                  required
                  value={productFormData.description}
                  onChange={(e) => setProductFormData({...productFormData, description: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-primary-dark-lighter border border-gray-800 text-white focus:outline-none focus:border-accent-gold/45 resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-400 font-medium">Composition (séparer par des virgules)</label>
                  <input
                    type="text"
                    value={productFormData.composition}
                    onChange={(e) => setProductFormData({...productFormData, composition: e.target.value})}
                    placeholder="Nigelle, Gingembre, Citron"
                    className="w-full px-3 py-2 rounded-lg bg-primary-dark-lighter border border-gray-800 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400 font-medium">Bienfaits clés (séparer par des virgules)</label>
                  <input
                    type="text"
                    value={productFormData.benefits}
                    onChange={(e) => setProductFormData({...productFormData, benefits: e.target.value})}
                    placeholder="Booste l'immunité, Facilite la digestion"
                    className="w-full px-3 py-2 rounded-lg bg-primary-dark-lighter border border-gray-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-accent-gold hover:bg-accent-gold-light text-primary-dark font-bold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer"
              >
                {editingProduct ? 'Sauvegarder les modifications' : 'Créer le produit'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
