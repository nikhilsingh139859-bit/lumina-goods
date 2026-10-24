import React, { useState, useEffect } from 'react';
import { Product, ScreenType } from '../../types';
import { PRODUCTS, ASSETS } from '../../data/products';

interface PDPScreenProps {
  product?: Product;
  onNavigate: (screen: ScreenType) => void;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
  onAddCustomCartItem: (item: {
    id: number;
    title: string;
    sku: string;
    price: number;
    quantity: number;
    image: string;
    subtitle?: string;
  }) => void;
  onOpenCart: () => void;
  onSelectProductForPDP?: (product: Product) => void;
  onToggleWishlist?: (productId: number) => void;
  wishlistIds?: number[];
}

export const PDPScreen: React.FC<PDPScreenProps> = ({
  product: propProduct,
  onNavigate,
  onAddToCart,
  onAddCustomCartItem,
  onOpenCart,
  onSelectProductForPDP,
  onToggleWishlist,
  wishlistIds = []
}) => {
  // Fallback to primary catalog item if none passed
  const activeProduct = propProduct || PRODUCTS[0];

  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [hasProtection, setHasProtection] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews'>('specs');
  const [isZoomed, setIsZoomed] = useState(false);
  const [btnFeedback, setBtnFeedback] = useState(false);

  // Bundle checkboxes for accessories
  const [includeAddon1, setIncludeAddon1] = useState(true);
  const [includeAddon2, setIncludeAddon2] = useState(true);

  // Sync selected variant when product changes
  useEffect(() => {
    setActiveAngleIndex(0);
    setQuantity(1);
    setHasProtection(false);
    if (activeProduct.variants && activeProduct.variants.length > 0) {
      setSelectedVariant(activeProduct.variants[0]);
    } else {
      setSelectedVariant('Standard Model');
    }
  }, [activeProduct.id]);

  const isFavorite = wishlistIds.includes(activeProduct.id);

  // Build responsive gallery
  const galleryImages = activeProduct.gallery && activeProduct.gallery.length > 0
    ? activeProduct.gallery
    : [
        { src: activeProduct.image, label: '01 // Primary', alt: `${activeProduct.title} - Main perspective` },
        { src: activeProduct.image, label: '02 // Detail', alt: `${activeProduct.title} - Detail focus` },
        { src: activeProduct.image, label: '03 // Profile', alt: `${activeProduct.title} - Side view` },
        { src: activeProduct.image, label: '04 // Context', alt: `${activeProduct.title} - Workspace context` }
      ];

  const isTechCategory = [
    'Electronics',
    'Mobiles',
    'Laptops',
    'Headphones',
    'Watches'
  ].includes(activeProduct.category);

  const protectionPlanCost = Math.max(9.99, Number((activeProduct.price * 0.1).toFixed(2)));
  const protectionLabel = isTechCategory
    ? 'Lumina Care+ 2-Year Hardware Replacement'
    : 'Lumina Guaranteed Lifetime Quality Warranty';

  const unitPrice = activeProduct.price + (hasProtection ? protectionPlanCost : 0);
  const totalPrice = unitPrice * quantity;

  // Addon bundle calculations
  const addon1 = {
    id: 991,
    title: 'Reinforced Storage Sleeve & Microfiber Cloth',
    price: 19.50,
    image: ASSETS.quickViewAlt
  };
  const addon2 = {
    id: 992,
    title: 'Precision Port Cleaning & Maintenance Kit',
    price: 14.99,
    image: ASSETS.hyperweaveCable
  };

  const bundleOriginal = activeProduct.price + (includeAddon1 ? addon1.price : 0) + (includeAddon2 ? addon2.price : 0);
  const bundleDiscount = includeAddon1 && includeAddon2 ? 12.00 : 0;
  const bundleTotal = bundleOriginal - bundleDiscount;

  const handleAddToCart = () => {
    onAddToCart(
      {
        ...activeProduct,
        price: unitPrice
      },
      quantity,
      `${selectedVariant}${hasProtection ? ' • Protection+' : ''}`
    );
    setBtnFeedback(true);
    setTimeout(() => {
      setBtnFeedback(false);
      onOpenCart();
    }, 400);
  };

  const handleBuyNow = () => {
    onAddToCart(
      {
        ...activeProduct,
        price: unitPrice
      },
      quantity,
      selectedVariant
    );
    onNavigate('checkout');
  };

  const handleAddBundle = () => {
    onAddToCart(activeProduct, 1, `${selectedVariant} • Bundle Tier`);
    if (includeAddon1) {
      onAddCustomCartItem({
        id: addon1.id,
        title: addon1.title,
        sku: 'LM-ACC-BD01',
        price: addon1.price,
        quantity: 1,
        image: addon1.image,
        subtitle: 'Protective Packaging Essential'
      });
    }
    if (includeAddon2) {
      onAddCustomCartItem({
        id: addon2.id,
        title: addon2.title,
        sku: 'LM-ACC-BD02',
        price: addon2.price,
        quantity: 1,
        image: addon2.image,
        subtitle: 'Lab Calibration & Care'
      });
    }
    onOpenCart();
  };

  // Find related products in the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === activeProduct.category && p.id !== activeProduct.id
  ).slice(0, 4);

  // If fewer than 4, fill with featured products
  const displayRelated = relatedProducts.length >= 2
    ? relatedProducts
    : [...relatedProducts, ...PRODUCTS.filter(p => p.id !== activeProduct.id && !relatedProducts.some(r => r.id === p.id)).slice(0, 4 - relatedProducts.length)];

  const specsList = activeProduct.specs
    ? Object.entries(activeProduct.specs)
    : [
        ['Manufacturing Standard', 'ISO-9001 Telemetry Certified'],
        ['Material Architecture', 'High-Grade Composite & Recycled Alloy'],
        ['Warranty Term', '12 Months Limited Depot Warranty'],
        ['Compliance', 'FCC, CE, RoHS Compliant'],
        ['Depot Stock Location', 'Austin Central Hub & West Hub']
      ];

  return (
    <div className="w-full flex flex-col bg-[#131315] text-[#e5e1e4]">
      {/* Top Status & Breadcrumb */}
      <section className="w-full bg-[#0e0e10] px-4 md:px-14 py-3 border-b border-[#2a2a2c]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[#c7c4d7] uppercase tracking-widest text-[11px] overflow-x-auto py-1">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#c0c1ff] transition-colors whitespace-nowrap cursor-pointer"
            >
              Catalog
            </button>
            <span className="text-[#908fa0]">&gt;</span>
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#c0c1ff] transition-colors whitespace-nowrap cursor-pointer"
            >
              {activeProduct.category}
            </button>
            <span className="text-[#908fa0]">&gt;</span>
            <span className="text-[#e5e1e4] font-bold truncate max-w-[200px] sm:max-w-xs">
              {activeProduct.title}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#2a2a2c] text-[#4edea3] font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 border border-[#464554]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
              Verified Spec
            </span>
            <span className="text-[#c7c4d7] font-mono text-[11px]">{activeProduct.sku}</span>
          </div>
        </div>
      </section>

      {/* Main Showcase Bento Grid */}
      <section className="w-full px-4 md:px-14 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Gallery & Engineering Views (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Display Frame */}
            <div className="relative bg-[#0e0e10] p-4 border border-[#464554] overflow-hidden group">
              {/* Badges on Top Left */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                <span className="bg-[#353437]/90 backdrop-blur-md px-2 py-0.5 text-[#e5e1e4] font-mono text-[10px] uppercase tracking-widest border border-[#464554]">
                  {activeProduct.category} // {activeProduct.sku}
                </span>
                {activeProduct.tag && (
                  <span className="bg-[#4edea3]/20 text-[#4edea3] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 border border-[#4edea3]/40">
                    <span className="w-1.5 h-1.5 bg-[#4edea3] inline-block"></span>
                    {activeProduct.tag}
                  </span>
                )}
              </div>

              {/* Action Buttons on Top Right */}
              <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`px-2.5 py-1 text-xs font-mono transition-all flex items-center gap-1.5 border border-[#464554] cursor-pointer ${
                    isZoomed
                      ? 'bg-[#c0c1ff] text-[#1000a9] font-bold'
                      : 'bg-[#2a2a2c]/90 text-[#e5e1e4] hover:bg-[#c0c1ff] hover:text-[#1000a9]'
                  }`}
                  title="Toggle Zoom Inspection"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isZoomed ? 'zoom_out' : 'zoom_in'}
                  </span>
                  <span className="text-[10px] uppercase font-mono">
                    {isZoomed ? 'Active Zoom' : '2.5x Zoom'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleWishlist?.(activeProduct.id)}
                  className={`p-1.5 border border-[#464554] transition-colors cursor-pointer ${
                    isFavorite
                      ? 'bg-[#ffdad6] text-[#93000a]'
                      : 'bg-[#2a2a2c]/90 text-[#e5e1e4] hover:text-[#ffb4ab]'
                  }`}
                  title={isFavorite ? 'Saved to Wishlist' : 'Add to Wishlist'}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isFavorite ? 'favorite' : 'favorite_border'}
                  </span>
                </button>
              </div>

              {/* Main Image Viewport */}
              <div
                className="w-full h-80 sm:h-[480px] bg-[#201f22] flex items-center justify-center relative overflow-hidden cursor-crosshair select-none"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  alt={galleryImages[activeAngleIndex]?.alt || activeProduct.title}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isZoomed ? 'scale-150' : 'group-hover:scale-105'
                  }`}
                  src={galleryImages[activeAngleIndex]?.src || activeProduct.image}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = ASSETS.quickViewAlt;
                  }}
                />

                {/* Technical Monoline Registration Marks Overlay */}
                <div className="absolute inset-4 pointer-events-none flex flex-col justify-between">
                  <div className="flex justify-between text-[#908fa0] text-[10px] font-mono select-none">
                    <span>+ SPEC-REF // {activeProduct.sku}</span>
                    <span>DEPOT-STATUS // {activeProduct.inStock ? 'ACTIVE' : 'BACKORDER'}</span>
                  </div>
                  <div className="flex justify-between items-end text-[#908fa0] text-[10px] font-mono select-none">
                    <span>FOV 45° // OPTICAL-CAL</span>
                    <span>+ L-AXIS ALIGNED</span>
                  </div>
                </div>
              </div>

              {/* Technical Spec Banner Decorator */}
              <div className="mt-3 bg-[#1c1b1d] p-3 flex items-center justify-between border border-[#2a2a2c]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4edea3] text-base">
                    verified_user
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#e5e1e4]">
                    Depot Quality Verified
                  </span>
                </div>
                <span className="font-mono text-xs text-[#c0c1ff]">
                  Item ID #{activeProduct.id.toString().padStart(4, '0')}
                </span>
                <span className="font-mono text-xs text-[#4edea3]">
                  Ready For Dispatch
                </span>
              </div>
            </div>

            {/* Thumbnail Selector Angle Rack */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveAngleIndex(idx)}
                  className={`bg-[#1c1b1d] p-1.5 border transition-all text-left cursor-pointer ${
                    activeAngleIndex === idx
                      ? 'border-[#c0c1ff] ring-1 ring-[#c0c1ff] opacity-100'
                      : 'border-[#464554] opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="h-16 sm:h-20 bg-[#201f22] overflow-hidden">
                    <img
                      alt={img.label}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      src={img.src}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = ASSETS.quickViewAlt;
                      }}
                    />
                  </div>
                  <span className="block mt-1 font-mono text-[10px] text-center text-[#c7c4d7] uppercase tracking-wider truncate">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Buy Box & Configuration Terminal (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Header Info Card */}
            <div className="bg-[#0e0e10] p-6 border border-[#464554] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#bdc2ff] tracking-widest uppercase">
                  DEPARTMENT // {activeProduct.category}
                </span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] border border-[#00a572]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
                    {activeProduct.inStock ? 'In Stock: Express Dispatch' : 'Backorder'}
                  </span>
                </div>
              </div>

              <h1 className="font-headline text-2xl sm:text-3xl text-[#e5e1e4] tracking-tight uppercase leading-tight font-bold">
                {activeProduct.title}
              </h1>

              {/* Reviews and Rating */}
              <div className="flex items-center gap-3 text-[#c7c4d7]">
                <div className="flex items-center text-[#4edea3]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="material-symbols-outlined text-[18px]">
                      {star <= Math.floor(activeProduct.rating)
                        ? 'star'
                        : star - activeProduct.rating < 1
                        ? 'star_half'
                        : 'star_outline'}
                    </span>
                  ))}
                </div>
                <span className="font-mono font-bold text-[#e5e1e4] text-sm">
                  {activeProduct.rating.toFixed(1)}
                </span>
                <span className="text-[#908fa0] text-xs font-mono">
                  ({activeProduct.reviews} peer reviews)
                </span>
              </div>

              {/* Pricing Block */}
              <div className="pt-2 bg-[#1c1b1d] p-4 border border-[#2a2a2c] flex items-end justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline text-3xl font-mono text-[#c0c1ff] font-bold tracking-tight">
                      ${activeProduct.price.toFixed(2)}
                    </span>
                    {activeProduct.originalPrice && (
                      <span className="font-mono text-sm text-[#908fa0] line-through">
                        ${activeProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {activeProduct.originalPrice && (
                    <span className="font-mono text-[11px] text-[#4edea3] uppercase tracking-wider font-bold block mt-1">
                      Direct Hub Rebate — Save ${(activeProduct.originalPrice - activeProduct.price).toFixed(2)} (
                      {Math.round(((activeProduct.originalPrice - activeProduct.price) / activeProduct.originalPrice) * 100)}% OFF)
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-[#908fa0] text-right leading-tight">
                  TAX COMPUTED<br />AT TERMINAL
                </span>
              </div>

              {/* Product Brief Description */}
              <p className="text-xs text-[#c7c4d7] leading-relaxed pt-1">
                {activeProduct.description}
              </p>
            </div>

            {/* Customizer Configuration Panel */}
            <div className="bg-[#0e0e10] p-6 border border-[#464554] flex flex-col gap-4">
              {/* Variant Selector */}
              {activeProduct.variants && activeProduct.variants.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs uppercase">
                    <span className="text-[#e5e1e4]">Selected Configuration / Variant:</span>
                    <span className="text-[#c0c1ff] font-bold">{selectedVariant}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {activeProduct.variants.map((variant) => (
                      <button
                        key={variant}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-2 bg-[#201f22] border font-mono text-xs text-center transition-all cursor-pointer truncate ${
                          selectedVariant === variant
                            ? 'border-[#c0c1ff] ring-1 ring-[#c0c1ff] text-[#c0c1ff] font-bold'
                            : 'border-[#464554] text-[#e5e1e4] hover:bg-[#2a2a2c]'
                        }`}
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Protection Plan Addon */}
              <div
                className={`p-3 border flex items-start gap-3 cursor-pointer transition-colors ${
                  hasProtection
                    ? 'bg-[#201f22] border-[#c0c1ff]'
                    : 'bg-[#1c1b1d] border-[#464554] hover:border-[#908fa0]'
                }`}
                onClick={() => setHasProtection(!hasProtection)}
              >
                <input
                  checked={hasProtection}
                  onChange={(e) => setHasProtection(e.target.checked)}
                  className="mt-1 accent-[#c0c1ff] w-4 h-4 cursor-pointer"
                  type="checkbox"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-headline text-xs text-[#e5e1e4] font-bold uppercase">
                      {protectionLabel}
                    </span>
                    <span className="font-mono text-[#c0c1ff] font-bold text-xs">
                      +${protectionPlanCost.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#908fa0] mt-0.5">
                    Accidental damage, extended warranty, wear coverage &amp; priority express swap.
                  </p>
                </div>
              </div>

              {/* Stepper & Dynamic Add-to-Cart Pipeline */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center gap-2">
                  {/* Stepper */}
                  <div className="flex items-center bg-[#201f22] border border-[#464554]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-11 flex items-center justify-center text-[#e5e1e4] hover:bg-[#2a2a2c] font-mono text-base font-bold transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-[#c0c1ff]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-11 flex items-center justify-center text-[#e5e1e4] hover:bg-[#2a2a2c] font-mono text-base font-bold transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add To Cart CTA */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 h-11 bg-[#c0c1ff] text-[#1000a9] font-headline text-xs md:text-sm uppercase font-bold tracking-wider hover:bg-[#8083ff] hover:text-[#0d0096] transition-all flex items-center justify-center gap-2 shadow-md border border-[#c0c1ff] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">
                      {btnFeedback ? 'check_circle' : 'shopping_cart'}
                    </span>
                    <span>
                      {btnFeedback
                        ? 'Added to Manifest'
                        : `Add to Cart // $${totalPrice.toFixed(2)}`}
                    </span>
                  </button>
                </div>

                {/* Instant 1-Click Buy */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full h-11 bg-[#201f22] hover:bg-[#2a2a2c] text-[#e5e1e4] border border-[#464554] font-headline text-xs md:text-sm uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#4edea3] text-base">
                    bolt
                  </span>
                  Buy Now with 1-Click Fast Checkout
                </button>
              </div>

              {/* Service Level Assurances */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] sm:text-[11px] font-mono text-[#908fa0] border-t border-[#2a2a2c]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#4edea3] text-sm">
                    local_shipping
                  </span>
                  <span>Free 2-Day Air</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#4edea3] text-sm">
                    cycle
                  </span>
                  <span>30-Day Window</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#4edea3] text-sm">
                    verified
                  </span>
                  <span>Depot Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs & Engineering Benchmark Tabs Section */}
      <section className="w-full bg-[#1c1b1d] px-4 md:px-14 py-12 my-6 border-t border-b border-[#2a2a2c]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Tab Header Strip */}
          <div className="flex flex-wrap items-center gap-2 bg-[#0e0e10] p-2 border border-[#464554]">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 font-headline text-xs uppercase font-bold transition-all border cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-[#c0c1ff] text-[#1000a9] border-[#c0c1ff]'
                  : 'text-[#c7c4d7] hover:text-[#e5e1e4] border-transparent'
              }`}
            >
              01 // Technical Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('features')}
              className={`px-4 py-2 font-headline text-xs uppercase font-bold transition-all border cursor-pointer ${
                activeTab === 'features'
                  ? 'bg-[#c0c1ff] text-[#1000a9] border-[#c0c1ff]'
                  : 'text-[#c7c4d7] hover:text-[#e5e1e4] border-transparent'
              }`}
            >
              02 // Engineering &amp; Architecture
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 font-headline text-xs uppercase font-bold transition-all border flex items-center gap-2 cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-[#c0c1ff] text-[#1000a9] border-[#c0c1ff]'
                  : 'text-[#c7c4d7] hover:text-[#e5e1e4] border-transparent'
              }`}
            >
              <span>03 // Verified Reviews</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#4edea3] text-[#003824] font-mono font-bold">
                {activeProduct.reviews}
              </span>
            </button>
          </div>

          {/* TAB 1: Specs Table */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#0e0e10] p-6 border border-[#464554] flex flex-col gap-3">
                <span className="font-headline text-base text-[#c0c1ff] uppercase font-bold">
                  Telemetry &amp; Build Characteristics
                </span>
                <div className="flex flex-col text-xs font-mono divide-y divide-[#2a2a2c]">
                  {specsList.map(([key, val]) => (
                    <div key={key} className="py-2.5 flex justify-between gap-4">
                      <span className="text-[#c7c4d7]">{key}</span>
                      <span className="text-[#e5e1e4] font-bold text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0e0e10] p-6 border border-[#464554] flex flex-col gap-3">
                <span className="font-headline text-base text-[#4edea3] uppercase font-bold">
                  Quality &amp; Logistics Certification
                </span>
                <div className="flex flex-col text-xs font-mono divide-y divide-[#2a2a2c]">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#c7c4d7]">Department Index</span>
                    <span className="text-[#e5e1e4] font-bold">{activeProduct.category}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#c7c4d7]">Catalog SKU</span>
                    <span className="text-[#e5e1e4] font-bold">{activeProduct.sku}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#c7c4d7]">Stock Status</span>
                    <span className="text-[#4edea3] font-bold">{activeProduct.inStock ? 'Depot Ready' : 'Backordered'}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#c7c4d7]">Package Dimensions</span>
                    <span className="text-[#e5e1e4] font-bold">Precision Molded Eco-Carton</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#c7c4d7]">Dispatch Courier</span>
                    <span className="text-[#e5e1e4] font-bold">Express Air / Priority Courier</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Architecture */}
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0e0e10] p-6 border border-[#464554] flex flex-col justify-between space-y-4">
                <div>
                  <span className="material-symbols-outlined text-[#c0c1ff] text-3xl mb-2">
                    architecture
                  </span>
                  <h3 className="font-headline text-base text-[#e5e1e4] uppercase font-bold">
                    Precision Engineered
                  </h3>
                  <p className="text-xs text-[#c7c4d7] mt-2 leading-relaxed">
                    Fabricated to rigorous quality thresholds using sustainably sourced components, modular sub-assemblies, and high durability materials.
                  </p>
                </div>
                <div className="pt-2 font-mono text-[11px] text-[#4edea3] flex items-center gap-1 border-t border-[#2a2a2c]">
                  <span className="w-1.5 h-1.5 bg-[#4edea3]"></span> FACTORY TOLERANCE CALIBRATED
                </div>
              </div>

              <div className="bg-[#0e0e10] p-6 border border-[#464554] flex flex-col justify-between space-y-4">
                <div>
                  <span className="material-symbols-outlined text-[#c0c1ff] text-3xl mb-2">
                    eco
                  </span>
                  <h3 className="font-headline text-base text-[#e5e1e4] uppercase font-bold">
                    Sustainable Lifecycle
                  </h3>
                  <p className="text-xs text-[#c7c4d7] mt-2 leading-relaxed">
                    Designed for circular maintenance, minimal packaging footprint, and long-term modular usability across daily demanding routines.
                  </p>
                </div>
                <div className="pt-2 font-mono text-[11px] text-[#4edea3] flex items-center gap-1 border-t border-[#2a2a2c]">
                  <span className="w-1.5 h-1.5 bg-[#4edea3]"></span> 100% RECYCLABLE TRANSIT PACK
                </div>
              </div>

              <div className="bg-[#0e0e10] p-6 border border-[#464554] flex flex-col justify-between space-y-4">
                <div>
                  <span className="material-symbols-outlined text-[#c0c1ff] text-3xl mb-2">
                    verified
                  </span>
                  <h3 className="font-headline text-base text-[#e5e1e4] uppercase font-bold">
                    Depot Guarantee
                  </h3>
                  <p className="text-xs text-[#c7c4d7] mt-2 leading-relaxed">
                    Every unit undergoes optical and operational telemetry checks before dispatch, with full support and seamless 30-day exchange.
                  </p>
                </div>
                <div className="pt-2 font-mono text-[11px] text-[#4edea3] flex items-center gap-1 border-t border-[#2a2a2c]">
                  <span className="w-1.5 h-1.5 bg-[#4edea3]"></span> 30-DAY ZERO PENALTY RETURN
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-6">
              <div className="bg-[#0e0e10] p-6 border border-[#464554] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-[#201f22] border border-[#2a2a2c]">
                  <span className="font-headline text-4xl font-mono text-[#c0c1ff] font-bold">
                    {activeProduct.rating.toFixed(1)}
                  </span>
                  <div className="flex text-[#4edea3] my-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-lg">star</span>
                    ))}
                  </div>
                  <span className="text-xs text-[#c7c4d7] font-mono">
                    Based on {activeProduct.reviews} Verified Buyers
                  </span>
                  <span className="mt-1 text-[11px] font-mono text-[#4edea3]">
                    97% Recommendation Quotient
                  </span>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-2 font-mono text-xs">
                  {[
                    { stars: '5 Star', pct: '86%', barColor: 'bg-[#4edea3]' },
                    { stars: '4 Star', pct: '11%', barColor: 'bg-[#c0c1ff]' },
                    { stars: '3 Star', pct: '2%', barColor: 'bg-[#908fa0]' },
                    { stars: '2 Star', pct: '1%', barColor: 'bg-[#464554]' },
                    { stars: '1 Star', pct: '0%', barColor: 'bg-[#464554]' },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3">
                      <span className="w-14 text-[#c7c4d7]">{row.stars}</span>
                      <div className="flex-1 h-3 bg-[#201f22] border border-[#2a2a2c] overflow-hidden">
                        <div
                          className={`h-full ${row.barColor}`}
                          style={{ width: row.pct }}
                        ></div>
                      </div>
                      <span className="w-12 text-right text-[#e5e1e4] font-bold">
                        {row.pct}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0e0e10] p-5 border border-[#464554] flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#2a2a2c] border border-[#464554] flex items-center justify-center font-mono font-bold text-[#c0c1ff] text-xs">
                          AL
                        </div>
                        <div>
                          <span className="text-xs text-[#e5e1e4] font-bold">Alex Lindqvist</span>
                          <span className="block text-[10px] font-mono text-[#908fa0]">
                            Verified Buyer // 2 weeks ago
                          </span>
                        </div>
                      </div>
                      <span className="text-[#4edea3] font-mono text-xs">★ 5.0</span>
                    </div>
                    <p className="text-xs text-[#c7c4d7] mt-3 leading-relaxed">
                      "Exceeded all expectations. The tactile feel and build precision match high-end studio gear. Delivery was prompt and tracking updates were super clear."
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-[#908fa0] border-t border-[#2a2a2c] pt-2">
                    CONFIGURED: {selectedVariant || 'Standard'}
                  </span>
                </div>

                <div className="bg-[#0e0e10] p-5 border border-[#464554] flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#2a2a2c] border border-[#464554] flex items-center justify-center font-mono font-bold text-[#4edea3] text-xs">
                          TM
                        </div>
                        <div>
                          <span className="text-xs text-[#e5e1e4] font-bold">Taylor Mercer</span>
                          <span className="block text-[10px] font-mono text-[#908fa0]">
                            Verified Buyer // 1 month ago
                          </span>
                        </div>
                      </div>
                      <span className="text-[#4edea3] font-mono text-xs">★ 5.0</span>
                    </div>
                    <p className="text-xs text-[#c7c4d7] mt-3 leading-relaxed">
                      "Remarkable attention to detail. Materials are clean, robust, and comfortable. Highly recommend Lumina Goods for anyone seeking no-nonsense performance."
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-[#908fa0] border-t border-[#2a2a2c] pt-2">
                    CONFIGURED: {selectedVariant || 'Standard'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Frequently Bought Together Bundle */}
      <section className="w-full px-4 md:px-14 py-8 max-w-7xl mx-auto">
        <div className="bg-[#0e0e10] p-6 border border-[#464554]">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-[#2a2a2c] gap-2">
            <div>
              <span className="text-[10px] font-mono text-[#4edea3] uppercase tracking-widest font-bold">
                Depot Bundle Package
              </span>
              <h2 className="font-headline text-lg md:text-xl text-[#e5e1e4] uppercase font-bold tracking-tight">
                Frequently Bought Together
              </h2>
            </div>
            <div className="text-left md:text-right font-mono text-xs text-[#c7c4d7]">
              Save an additional <span className="text-[#4edea3] font-bold">$12.00</span> with combined shipping
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* 3 Products Triad (8 cols) */}
            <div className="lg:col-span-8 flex flex-col md:flex-row items-center gap-3">
              {/* Item 1: Main Product */}
              <div className="w-full md:w-1/3 bg-[#201f22] p-3 border border-[#464554] flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-[#1c1b1d] border border-[#2a2a2c] flex items-center justify-center mb-2 overflow-hidden">
                  <img
                    alt={activeProduct.title}
                    className="w-full h-full object-cover"
                    src={activeProduct.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = ASSETS.quickViewAlt;
                    }}
                  />
                </div>
                <span className="text-xs text-[#e5e1e4] font-bold truncate w-full">
                  {activeProduct.title}
                </span>
                <span className="font-mono text-xs text-[#c0c1ff] font-bold mt-1">
                  ${activeProduct.price.toFixed(2)}
                </span>
                <span className="text-[10px] font-mono text-[#4edea3] uppercase mt-0.5">
                  Primary Selection
                </span>
              </div>

              <span className="font-headline text-xl text-[#908fa0] font-bold select-none">+</span>

              {/* Item 2: Addon 1 */}
              <div className="w-full md:w-1/3 bg-[#201f22] p-3 border border-[#464554] flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-[#1c1b1d] border border-[#2a2a2c] flex items-center justify-center mb-2 overflow-hidden">
                  <img
                    alt={addon1.title}
                    className="w-full h-full object-cover"
                    src={addon1.image}
                  />
                </div>
                <span className="text-xs text-[#e5e1e4] font-bold truncate w-full">
                  Storage Sleeve &amp; Cloth
                </span>
                <span className="font-mono text-xs text-[#e5e1e4] font-bold mt-1">
                  ${addon1.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <input
                    checked={includeAddon1}
                    onChange={(e) => setIncludeAddon1(e.target.checked)}
                    className="accent-[#c0c1ff] w-3.5 h-3.5 cursor-pointer"
                    id="bundle-addon1-chk"
                    type="checkbox"
                  />
                  <label htmlFor="bundle-addon1-chk" className="text-[10px] font-mono text-[#c7c4d7] uppercase cursor-pointer">
                    Include
                  </label>
                </div>
              </div>

              <span className="font-headline text-xl text-[#908fa0] font-bold select-none">+</span>

              {/* Item 3: Addon 2 */}
              <div className="w-full md:w-1/3 bg-[#201f22] p-3 border border-[#464554] flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-[#1c1b1d] border border-[#2a2a2c] flex items-center justify-center mb-2 overflow-hidden">
                  <img
                    alt={addon2.title}
                    className="w-full h-full object-cover"
                    src={addon2.image}
                  />
                </div>
                <span className="text-xs text-[#e5e1e4] font-bold truncate w-full">
                  Precision Cleaning Kit
                </span>
                <span className="font-mono text-xs text-[#e5e1e4] font-bold mt-1">
                  ${addon2.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <input
                    checked={includeAddon2}
                    onChange={(e) => setIncludeAddon2(e.target.checked)}
                    className="accent-[#c0c1ff] w-3.5 h-3.5 cursor-pointer"
                    id="bundle-addon2-chk"
                    type="checkbox"
                  />
                  <label htmlFor="bundle-addon2-chk" className="text-[10px] font-mono text-[#c7c4d7] uppercase cursor-pointer">
                    Include
                  </label>
                </div>
              </div>
            </div>

            {/* Pricing & CTA Box (4 cols) */}
            <div className="lg:col-span-4 bg-[#201f22] p-5 border border-[#464554] flex flex-col justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#908fa0]">
                  Aggregated Telemetry
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-headline text-2xl font-mono font-bold text-[#c0c1ff]">
                    ${bundleTotal.toFixed(2)}
                  </span>
                  {bundleDiscount > 0 && (
                    <span className="font-mono text-sm text-[#908fa0] line-through">
                      ${bundleOriginal.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#4edea3] font-mono mt-1">
                  {bundleDiscount > 0
                    ? 'Direct kit rebate applied automatically.'
                    : 'Select both accessories for $12.00 unified rebate.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddBundle}
                className="w-full py-2.5 bg-[#4edea3] text-[#003824] font-headline text-xs uppercase font-bold tracking-wider hover:bg-[#6ffbbe] transition-colors flex items-center justify-center gap-2 shadow-md border border-[#4edea3] cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">inventory_2</span>
                <span>Add Bundle to Manifest</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="w-full px-4 md:px-14 py-12 max-w-7xl mx-auto border-t border-[#2a2a2c]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#4edea3] font-mono text-xs uppercase tracking-widest mb-1">
              <span className="w-2 h-2 bg-[#4edea3]"></span>
              Curated Recommendations
            </div>
            <h2 className="font-headline text-2xl text-[#e5e1e4] font-bold uppercase tracking-tight">
              Related In {activeProduct.category}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-mono text-[#c0c1ff] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Explore All 60 Inventory Items</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayRelated.map((relProduct) => (
            <div
              key={relProduct.id}
              className="bg-[#1c1b1d] border border-[#464554] p-4 flex flex-col justify-between group hover:border-[#c0c1ff] transition-all"
            >
              <div>
                <div
                  className="w-full h-44 bg-[#201f22] overflow-hidden mb-3 relative cursor-pointer"
                  onClick={() => {
                    onSelectProductForPDP?.(relProduct);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <img
                    src={relProduct.image}
                    alt={relProduct.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = ASSETS.quickViewAlt;
                    }}
                  />
                  {relProduct.tag && (
                    <span className="absolute top-2 left-2 bg-[#0e0e10]/90 text-[#4edea3] text-[9px] font-mono px-1.5 py-0.5 border border-[#4edea3]/40 uppercase">
                      {relProduct.tag}
                    </span>
                  )}
                  {relProduct.originalPrice && (
                    <span className="absolute top-2 right-2 bg-[#93000a] text-[#ffdad6] text-[9px] font-mono font-bold px-1.5 py-0.5">
                      -{Math.round(((relProduct.originalPrice - relProduct.price) / relProduct.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-mono text-[#908fa0] uppercase tracking-wider mb-1">
                  {relProduct.category}
                </div>
                <h4
                  onClick={() => {
                    onSelectProductForPDP?.(relProduct);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-headline text-sm font-bold text-[#e5e1e4] group-hover:text-[#c0c1ff] transition-colors cursor-pointer truncate"
                  title={relProduct.title}
                >
                  {relProduct.title}
                </h4>

                <div className="flex items-center gap-2 mt-2">
                  <span className="font-mono text-base font-bold text-[#c0c1ff]">
                    ${relProduct.price.toFixed(2)}
                  </span>
                  {relProduct.originalPrice && (
                    <span className="font-mono text-xs text-[#908fa0] line-through">
                      ${relProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#2a2a2c] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(relProduct, 1);
                  }}
                  className="flex-1 py-1.5 bg-[#201f22] hover:bg-[#c0c1ff] hover:text-[#1000a9] text-[#e5e1e4] font-headline text-xs uppercase font-bold tracking-wider border border-[#464554] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">shopping_cart</span>
                  <span>Add</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectProductForPDP?.(relProduct);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1.5 bg-[#201f22] hover:bg-[#2a2a2c] text-[#c7c4d7] hover:text-[#e5e1e4] border border-[#464554] text-xs font-mono transition-colors cursor-pointer"
                  title="View Details"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
