import React, { useState, useEffect, useMemo } from 'react';
import { Product, ScreenType } from '../../types';
import { PRODUCTS, BANNER_SLIDES, CATEGORIES, TESTIMONIALS, ASSETS } from '../../data/products';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (product: Product, qty: number) => void;
  onToggleWishlist: (productId: number) => void;
  wishlistIds: number[];
  onSelectProductForPDP: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onSelectProductForPDP,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}) => {
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<string>('pop');
  const [activeBannerIdx, setActiveBannerIdx] = useState<number>(0);

  // Auto-rotate banners every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIdx((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Real-time ticking countdown for Deal of the Day
  const [countdown, setCountdown] = useState({
    hours: 9,
    mins: 42,
    secs: 18,
    ticks: 64
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let total = prev.hours * 3600 + prev.mins * 60 + prev.secs - 1;
        if (total <= 0) total = 3600 * 12;
        const h = Math.floor(total / 3600);
        const m = Math.floor((total % 3600) / 60);
        const s = total % 60;
        const ticks = Math.floor(Math.random() * 80) + 10;
        return { hours: h, mins: m, secs: s, ticks };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = p.price <= maxPrice;
      return matchCat && matchSearch && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
  }, [selectedCategory, searchQuery, maxPrice, sortBy]);

  // Featured selection (showing across categories)
  const featuredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  }, []);

  const resetFilters = () => {
    onCategoryChange('All');
    onSearchChange('');
    setMaxPrice(2000);
    setSortBy('pop');
  };

  const currentBanner = BANNER_SLIDES[activeBannerIdx];

  const handleProductClick = (product: Product) => {
    onSelectProductForPDP(product);
    onNavigate('pdp');
  };

  const handleClaimSyndicateBundle = () => {
    const lightBar = PRODUCTS.find((p) => p.id === 7) || PRODUCTS[0];
    const powerBank = PRODUCTS.find((p) => p.id === 5) || PRODUCTS[1];
    onAddToCart(lightBar, 1);
    onAddToCart(powerBank, 1);
  };

  return (
    <div className="w-full flex flex-col bg-[#131315] text-[#e5e1e4]">
      {/* Top Notification Pill Bar */}
      <section className="w-full bg-[#1c1b1d] px-4 md:px-14 py-2 flex flex-wrap items-center justify-between gap-2 text-[10px] md:text-xs font-mono uppercase tracking-wider border-b border-[#2a2a2c]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
          <span className="text-[#c7c4d7]">Active Storefront Protocol</span>
          <span className="text-[#908fa0]">/</span>
          <span className="text-[#4edea3] font-mono font-bold">
            CODE: CAMPUS25 [25% APPLIED AT TERMINAL]
          </span>
          <span className="text-[#908fa0]">•</span>
          <span className="text-[#c0c1ff]">12 Verified Departments</span>
        </div>
        <div className="flex items-center gap-4 text-[#c7c4d7] font-mono">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-[#c0c1ff]">
              local_shipping
            </span>{' '}
            Free Campus Shipping &gt;$35
          </span>
          <span className="hidden sm:inline text-[#908fa0]">•</span>
          <span className="hidden sm:flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-[#4edea3]">
              verified_user
            </span>{' '}
            30-Day Physical Guarantee
          </span>
        </div>
      </section>

      {/* Dynamic Hero Showcase with Multi-Banner Switcher */}
      <section className="relative w-full bg-[#131315] px-4 md:px-14 py-8 md:py-16 overflow-hidden border-b border-[#2a2a2c]">
        {/* Background Dot Matrix Pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c0c1ff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#2a2a2c] px-3 py-1 text-[#4edea3] text-[11px] font-mono uppercase tracking-widest border border-[#464554]">
              <span className="material-symbols-outlined text-xs">bolt</span>
              <span>{currentBanner.kicker}</span>
            </div>

            <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl text-[#e5e1e4] tracking-tight leading-none uppercase font-bold">
              {currentBanner.title}{' '}
              <span className="text-[#c0c1ff] italic font-normal">
                {currentBanner.highlight}
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-[#c7c4d7] max-w-xl leading-relaxed">
              {currentBanner.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#catalog-grid"
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#c0c1ff] text-[#1000a9] font-headline text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-[#8083ff] hover:text-[#0d0096] transition-all shadow-[4px_4px_0px_0px_#000000] flex items-center gap-2 border border-[#c0c1ff]"
              >
                <span>{currentBanner.ctaText}</span>
                <span className="material-symbols-outlined text-base">arrow_downward</span>
              </a>

              {currentBanner.categoryFilter && (
                <button
                  type="button"
                  onClick={() => {
                    onCategoryChange(currentBanner.categoryFilter!);
                    const el = document.getElementById('catalog-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 bg-[#2a2a2c] text-[#e5e1e4] font-headline text-xs sm:text-sm uppercase tracking-wider hover:bg-[#39393b] transition-all shadow-[2px_2px_0px_0px_#000000] border border-[#464554]"
                >
                  Filter {currentBanner.categoryFilter}
                </button>
              )}
            </div>

            {/* Telemetry Stats Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 max-w-lg">
              {currentBanner.stats.map((stat, i) => (
                <div key={i} className="p-2 sm:p-3 bg-[#0e0e10] border border-[#2a2a2c]">
                  <div className="font-headline text-base sm:text-xl text-[#c0c1ff] font-mono font-bold">
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[#c7c4d7] uppercase font-mono tracking-wider truncate">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Slide Indicators */}
            <div className="flex items-center gap-2 pt-2">
              {BANNER_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveBannerIdx(idx)}
                  className={`h-1.5 transition-all ${
                    activeBannerIdx === idx
                      ? 'w-8 bg-[#c0c1ff]'
                      : 'w-2 bg-[#464554] hover:bg-[#908fa0]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
              <span className="text-[10px] font-mono text-[#908fa0] ml-2">
                0{activeBannerIdx + 1} / 0{BANNER_SLIDES.length}
              </span>
            </div>
          </div>

          {/* Hero Visual Display Right Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-[#1c1b1d] p-4 border border-[#464554] shadow-[8px_8px_0px_0px_#0e0e10]">
              <div className="flex items-center justify-between pb-2 mb-3 text-[#c7c4d7] font-mono text-xs border-b border-[#2a2a2c]">
                <span>{currentBanner.badge}</span>
                <span className="text-[#4edea3] font-bold">CURATED ROTATION</span>
              </div>

              <div
                className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#0e0e10] cursor-pointer group"
                onClick={() => {
                  const targetProd = PRODUCTS.find(
                    (p) => p.category === currentBanner.categoryFilter
                  ) || PRODUCTS[0];
                  handleProductClick(targetProd);
                }}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={currentBanner.title}
                  src={currentBanner.image}
                  onError={(e) => {
                    // graceful fallback
                    (e.target as HTMLImageElement).src = ASSETS.heroBundle;
                  }}
                />
                <div className="absolute bottom-3 left-3 bg-[#0e0e10]/90 px-3 py-1.5 backdrop-blur-md border border-[#464554]">
                  <span className="font-headline text-xs sm:text-sm uppercase font-bold text-[#e5e1e4] block">
                    {currentBanner.highlight} Series
                  </span>
                  <span className="block font-mono text-[10px] text-[#4edea3] font-bold">
                    Campus Certified Selection
                  </span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs text-[#c7c4d7]">
                <span className="font-mono text-[11px]">
                  INDEX: LUM-ROT-0{activeBannerIdx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const targetProd = PRODUCTS.find(
                      (p) => p.category === currentBanner.categoryFilter
                    ) || PRODUCTS[0];
                    onAddToCart(targetProd, 1);
                  }}
                  className="text-[#c0c1ff] hover:text-[#8083ff] text-xs uppercase font-bold font-mono flex items-center gap-1 transition-colors cursor-pointer"
                >
                  Direct Quick Load <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Curated Spotlight Row */}
      <section className="w-full bg-[#1c1b1d] px-4 md:px-14 py-8 border-b border-[#2a2a2c]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#4edea3] inline-block"></span>
              <h3 className="font-headline text-base md:text-lg text-[#e5e1e4] uppercase font-bold tracking-wide">
                Featured Flagship Highlights
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#908fa0]">
              PEER-VERIFIED HARDWARE &amp; APPAREL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((p) => {
              const isWished = wishlistIds.includes(p.id);
              const discountPct = p.originalPrice
                ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={p.id}
                  className="bg-[#0e0e10] border border-[#464554] p-3 flex flex-col justify-between hover:border-[#c0c1ff] transition-all group"
                >
                  <div
                    className="relative h-44 bg-[#201f22] overflow-hidden cursor-pointer mb-2"
                    onClick={() => handleProductClick(p)}
                  >
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = ASSETS.quickViewAlt;
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-[#c0c1ff] text-[#1000a9] text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase">
                      FEATURED
                    </div>
                    {discountPct > 0 && (
                      <div className="absolute top-2 right-2 bg-[#ffb4ab] text-[#690005] text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase">
                        -{discountPct}%
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#908fa0]">
                      <span>{p.category}</span>
                      <span className="text-[#4edea3]">★ {p.rating}</span>
                    </div>

                    <h4
                      onClick={() => handleProductClick(p)}
                      className="font-headline text-xs font-bold text-[#e5e1e4] truncate mt-1 group-hover:text-[#c0c1ff] cursor-pointer"
                      title={p.title}
                    >
                      {p.title}
                    </h4>

                    <div className="flex items-baseline gap-2 mt-1 font-mono">
                      <span className="text-sm font-bold text-[#c0c1ff]">
                        ${p.price.toFixed(2)}
                      </span>
                      {p.originalPrice && (
                        <span className="text-[10px] text-[#908fa0] line-through">
                          ${p.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#2a2a2c]">
                    <button
                      type="button"
                      onClick={() => onAddToCart(p, 1)}
                      className="flex-1 py-1.5 bg-[#201f22] hover:bg-[#c0c1ff] hover:text-[#1000a9] text-[#e5e1e4] text-[10px] font-mono uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-1 border border-[#464554]"
                    >
                      <span className="material-symbols-outlined text-xs">add_shopping_cart</span>
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(p.id)}
                      className={`p-1.5 border border-[#464554] transition-colors ${
                        isWished ? 'bg-[#ffdad6] text-[#93000a]' : 'text-[#908fa0] hover:text-[#ffb4ab]'
                      }`}
                      title={isWished ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isWished ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Filter, Search & Catalog Control Hub (Sticky) */}
      <section className="w-full bg-[#0e0e10] px-4 md:px-14 py-4 sticky top-16 md:top-20 z-30 shadow-md border-b border-[#2a2a2c]">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Live Search */}
            <div className="relative flex-1 max-w-xl">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#908fa0] text-base select-none">
                manage_search
              </span>
              <input
                className="w-full bg-[#1c1b1d] border border-[#464554] text-[#e5e1e4] text-xs pl-9 pr-24 py-2 focus:outline-none focus:border-[#c0c1ff] transition-all font-sans"
                placeholder="Filter by title, specs, SKU across 12 categories..."
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className="font-mono text-[10px] text-[#908fa0] px-1.5 py-0.5 bg-[#201f22] border border-[#464554]">
                  {filteredProducts.length} specs
                </span>
              </div>
            </div>

            {/* Price Slider & Sort */}
            <div className="flex flex-wrap items-center gap-3 justify-between md:justify-end">
              <div className="flex items-center gap-2 bg-[#1c1b1d] border border-[#464554] px-3 py-1.5">
                <span className="text-[10px] font-mono text-[#c7c4d7] uppercase">Max:</span>
                <span className="font-mono text-xs text-[#4edea3] font-bold">
                  ${maxPrice}
                </span>
                <input
                  className="w-24 sm:w-28 accent-[#c0c1ff] cursor-pointer h-1.5 bg-[#353437]"
                  max="2000"
                  min="20"
                  step="10"
                  type="range"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                />
              </div>

              <div className="flex items-center bg-[#1c1b1d] border border-[#464554] px-3 py-1.5">
                <span className="text-[10px] font-mono text-[#c7c4d7] uppercase mr-2">Sort:</span>
                <select
                  className="bg-transparent text-[#e5e1e4] text-xs uppercase focus:outline-none cursor-pointer font-mono"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option className="bg-[#201f22] text-[#e5e1e4]" value="pop">
                    Popularity
                  </option>
                  <option className="bg-[#201f22] text-[#e5e1e4]" value="price-asc">
                    Price: Low to High
                  </option>
                  <option className="bg-[#201f22] text-[#e5e1e4]" value="price-desc">
                    Price: High to Low
                  </option>
                  <option className="bg-[#201f22] text-[#e5e1e4]" value="rating">
                    Highest Rated
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* All 12 Categories Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => onCategoryChange('All')}
              className={`px-3 py-1 font-mono text-xs uppercase transition-all shrink-0 border ${
                selectedCategory === 'All'
                  ? 'bg-[#c0c1ff] text-[#1000a9] font-bold border-[#c0c1ff]'
                  : 'bg-[#2a2a2c] text-[#e5e1e4] border-[#464554] hover:text-[#c0c1ff]'
              }`}
            >
              All Specs ({PRODUCTS.length})
            </button>

            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              const count = PRODUCTS.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-3 py-1 font-mono text-xs uppercase transition-all shrink-0 border flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#c0c1ff] text-[#1000a9] font-bold border-[#c0c1ff]'
                      : 'bg-[#2a2a2c] text-[#e5e1e4] border-[#464554] hover:text-[#c0c1ff] hover:border-[#c0c1ff]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[9px] px-1 py-0.2 font-mono ${
                      isActive ? 'bg-[#1000a9] text-[#c0c1ff]' : 'bg-[#1c1b1d] text-[#908fa0]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Verified Inventory Matrix Grid */}
      <section className="w-full px-4 md:px-14 py-12 bg-[#131315]" id="catalog-grid">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2c]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#c0c1ff] inline-block"></span>
              <h2 className="font-headline text-xl md:text-2xl text-[#e5e1e4] uppercase tracking-tight font-bold">
                {selectedCategory === 'All' ? 'Verified Inventory Matrix' : selectedCategory}
              </h2>
            </div>
            <span className="font-mono text-xs text-[#908fa0] uppercase">
              Showing {filteredProducts.length} Compatible Specs
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-[#1c1b1d] border border-[#464554] p-8 space-y-3">
              <span className="material-symbols-outlined text-[#908fa0] text-5xl">
                search_off
              </span>
              <h3 className="font-headline text-lg text-[#e5e1e4] uppercase font-bold">
                No Compatible Specs Found
              </h3>
              <p className="text-xs text-[#c7c4d7]">
                Adjust your keyword query, change category, or increase price bracket threshold.
              </p>
              <button
                className="mt-2 px-4 py-2 bg-[#c0c1ff] text-[#1000a9] text-xs uppercase font-bold font-mono hover:bg-[#8083ff]"
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => {
                const isWished = wishlistIds.includes(p.id);
                const discountPct = p.originalPrice
                  ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={p.id}
                    className="bg-[#1c1b1d] border border-[#464554] flex flex-col justify-between group transition-all duration-300 hover:shadow-[6px_6px_0px_0px_#0e0e10] hover:border-[#c0c1ff]"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div
                        className="relative h-56 bg-[#0e0e10] overflow-hidden cursor-pointer"
                        onClick={() => handleProductClick(p)}
                      >
                        <img
                          src={p.image}
                          alt={p.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = ASSETS.quickViewAlt;
                          }}
                        />

                        {p.tag && (
                          <div className="absolute top-2 left-2 bg-[#c0c1ff] text-[#1000a9] font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                            {p.tag}
                          </div>
                        )}

                        {discountPct > 0 && (
                          <div className="absolute top-2 right-10 bg-[#ffb4ab] text-[#690005] font-mono text-[10px] font-bold px-1.5 py-0.5 uppercase">
                            -{discountPct}%
                          </div>
                        )}

                        {/* Wishlist toggle directly on image */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(p.id);
                          }}
                          className={`absolute top-2 right-2 p-1.5 transition-colors z-10 border border-[#464554] ${
                            isWished
                              ? 'bg-[#ffdad6] text-[#93000a]'
                              : 'bg-[#0e0e10]/80 text-[#e5e1e4] hover:text-[#ffb4ab]'
                          }`}
                          title={isWished ? 'Remove from wishlist' : 'Save to wishlist'}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {isWished ? 'favorite' : 'favorite_border'}
                          </span>
                        </button>

                        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-[#0e0e10]/90 backdrop-blur-xs px-2 py-0.5">
                          <span className="w-1.5 h-1.5 bg-[#4edea3] inline-block"></span>
                          <span className="font-mono text-[10px] text-[#4edea3] uppercase font-semibold">
                            IN STOCK
                          </span>
                        </div>

                        {/* Quick Spec Button Overlay */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenQuickView(p);
                          }}
                          className="absolute inset-0 bg-[#0e0e10]/75 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#e5e1e4] font-headline text-xs uppercase font-bold tracking-wider gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-base">
                            visibility
                          </span>
                          Quick Spec
                        </button>
                      </div>

                      {/* Card Content */}
                      <div className="p-3 space-y-2">
                        <div className="flex items-center justify-between font-mono text-[11px] text-[#c7c4d7]">
                          <span className="truncate pr-1">{p.category}</span>
                          <div className="flex items-center text-[#4edea3] shrink-0">
                            <span>★</span>
                            <span className="ml-1 text-[#e5e1e4]">{p.rating}</span>
                            <span className="text-[#908fa0] ml-0.5">({p.reviews})</span>
                          </div>
                        </div>

                        <h3
                          onClick={() => handleProductClick(p)}
                          className="font-headline text-sm text-[#e5e1e4] uppercase font-bold line-clamp-1 group-hover:text-[#c0c1ff] transition-colors cursor-pointer"
                          title={p.title}
                        >
                          {p.title}
                        </h3>

                        <div className="flex items-baseline gap-2 pt-1 font-mono">
                          <span className="text-[#c0c1ff] font-bold text-base">
                            ${p.price.toFixed(2)}
                          </span>
                          {p.originalPrice && (
                            <span className="text-[#908fa0] text-xs line-through">
                              ${p.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="p-3 pt-0 flex items-center gap-2">
                      <button
                        onClick={() => onAddToCart(p, 1)}
                        className="flex-1 py-2 bg-[#2a2a2c] hover:bg-[#c0c1ff] hover:text-[#1000a9] text-[#e5e1e4] font-headline text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-1 border border-[#464554]"
                      >
                        <span className="material-symbols-outlined text-sm">
                          add_shopping_cart
                        </span>
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleProductClick(p)}
                        className="p-2 bg-[#201f22] text-[#e5e1e4] hover:text-[#c0c1ff] border border-[#464554] transition-colors"
                        title="View Full Spec Sheet"
                      >
                        <span className="material-symbols-outlined text-sm">tune</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Spotlight / Deal of the Day */}
      <section
        className="w-full bg-[#1c1b1d] px-4 md:px-14 py-12 md:py-16 relative overflow-hidden border-t border-b border-[#2a2a2c]"
        id="academic-deal-section"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Deal Visual Display */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#0e0e10] p-4 border border-[#464554] shadow-[6px_6px_0px_0px_#000000]">
              <div className="relative h-64 sm:h-72 w-full bg-[#201f22] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Futuristic smart illuminated light bar mounted on monitor"
                  src={ASSETS.dealFlashDrop}
                />
                <div className="absolute top-2 right-2 bg-[#ffb4ab] text-[#690005] font-mono text-[11px] font-bold px-2 py-1 uppercase">
                  Save 38%
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center text-xs">
                <span className="font-headline text-xs md:text-sm text-[#e5e1e4] font-bold uppercase">
                  FocusPulse + MagSafe Bundle
                </span>
                <span className="font-mono text-[#4edea3] font-bold text-sm md:text-base">
                  $68.99 <s className="text-[#908fa0] text-xs font-normal">$109.98</s>
                </span>
              </div>
            </div>
          </div>

          {/* Deal Copy & Live Countdown */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-[#93000a] text-[#ffdad6] px-3 py-1 text-[11px] font-mono font-bold uppercase border border-[#ffb4ab]/30">
              <span className="material-symbols-outlined text-sm">timer</span>
              <span>Flash Drop • Campus Syndicate Deal</span>
            </div>

            <h2 className="font-headline text-2xl sm:text-4xl text-[#e5e1e4] tracking-tight uppercase font-bold">
              Deal of The Academic Cycle
            </h2>

            <p className="text-xs md:text-sm text-[#c7c4d7] max-w-xl leading-relaxed">
              Equip your late-night study sessions with the calibrated FocusPulse screen illumination bar and Lumina's high-density MagSafe 10,000mAh reserve battery. Zero glare, uninterrupted power.
            </p>

            {/* Live Countdown Timer */}
            <div className="grid grid-cols-4 gap-2 max-w-sm pt-2 text-center font-mono">
              <div className="bg-[#2a2a2c] p-2 border border-[#464554]">
                <div className="font-headline text-lg sm:text-xl text-[#c0c1ff] font-bold">
                  {String(countdown.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-[#c7c4d7] uppercase">HOURS</div>
              </div>
              <div className="bg-[#2a2a2c] p-2 border border-[#464554]">
                <div className="font-headline text-lg sm:text-xl text-[#c0c1ff] font-bold">
                  {String(countdown.mins).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-[#c7c4d7] uppercase">MINS</div>
              </div>
              <div className="bg-[#2a2a2c] p-2 border border-[#464554]">
                <div className="font-headline text-lg sm:text-xl text-[#4edea3] font-bold">
                  {String(countdown.secs).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-[#c7c4d7] uppercase">SECS</div>
              </div>
              <div className="bg-[#2a2a2c] p-2 border border-[#464554]">
                <div className="font-headline text-lg sm:text-xl text-[#908fa0] font-bold">
                  {String(countdown.ticks).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-[#c7c4d7] uppercase">TICKS</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleClaimSyndicateBundle}
                className="px-6 py-3 bg-[#4edea3] text-[#003824] font-headline text-xs md:text-sm uppercase font-bold tracking-wider hover:bg-[#6ffbbe] transition-all shadow-[4px_4px_0px_0px_#000000] border border-[#4edea3]"
              >
                Claim Syndicate Bundle ($68.99)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials & Student Project Verification Banner */}
      <section className="w-full bg-[#131315] px-4 md:px-14 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b border-[#2a2a2c]">
            <div>
              <span className="text-[#c0c1ff] font-mono text-[11px] uppercase tracking-wider block">
                Student Verified Feedback
              </span>
              <h2 className="font-headline text-xl md:text-2xl text-[#e5e1e4] uppercase tracking-tight font-bold">
                Field Reports &amp; Lab Notes
              </h2>
            </div>
            <div className="p-2 bg-[#1c1b1d] border border-[#464554] text-[#c7c4d7] font-mono text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3] text-sm">
                verified
              </span>
              <span>Peer-reviewed for academic productivity</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1c1b1d] p-5 border border-[#464554] shadow-[4px_4px_0px_0px_#0e0e10] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex text-[#4edea3] text-xs font-mono">
                    <span>★★★★★</span>
                  </div>
                  <p className="text-xs md:text-sm text-[#e5e1e4] leading-relaxed">
                    {item.quote}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#2a2a2c] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-headline text-xs text-[#e5e1e4] uppercase font-bold block">
                      {item.author}
                    </span>
                    <span className="text-[#908fa0] font-mono text-[11px]">
                      {item.major}
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 bg-[#2a2a2c] text-[#4edea3] text-[10px] font-mono border border-[#464554]">
                    VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Capstone Architecture Banner */}
          <div className="bg-[#0e0e10] p-5 border border-[#464554] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2a2a2c] border border-[#464554] flex items-center justify-center text-[#c0c1ff] font-mono font-bold text-sm shrink-0">
                &lt;/&gt;
              </div>
              <div>
                <h4 className="font-headline text-sm text-[#e5e1e4] uppercase font-bold">
                  College Capstone Engineering Specification
                </h4>
                <p className="text-xs text-[#c7c4d7]">
                  Built with modular CSS architecture, responsive layout matrix, synchronous telemetry cart calculation, and zero extraneous dependencies.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 bg-[#201f22] text-[#4edea3] text-[10px] font-mono uppercase font-bold border border-[#464554]">
                JS State Engine: OK
              </span>
              <span className="px-2.5 py-1 bg-[#201f22] text-[#c0c1ff] text-[10px] font-mono uppercase font-bold border border-[#464554]">
                Build: v4.2.9
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
