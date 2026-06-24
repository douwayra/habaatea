import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';

// Seed data
import { INITIAL_PRODUCTS } from './data/products';

const SEED_ORDERS = [
  {
    id: 'HT-482103',
    date: '23/06/2026',
    client: 'Abdoulaye Ndiaye',
    phone: '+221 77 654 32 10',
    email: 'abdoulaye@gmail.sn',
    city: 'Dakar',
    address: 'Sicap Liberté 4, Villa 1024',
    items: 'Sticks Instantanés HABAATEA (x2), Pastilles Apaisantes Nigelle & Menthe (x1)',
    total: 12200, // (4500*2) + 3200 + 2000 (shipping)
    status: 'Livrée'
  },
  {
    id: 'HT-910294',
    date: '24/06/2026',
    client: 'Seynabou Diop',
    phone: '+221 78 123 45 67',
    email: 'seynabou@yahoo.fr',
    city: 'Thiès',
    address: 'Quartier Dixième, près de la grande mosquée',
    items: 'Capsules Premium Habba Sawda (x1)',
    total: 11000, // 7500 + 3500 (shipping)
    status: 'Expédiée'
  },
  {
    id: 'HT-502910',
    date: '24/06/2026',
    client: 'Cheikh Tidiane Sy',
    phone: '+221 76 987 65 43',
    email: 'cheikh.sy@gmail.com',
    city: 'Dakar',
    address: 'Almadies, Résidence R+2',
    items: 'Sticks Instantanés HABAATEA (x1), Capsules Premium Habba Sawda (x2)',
    total: 21500, // 4500 + (7500*2) + 2000 (shipping)
    status: 'En attente'
  }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);
  
  // Products State (loads from localStorage or INITIAL_PRODUCTS seed)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('habaatea_products_v4');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Orders State (loads from localStorage or SEED_ORDERS seed)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('habaatea_orders_v4');
    return saved ? JSON.parse(saved) : SEED_ORDERS;
  });

  // Cart State (loads from localStorage)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('habaatea_cart_v4');
    return saved ? JSON.parse(saved) : [];
  });

  // 1. Loader simulation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Save states to local storage on update
  useEffect(() => {
    localStorage.setItem('habaatea_products_v4', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('habaatea_orders_v4', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('habaatea_cart_v4', JSON.stringify(cart));
  }, [cart]);

  // Cart helper functions
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order helper functions
  const handleOrderPlaced = (newOrder) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    
    // Deduct stock levels for products placed in order
    const orderedItemsMap = cart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});

    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (orderedItemsMap[p.id]) {
          const newStock = p.stock - orderedItemsMap[p.id];
          return { ...p, stock: newStock < 0 ? 0 : newStock };
        }
        return p;
      })
    );
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Product helper functions for Admin Panel CRUD
  const handleAddProduct = (newProd) => {
    setProducts((prevProds) => [...prevProds, newProd]);
  };

  const handleUpdateProduct = (id, updatedProd) => {
    setProducts((prevProds) =>
      prevProds.map((p) => (p.id === id ? { ...p, ...updatedProd } : p))
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prevProds) => prevProds.filter((p) => p.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Custom Loader Component
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary-dark select-none">
        <div className="relative flex items-center justify-center">
          {/* Circular animated rings */}
          <div className="absolute h-24 w-24 rounded-full border-2 border-accent-gold/20 border-t-accent-gold animate-spin" />
          <div className="absolute h-20 w-20 rounded-full border border-primary-green/20 border-b-primary-green animate-spin-slow" />
          
          {/* Center Leaf icon representing nigelle tea theme */}
          <svg className="h-8 w-8 text-accent-gold animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <div className="mt-8 text-center space-y-2.5 px-4 animate-fade-in-up">
          <h2 className="font-serif text-2xl font-bold tracking-widest text-white uppercase">HABAATEA</h2>
          <div className="h-0.5 w-8 bg-accent-gold mx-auto" />
          <p className="text-[10px] sm:text-xs text-gray-400 font-light tracking-wide max-w-xs leading-relaxed italic">
            « L’héritage de la nigelle, l’innovation au service du bien-être. »
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark flex flex-col relative overflow-hidden bg-african-pattern">
      {/* Dynamic Background Floating Elements representing nigella seeds and green leaves */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Floating Seed 1 (Gold) */}
        <div className="absolute top-[15%] left-[5%] opacity-15 animate-float-slow text-accent-gold">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 12 12 22C22 12 17.52 2 12 2Z" />
          </svg>
        </div>
        {/* Floating Seed 2 (Gold) */}
        <div className="absolute bottom-[20%] right-[8%] opacity-10 animate-float-medium text-accent-gold">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 12 12 22C22 12 17.52 2 12 2Z" />
          </svg>
        </div>
        {/* Floating Leaf 1 (Green) */}
        <div className="absolute top-[40%] right-[12%] opacity-10 animate-float-medium text-primary-green-glow">
          <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 2C15.2 3.8 13.5 6.2 12.5 8.5C11.5 6.2 9.8 3.8 7.5 2C5.5 3.8 4.2 6.5 4.5 9.5C4.9 13.5 8.5 21.5 12.5 22C16.5 21.5 20.1 13.5 20.5 9.5C20.8 6.5 19.5 3.8 17.5 2Z" />
          </svg>
        </div>
        {/* Floating Leaf 2 (Green) */}
        <div className="absolute bottom-[35%] left-[10%] opacity-15 animate-float-slow text-primary-green-glow">
          <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 2C15.2 3.8 13.5 6.2 12.5 8.5C11.5 6.2 9.8 3.8 7.5 2C5.5 3.8 4.2 6.5 4.5 9.5C4.9 13.5 8.5 21.5 12.5 22C16.5 21.5 20.1 13.5 20.5 9.5C20.8 6.5 19.5 3.8 17.5 2Z" />
          </svg>
        </div>
        {/* Floating Seed 3 (Small Charcoal) */}
        <div className="absolute top-[75%] left-[30%] opacity-20 animate-float-fast text-primary-dark-lighter">
          <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 12 12 22C22 12 17.52 2 12 2Z" />
          </svg>
        </div>
        {/* Floating Seed 4 (Small Gold) */}
        <div className="absolute top-[8%] right-[35%] opacity-15 animate-float-fast text-accent-gold-light">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 12 12 22C22 12 17.52 2 12 2Z" />
          </svg>
        </div>
      </div>

      {/* Navbar navigation shell */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cartCount} 
        toggleCart={() => setCartOpen(!cartOpen)} 
      />

      {/* Main content body pages renderer */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <Home 
            setActiveTab={setActiveTab} 
            products={products} 
          />
        )}
        
        {activeTab === 'shop' && (
          <Shop 
            products={products} 
            addToCart={addToCart} 
          />
        )}

        {activeTab === 'about' && (
          <About />
        )}

        {activeTab === 'contact' && (
          <Contact />
        )}

        {activeTab === 'checkout' && (
          <Checkout 
            cartItems={cart} 
            clearCart={clearCart} 
            onNavigate={setActiveTab}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard 
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}
      </main>

      {/* Cart drawer side slide overlay */}
      <CartDrawer 
        isOpen={cartOpen} 
        toggleCart={() => setCartOpen(false)} 
        cartItems={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        onCheckout={setActiveTab}
      />

      {/* Footer component */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
