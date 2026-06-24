import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Navbar({ activeTab, setActiveTab, cartCount, toggleCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'shop', label: 'Boutique' },
    { id: 'about', label: 'À Propos' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-28 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <img 
              src={logo} 
              alt="HABAATEA Logo" 
              className="h-24 w-auto object-contain brightness-105"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-1 py-2 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  activeTab === item.id 
                    ? 'text-accent-gold font-semibold' 
                    : 'text-gray-300 hover:text-accent-gold-light'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-accent-gold" />
                )}
              </button>
            ))}

            {/* Admin Toggle button (desktop) */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-accent-gold/20 text-accent-gold border-accent-gold'
                  : 'text-gray-400 border-gray-700 hover:text-accent-gold hover:border-accent-gold/50 bg-primary-dark-light/50'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin</span>
            </button>
          </nav>

          {/* Cart Icon & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button 
              onClick={toggleCart} 
              className="relative p-2.5 rounded-full bg-primary-dark-lighter border border-gray-800 text-gray-300 hover:text-accent-gold hover:border-accent-gold/30 transition-all duration-200 cursor-pointer"
              aria-label="Voir le panier"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-green text-[10px] font-bold text-white ring-2 ring-primary-dark animate-pulse-slow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-gray-300 hover:text-accent-gold transition-colors duration-200 cursor-pointer"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-primary-dark-light/95 backdrop-blur-lg">
          <div className="space-y-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-150 ${
                  activeTab === item.id 
                    ? 'bg-primary-green/20 text-accent-gold border-l-4 border-accent-gold font-semibold' 
                    : 'text-gray-300 hover:bg-primary-dark-lighter hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Admin button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex w-full items-center space-x-2 px-4 py-3 rounded-lg text-base font-medium transition-all duration-150 border mt-3 ${
                activeTab === 'admin'
                  ? 'bg-accent-gold/20 text-accent-gold border-accent-gold'
                  : 'text-gray-300 border-gray-700 hover:bg-primary-dark-lighter'
              }`}
            >
              <ShieldCheck className="h-5 w-5 text-accent-gold-light" />
              <span>Tableau de Bord Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
