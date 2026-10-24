import React, { useState } from 'react';
import { ScreenType, ProductCategory } from '../types';
import { ASSETS, CATEGORIES } from '../data/products';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategoryFilter: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategoryFilter
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (screen: ScreenType, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  const handleDealsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentScreen !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('academic-deal-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('academic-deal-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoriesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCategoryMenu(!showCategoryMenu);
  };

  const handleSelectCategory = (cat: string) => {
    onSelectCategoryFilter(cat);
    setShowCategoryMenu(false);
    setMobileMenuOpen(false);
    if (currentScreen !== 'home') {
      onNavigate('home');
    }
    setTimeout(() => {
      const el = document.getElementById('catalog-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#0e0e10]/95 backdrop-blur-xl border-b border-[#464554]/40">
      {/* Top Demo Bar / Screen Switcher Shortcut Bar */}
      <div className="bg-[#1c1b1d] border-b border-[#2a2a2c] px-4 md:px-14 py-1 flex items-center justify-between text-[11px] font-mono text-[#c7c4d7]">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
          <span className="w-1.5 h-1.5 bg-[#4edea3] inline-block animate-pulse shrink-0"></span>
          <span className="text-[#908fa0] hidden lg:inline shrink-0">SCREEN ROUTER:</span>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className={`px-2 py-0.5 uppercase tracking-wider transition-colors shrink-0 ${
                currentScreen === 'home'
                  ? 'bg-[#c0c1ff] text-[#1000a9] font-bold'
                  : 'bg-[#2a2a2c] text-[#e5e1e4] hover:text-[#c0c1ff]'
              }`}
            >
              1. Shop / Home
            </button>
            <button
              onClick={() => onNavigate('pdp')}
              className={`px-2 py-0.5 uppercase tracking-wider transition-colors shrink-0 ${
                currentScreen === 'pdp'
                  ? 'bg-[#c0c1ff] text-[#1000a9] font-bold'
                  : 'bg-[#2a2a2c] text-[#e5e1e4] hover:text-[#c0c1ff]'
              }`}
            >
              2. Product PDP
            </button>
            <button
              onClick={() => onNavigate('checkout')}
              className={`px-2 py-0.5 uppercase tracking-wider transition-colors shrink-0 ${
                currentScreen === 'checkout'
                  ? 'bg-[#c0c1ff] text-[#1000a9] font-bold'
                  : 'bg-[#2a2a2c] text-[#e5e1e4] hover:text-[#c0c1ff]'
              }`}
            >
              3. Terminal Checkout
            </button>
            <button
              onClick={() => onNavigate('confirmation')}
              className={`px-2 py-0.5 uppercase tracking-wider transition-colors shrink-0 ${
                currentScreen === 'confirmation'
                  ? 'bg-[#c0c1ff] text-[#1000a9] font-bold'
                  : 'bg-[#2a2a2c] text-[#e5e1e4] hover:text-[#c0c1ff]'
              }`}
            >
              4. Order Telemetry
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3 text-[#908fa0] shrink-0">
          <span>ALL 12 DEPARTMENTS LOADED</span>
          <span>•</span>
          <span className="text-[#4edea3]">TLS-256 ENCRYPTED</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="h-16 md:h-20 w-full px-4 md:px-14 flex items-center justify-between gap-4">
        {/* Mobile menu hamburger */}
        <button
          className="md:hidden p-1.5 text-[#e5e1e4] border border-[#464554] bg-[#201f22]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-outlined text-lg">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Brand Zone */}
        <button
          onClick={(e) => handleNavClick('home', e)}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <img
            alt="Lumina Logo"
            className="h-7 md:h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={ASSETS.logo}
          />
          <div className="flex flex-col">
            <span className="font-headline text-lg md:text-xl text-[#c0c1ff] tracking-tight font-bold uppercase leading-none">
              Lumina
            </span>
            <span className="text-[9px] font-mono text-[#908fa0] uppercase tracking-widest hidden sm:inline">
              Curated Goods
            </span>
          </div>
        </button>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-5 relative">
          <button
            onClick={(e) => handleNavClick('home', e)}
            className={`uppercase tracking-wider transition-colors text-xs font-semibold px-2.5 py-1 ${
              currentScreen === 'home' && selectedCategory === 'All'
                ? 'text-[#c0c1ff] font-bold bg-[#2a2a2c] border border-[#464554]'
                : 'text-[#c7c4d7] hover:text-[#e5e1e4]'
            }`}
          >
            Home / Shop
          </button>

          {/* Categories Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={handleCategoriesClick}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors px-2.5 py-1 flex items-center gap-1 border ${
                showCategoryMenu || (selectedCategory !== 'All' && currentScreen === 'home')
                  ? 'bg-[#2a2a2c] text-[#c0c1ff] border-[#c0c1ff]'
                  : 'text-[#c7c4d7] hover:text-[#e5e1e4] border-transparent'
              }`}
            >
              <span>Categories</span>
              <span className="material-symbols-outlined text-sm">
                {showCategoryMenu ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {/* 12 Categories Mega Grid Dropdown */}
            {showCategoryMenu && (
              <div className="absolute left-0 top-10 w-[520px] bg-[#1c1b1d] border border-[#464554] p-4 shadow-2xl z-50 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2">
                <div className="col-span-2 pb-2 mb-1 border-b border-[#2a2a2c] flex justify-between items-center text-xs font-mono text-[#908fa0]">
                  <span>SELECT CATALOG SPECIFICATION (12 DEPARTMENTS)</span>
                  <button
                    onClick={() => handleSelectCategory('All')}
                    className="text-[#4edea3] hover:underline uppercase text-[10px]"
                  >
                    View All Specs
                  </button>
                </div>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className={`text-left px-3 py-2 text-xs font-mono uppercase tracking-wide flex items-center justify-between border transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#c0c1ff] text-[#1000a9] font-bold border-[#c0c1ff]'
                        : 'bg-[#0e0e10] text-[#c7c4d7] border-[#2a2a2c] hover:border-[#c0c1ff] hover:text-[#e5e1e4]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] text-[#908fa0]">5 items</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleDealsClick}
            className="text-[#c7c4d7] text-xs font-semibold uppercase tracking-wider hover:text-[#e5e1e4] transition-colors px-2.5 py-1 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-xs text-[#ffb4ab]">bolt</span>
            Deals
          </button>

          <button
            onClick={(e) => handleNavClick('confirmation', e)}
            className={`uppercase tracking-wider transition-colors text-xs font-semibold px-2.5 py-1 ${
              currentScreen === 'confirmation'
                ? 'text-[#c0c1ff] font-bold bg-[#2a2a2c] border border-[#464554]'
                : 'text-[#c7c4d7] hover:text-[#e5e1e4]'
            }`}
          >
            Orders
          </button>
        </nav>

        {/* Search Bar Input */}
        <div className="flex-1 max-w-xs md:max-w-md hidden sm:block">
          <div className="relative flex items-center bg-[#1c1b1d] border border-[#464554] px-2.5 py-1.5 focus-within:border-[#c0c1ff] transition-colors">
            <span className="material-symbols-outlined text-[#908fa0] text-lg mr-2 select-none">
              search
            </span>
            <input
              className="w-full bg-transparent text-[#e5e1e4] text-xs focus:outline-none placeholder:text-[#908fa0] font-sans"
              placeholder="Search across all 12 categories, SKUs..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentScreen !== 'home') onNavigate('home');
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="text-[#908fa0] hover:text-[#e5e1e4] mr-1"
              >
                <span className="material-symbols-outlined text-sm">cancel</span>
              </button>
            )}
            <div className="flex items-center gap-1 ml-1 shrink-0">
              <button
                type="button"
                onClick={() => handleSelectCategory("Men's Clothing")}
                className="px-1.5 py-0.5 bg-[#201f22] text-[#c7c4d7] text-[9px] font-mono uppercase border border-[#464554] hover:border-[#c0c1ff] hidden lg:inline"
              >
                Men
              </button>
              <button
                type="button"
                onClick={() => handleSelectCategory("Mobiles")}
                className="px-1.5 py-0.5 bg-[#201f22] text-[#c7c4d7] text-[9px] font-mono uppercase border border-[#464554] hover:border-[#c0c1ff] hidden lg:inline"
              >
                Mobile
              </button>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist Button */}
          <button
            className="p-1.5 text-[#c7c4d7] hover:text-[#ffb4ab] transition-colors relative border border-[#464554] bg-[#201f22] hover:border-[#ffb4ab]"
            type="button"
            onClick={onOpenWishlist}
            title="Open Saved Wishlist"
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 bg-[#ffb4ab] text-[#690005] text-[9px] font-mono font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-[#2a2a2c] border border-[#464554] hover:border-[#c0c1ff] text-[#e5e1e4] transition-colors cursor-pointer"
            onClick={onOpenCart}
            type="button"
            aria-label="Open Manifest Cart"
          >
            <span className="material-symbols-outlined text-base text-[#4edea3]">
              shopping_cart
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">
              Cart
            </span>
            <span className="px-1.5 py-0.2 bg-[#4edea3] text-[#003824] text-xs font-mono font-bold">
              {cartCount}
            </span>
          </button>

          {/* User Profile */}
          <div className="relative pl-1 sm:pl-2 border-l border-[#464554]">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 focus:outline-none cursor-pointer"
              type="button"
            >
              <img
                alt="Alex Turner Profile"
                className="w-8 h-8 object-cover border border-[#464554] hover:border-[#c0c1ff] transition-colors"
                src={ASSETS.avatar}
              />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-11 w-64 bg-[#1c1b1d] border border-[#464554] p-3 shadow-2xl z-50 space-y-2">
                <div className="border-b border-[#2a2a2c] pb-2">
                  <div className="text-xs font-bold text-[#e5e1e4]">Alex R. Chen</div>
                  <div className="text-[11px] text-[#908fa0] font-mono truncate">
                    alex.chen@polytechnic.edu
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-[#4edea3]">
                    <span className="w-1.5 h-1.5 bg-[#4edea3] inline-block"></span>
                    CAMPUS VALIDATED .EDU (25% CODE: CAMPUS25)
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      onNavigate('confirmation');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2 py-1.5 hover:bg-[#201f22] text-[#c7c4d7] hover:text-[#e5e1e4] font-mono uppercase text-[11px] flex items-center justify-between"
                  >
                    <span>Active Telemetry Order</span>
                    <span className="text-[#4edea3]">#LM-84920</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('checkout');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2 py-1.5 hover:bg-[#201f22] text-[#c7c4d7] hover:text-[#e5e1e4] font-mono uppercase text-[11px]"
                  >
                    Locker ID &amp; Payment Nodes
                  </button>
                  <button
                    onClick={() => {
                      onOpenWishlist();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2 py-1.5 hover:bg-[#201f22] text-[#c7c4d7] hover:text-[#e5e1e4] font-mono uppercase text-[11px] flex items-center justify-between"
                  >
                    <span>Saved Wishlist Items</span>
                    <span className="text-[#ffb4ab]">({wishlistCount})</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1c1b1d] border-b border-[#464554] p-4 space-y-3">
          <div className="relative flex items-center bg-[#0e0e10] border border-[#464554] px-2.5 py-1.5">
            <span className="material-symbols-outlined text-[#908fa0] text-sm mr-2">search</span>
            <input
              className="w-full bg-transparent text-[#e5e1e4] text-xs focus:outline-none placeholder:text-[#908fa0]"
              placeholder="Search all 60 products..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentScreen !== 'home') onNavigate('home');
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2a2a2c]">
            <button
              onClick={(e) => handleNavClick('home', e)}
              className="text-left px-3 py-2 bg-[#201f22] text-xs font-mono uppercase text-[#e5e1e4]"
            >
              Home / Shop
            </button>
            <button
              onClick={handleDealsClick}
              className="text-left px-3 py-2 bg-[#201f22] text-xs font-mono uppercase text-[#ffb4ab]"
            >
              Academic Deals
            </button>
            <button
              onClick={(e) => handleNavClick('checkout', e)}
              className="text-left px-3 py-2 bg-[#201f22] text-xs font-mono uppercase text-[#e5e1e4]"
            >
              Terminal Checkout
            </button>
            <button
              onClick={(e) => handleNavClick('confirmation', e)}
              className="text-left px-3 py-2 bg-[#201f22] text-xs font-mono uppercase text-[#4edea3]"
            >
              Orders Telemetry
            </button>
          </div>

          <div className="pt-2 border-t border-[#2a2a2c]">
            <span className="text-[10px] font-mono uppercase text-[#908fa0] block mb-2">
              Browse by Department (12 Categories):
            </span>
            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
              <button
                onClick={() => handleSelectCategory('All')}
                className="text-left px-2 py-1 text-[11px] font-mono uppercase bg-[#2a2a2c] text-[#c0c1ff]"
              >
                All 60 Specs
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => handleSelectCategory(c)}
                  className={`text-left px-2 py-1 text-[11px] font-mono uppercase truncate ${
                    selectedCategory === c
                      ? 'bg-[#c0c1ff] text-[#1000a9] font-bold'
                      : 'bg-[#0e0e10] text-[#c7c4d7]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
