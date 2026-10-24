import { useState } from 'react';
import { ScreenType, Product, CartItem, OrderState } from './types';
import { INITIAL_CART, PRODUCTS, ASSETS } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { Toast, ToastMessage } from './components/Toast';
import { HomeScreen } from './components/screens/HomeScreen';
import { PDPScreen } from './components/screens/PDPScreen';
import { CheckoutScreen } from './components/screens/CheckoutScreen';
import { OrderConfirmationScreen } from './components/screens/OrderConfirmationScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([1, 14, 28, 45]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedPdpProduct, setSelectedPdpProduct] = useState<Product>(PRODUCTS[0]);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Order state initialized with realistic data matching Screen 4
  const [order, setOrder] = useState<OrderState>({
    orderNumber: 'LUM-84920',
    date: 'Oct 21, 2024 · 09:14 AM',
    customerEmail: 'alex.turner@aggiecampus.edu',
    customerPhone: '+1 (555) 839-2041',
    customerName: 'Alex Turner',
    shippingAddress: '124 University Ave, Suite 3B',
    suite: 'Campus Dorm Hub #4, Room 314',
    city: 'College Station',
    state: 'TX',
    zip: '77840',
    dispatchMethod: 'Priority Campus Courier',
    trackingNumber: 'LM-9920-8841-USPS',
    items: [
      {
        id: 101,
        title: 'Aether-9 Studio Headset',
        sku: 'LM-ATH-09B',
        price: 129.00,
        quantity: 1,
        image: ASSETS.aetherHeadset,
        subtitle: 'Planar magnetic drivers with ultra-low latency DAC bridge.'
      },
      {
        id: 102,
        title: 'Apex Monolith Keyset Pod',
        sku: 'LM-APX-K01',
        price: 62.20,
        quantity: 1,
        image: ASSETS.apexKeyset,
        subtitle: 'CNC milled aluminum switch dock with macro thumb-rotary.'
      },
      {
        id: 103,
        title: 'HyperWeave Braided Cable 2.0m',
        sku: 'LM-CAB-20M',
        price: 24.01,
        quantity: 1,
        image: ASSETS.hyperweaveCable,
        subtitle: 'Kevlar-reinforced high-speed telemetry link wire with e-marker IC.'
      }
    ],
    subtotal: 215.21,
    discount: 51.12,
    shipping: 0,
    tax: 0,
    grandTotal: 164.09,
    paymentMethod: 'Visa •••• 4242',
    cardLast4: '4242'
  });

  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (title: string, description: string) => {
    const newToast: ToastMessage = {
      id: Date.now(),
      title,
      description
    };
    setToast(newToast);
    setTimeout(() => {
      setToast((current) => (current?.id === newToast.id ? null : current));
    }, 3200);
  };

  const handleSelectProductForPDP = (product: Product) => {
    setSelectedPdpProduct(product);
    navigateTo('pdp');
  };

  const handleToggleWishlist = (productId: number) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Wishlist Updated', `Removed ${product ? product.title : 'item'} from saved list.`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Wishlist Saved', `Saved ${product ? product.title : 'item'} for later review.`);
        return [...prev, productId];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
    showToast('Wishlist Updated', 'Item removed from saved list.');
  };

  const handleAddToCart = (product: Product, quantity: number = 1, variant?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            title: product.title,
            sku: product.sku,
            price: product.price,
            quantity,
            image: product.image,
            subtitle: variant || product.category
          }
        ];
      }
    });

    showToast(
      product.title,
      `Loaded to telemetry manifest (${quantity}x) • $${(product.price * quantity).toFixed(2)}`
    );
  };

  const handleAddCustomCartItem = (customItem: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === customItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === customItem.id ? { ...item, quantity: item.quantity + customItem.quantity } : item
        );
      } else {
        return [...prev, customItem];
      }
    });

    showToast(
      customItem.title,
      `Bundle accessory included • $${customItem.price.toFixed(2)}`
    );
  };

  const handleUpdateQty = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item Disengaged', 'Removed from active telemetry cart.');
  };

  const handleOrderComplete = (data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    suite: string;
    city: string;
    state: string;
    zip: string;
    dispatchMethod: string;
    paymentMethod: string;
    cardLast4: string;
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    grandTotal: number;
  }) => {
    const updatedOrder: OrderState = {
      orderNumber: 'LUM-' + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) + ' · ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      shippingAddress: data.address,
      suite: data.suite,
      city: data.city,
      state: data.state,
      zip: data.zip,
      dispatchMethod: data.dispatchMethod,
      trackingNumber: 'LM-9920-' + Math.floor(1000 + Math.random() * 9000) + '-USPS',
      items: cartItems.length > 0 ? [...cartItems] : order.items,
      subtotal: data.subtotal,
      discount: data.discount,
      shipping: data.shipping,
      tax: data.tax,
      grandTotal: data.grandTotal,
      paymentMethod: data.paymentMethod,
      cardLast4: data.cardLast4
    };

    setOrder(updatedOrder);
    setCartItems([]);
    showToast('Order Authorized', `Manifest #${updatedOrder.orderNumber} successfully locked.`);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#131315] text-[#e5e1e4] flex flex-col font-sans selection:bg-[#c0c1ff] selection:text-[#1000a9]">
      {/* Top Fixed Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategoryFilter={(cat) => setSelectedCategory(cat)}
      />

      {/* Main Content Area (padding-top accounts for header + router bar) */}
      <main className="flex-1 w-full pt-24 md:pt-28">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={navigateTo}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist}
            onSelectProductForPDP={handleSelectProductForPDP}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}

        {currentScreen === 'pdp' && (
          <PDPScreen
            product={selectedPdpProduct}
            onNavigate={navigateTo}
            onAddToCart={handleAddToCart}
            onAddCustomCartItem={handleAddCustomCartItem}
            onOpenCart={() => setIsCartOpen(true)}
            onSelectProductForPDP={handleSelectProductForPDP}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist}
          />
        )}

        {currentScreen === 'checkout' && (
          <CheckoutScreen
            onNavigate={navigateTo}
            cartItems={cartItems}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onOrderComplete={handleOrderComplete}
          />
        )}

        {currentScreen === 'confirmation' && (
          <OrderConfirmationScreen
            onNavigate={navigateTo}
            order={order}
          />
        )}
      </main>

      {/* Slide-over Manifest Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => navigateTo('checkout')}
      />

      {/* Slide-over Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={PRODUCTS}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={(product) => {
          handleAddToCart(product, 1);
          setIsWishlistOpen(false);
          setIsCartOpen(true);
        }}
      />

      {/* Quick Spec Inspection Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onViewFullPDP={(prod) => {
          handleSelectProductForPDP(prod);
        }}
      />

      {/* Global Toast Feedback */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
