import React, { useState } from 'react';
import { CartItem, ScreenType } from '../../types';

interface CheckoutScreenProps {
  onNavigate: (screen: ScreenType) => void;
  cartItems: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onOrderComplete: (orderData: {
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
  }) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onNavigate,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onOrderComplete
}) => {
  // Step 1 State
  const [email, setEmail] = useState('alex.chen@polytechnic.edu');
  const [phone, setPhone] = useState('+1 (555) 839-2041');
  const [isStudentProtocol, setIsStudentProtocol] = useState(true);
  const [studentId, setStudentId] = useState('UNIV-84920-POLY');

  // Step 2 State
  const [fullName, setFullName] = useState('Alex R. Chen');
  const [suite, setSuite] = useState('West Quad Tower 3, Suite #408');
  const [address, setAddress] = useState('742 Evergreen Innovation Way');
  const [city, setCity] = useState('Cambridge');
  const [state, setState] = useState('MA');
  const [zip, setZip] = useState('02138');
  const [shippingSpeed, setShippingSpeed] = useState<number>(0); // 0 = Free Ground, 4.99 = Priority

  // Step 3 State
  const [paymentTab, setPaymentTab] = useState<'card' | 'apple' | 'paypal' | 'cash'>('card');
  const [cardNumber, setCardNumber] = useState('4242 8820 9940 9012');
  const [cardHolder, setCardHolder] = useState('ALEX R. CHEN');
  const [cardExpiry, setCardExpiry] = useState('09/28');
  const [cardCvv, setCardCvv] = useState('882');

  // Promo Code State
  const [promoInput, setPromoInput] = useState('CAMPUS25');
  const [isPromoApplied, setIsPromoApplied] = useState(true);
  const [promoRate, setPromoRate] = useState(0.25); // 25%

  // Submit / Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Financial calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const discount = isPromoApplied || isStudentProtocol ? subtotal * promoRate : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const tax = discountedSubtotal * 0.07; // 7% tech tax
  const shipping = shippingSpeed;
  const grandTotal = discountedSubtotal + tax + shipping;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    let sections: string[] = [];
    for (let i = 0; i < val.length; i += 4) {
      sections.push(val.substring(i, i + 4));
    }
    setCardNumber(sections.join(' '));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      setCardExpiry(val.substring(0, 2) + '/' + val.substring(2, 4));
    } else {
      setCardExpiry(val);
    }
  };

  const handleApplyPromo = () => {
    const val = promoInput.trim().toUpperCase();
    if (val === 'CAMPUS25') {
      setIsPromoApplied(true);
      setPromoRate(0.25);
    } else if (val === 'EXTRA10') {
      setIsPromoApplied(true);
      setPromoRate(0.10);
    } else {
      alert('Unrecognized authorization voucher. Try "CAMPUS25" or "EXTRA10"');
    }
  };

  const handleRevokePromo = () => {
    setIsPromoApplied(false);
    setIsStudentProtocol(false);
  };

  const handleAutoFillDemo = () => {
    setFullName('Jordan Taylor');
    setCardHolder('JORDAN TAYLOR');
    setAddress('100 Memorial Drive');
    setSuite('Ames Hall Room #312');
    setCity('Cambridge');
    setState('MA');
    setZip('02142');
    setEmail('jtaylor@alum.mit.edu');
    setPhone('+1 (617) 253-1000');
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onOrderComplete({
        name: fullName,
        email,
        phone,
        address,
        suite,
        city,
        state,
        zip,
        dispatchMethod: shippingSpeed === 0 ? 'Campus Ground (FREE)' : 'Priority Express ($4.99)',
        paymentMethod: paymentTab === 'card' ? 'Visa •••• 4242' : paymentTab.toUpperCase(),
        cardLast4: cardNumber.replace(/\s/g, '').slice(-4) || '4242',
        subtotal,
        discount,
        shipping,
        tax,
        grandTotal
      });
      setShowSuccessModal(true);
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col bg-[#131315] text-[#e5e1e4]">
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-14 py-8">
        {/* Breadcrumb & Telemetry Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-[#1c1b1d] p-4 border border-[#464554] shadow-sm">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#c7c4d7]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#c0c1ff] transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span> Return to Manifest
            </button>
            <span>/</span>
            <span className="text-[#4edea3] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#4edea3] inline-block animate-pulse"></span>
              Terminal 04: Secure Checkout
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-[#908fa0]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#4edea3]">verified_user</span> 256-Bit TLS End-to-End
            </span>
            <span className="hidden sm:inline-block">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">sync_saved_locally</span> Local Session ID: #LM-9021
            </span>
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Checkout Sequential Steps (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: Recipient Identification */}
            <section className="bg-[#1c1b1d] p-6 border border-[#464554] shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-4 bg-[#201f22] px-4 py-2 -mx-6 -mt-6 border-b border-[#2a2a2c]">
                <div className="flex items-center gap-3">
                  <span className="font-headline text-xs bg-[#c0c1ff] text-[#1000a9] w-6 h-6 flex items-center justify-center font-bold">
                    01
                  </span>
                  <h2 className="font-headline text-base uppercase tracking-wide text-[#e5e1e4] font-bold">
                    Recipient Identification
                  </h2>
                </div>
                <span className="font-mono text-xs uppercase text-[#4edea3] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">fingerprint</span> Verified Session
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-xs uppercase text-[#c7c4d7] flex justify-between" htmlFor="checkout-email">
                      <span>Contact Email</span>
                      <span className="text-[#c0c1ff] text-[10px]">Required</span>
                    </label>
                    <div className="relative flex items-center bg-[#0e0e10] border border-[#464554]">
                      <span className="material-symbols-outlined absolute left-3 text-[#908fa0] text-sm">
                        alternate_email
                      </span>
                      <input
                        className="w-full bg-transparent pl-9 pr-3 py-2 text-[#e5e1e4] text-xs focus:outline-none focus:bg-[#2a2a2c] transition-colors font-mono"
                        id="checkout-email"
                        placeholder="alex@campus.edu"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-xs uppercase text-[#c7c4d7] flex justify-between" htmlFor="checkout-phone">
                      <span>Mobile Telemetry</span>
                      <span className="text-[#908fa0] text-[10px]">For SMS Dispatch</span>
                    </label>
                    <div className="relative flex items-center bg-[#0e0e10] border border-[#464554]">
                      <span className="material-symbols-outlined absolute left-3 text-[#908fa0] text-sm">
                        phone_iphone
                      </span>
                      <input
                        className="w-full bg-transparent pl-9 pr-3 py-2 text-[#e5e1e4] text-xs focus:outline-none focus:bg-[#2a2a2c] transition-colors font-mono"
                        id="checkout-phone"
                        placeholder="+1 (000) 000-0000"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* College Student Protocol Toggle */}
                <div className="p-3 bg-[#201f22] border border-[#2a2a2c] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#00a572] text-[#00311f] flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-base">school</span>
                    </div>
                    <div>
                      <p className="font-headline text-xs uppercase font-bold text-[#e5e1e4]">
                        Campus Student / Academic Protocol
                      </p>
                      <p className="text-[11px] text-[#c7c4d7]">
                        Instant validation via accredited .edu credentials
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      checked={isStudentProtocol}
                      onChange={(e) => {
                        setIsStudentProtocol(e.target.checked);
                        if (e.target.checked) {
                          setIsPromoApplied(true);
                        }
                      }}
                      className="sr-only peer"
                      type="checkbox"
                    />
                    <div className="w-11 h-6 bg-[#353437] peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4edea3]"></div>
                  </label>
                </div>

                {/* Student ID Field */}
                {isStudentProtocol && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#0e0e10] p-3 border border-[#464554]">
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-mono uppercase text-[#4edea3] font-bold block mb-1">
                        Campus ID / Badge Matrix
                      </label>
                      <input
                        className="w-full bg-[#201f22] border border-[#464554] px-3 py-1.5 text-xs text-[#4edea3] font-mono focus:outline-none"
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col justify-end">
                      <div className="flex items-center gap-1 text-[#4edea3] text-xs font-mono font-bold pb-1">
                        <span className="material-symbols-outlined text-sm">task_alt</span> Verified (25% Applied)
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* STEP 2: Fulfillment & Destination */}
            <section className="bg-[#1c1b1d] p-6 border border-[#464554] shadow-md">
              <div className="flex items-center justify-between pb-3 mb-4 bg-[#201f22] px-4 py-2 -mx-6 -mt-6 border-b border-[#2a2a2c]">
                <div className="flex items-center gap-3">
                  <span className="font-headline text-xs bg-[#c0c1ff] text-[#1000a9] w-6 h-6 flex items-center justify-center font-bold">
                    02
                  </span>
                  <h2 className="font-headline text-base uppercase tracking-wide text-[#e5e1e4] font-bold">
                    Fulfillment &amp; Destination
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleAutoFillDemo}
                  className="bg-[#2a2a2c] hover:bg-[#39393b] text-[#c0c1ff] text-[10px] font-mono uppercase px-2 py-1 flex items-center gap-1 transition-colors border border-[#464554]"
                >
                  <span className="material-symbols-outlined text-xs">bolt</span> Auto-Fill Demo
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-xs uppercase text-[#c7c4d7]" htmlFor="ship-name">
                      Full Legal Name
                    </label>
                    <input
                      className="w-full bg-[#0e0e10] border border-[#464554] px-3 py-2 text-xs text-[#e5e1e4] focus:outline-none focus:bg-[#2a2a2c]"
                      id="ship-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setCardHolder(e.target.value.toUpperCase());
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-xs uppercase text-[#c7c4d7]" htmlFor="ship-suite">
                      Dorm / Suite / Lab Unit
                    </label>
                    <input
                      className="w-full bg-[#0e0e10] border border-[#464554] px-3 py-2 text-xs text-[#e5e1e4] focus:outline-none focus:bg-[#2a2a2c]"
                      id="ship-suite"
                      type="text"
                      value={suite}
                      onChange={(e) => setSuite(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-xs uppercase text-[#c7c4d7]" htmlFor="ship-address">
                    Street Physical Address
                  </label>
                  <input
                    className="w-full bg-[#0e0e10] border border-[#464554] px-3 py-2 text-xs text-[#e5e1e4] focus:outline-none focus:bg-[#2a2a2c]"
                    id="ship-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-xs uppercase text-[#c7c4d7]" htmlFor="ship-city">
                      Campus / City
                    </label>
                    <input
                      className="w-full bg-[#0e0e10] border border-[#464554] px-3 py-2 text-xs text-[#e5e1e4] focus:outline-none focus:bg-[#2a2a2c]"
                      id="ship-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-xs uppercase text-[#c7c4d7]" htmlFor="ship-state">
                      State / Region
                    </label>
                    <input
                      className="w-full bg-[#0e0e10] border border-[#464554] px-3 py-2 text-xs text-[#e5e1e4] focus:outline-none focus:bg-[#2a2a2c]"
                      id="ship-state"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-xs uppercase text-[#c7c4d7]" htmlFor="ship-zip">
                      Postal Code
                    </label>
                    <input
                      className="w-full bg-[#0e0e10] border border-[#464554] px-3 py-2 font-mono text-xs text-[#e5e1e4] focus:outline-none focus:bg-[#2a2a2c]"
                      id="ship-zip"
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                </div>

                {/* Dispatch Protocols Speed */}
                <div className="pt-2">
                  <label className="font-mono text-xs uppercase text-[#c7c4d7] block mb-2">
                    Dispatch Protocols
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`relative flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                        shippingSpeed === 0
                          ? 'bg-[#2a2a2c] border-[#c0c1ff]'
                          : 'bg-[#0e0e10] border-[#464554] hover:bg-[#201f22]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping-protocol"
                        className="mt-1 accent-[#c0c1ff]"
                        checked={shippingSpeed === 0}
                        onChange={() => setShippingSpeed(0)}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="font-headline text-xs uppercase font-bold text-[#e5e1e4]">
                            Campus Ground
                          </span>
                          <span className="font-mono text-xs uppercase text-[#4edea3] font-bold">
                            FREE
                          </span>
                        </div>
                        <p className="text-[11px] text-[#c7c4d7] leading-tight">
                          Delivery within 2-3 academic cycles to mailroom locker
                        </p>
                      </div>
                    </label>

                    <label
                      className={`relative flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                        shippingSpeed === 4.99
                          ? 'bg-[#2a2a2c] border-[#c0c1ff]'
                          : 'bg-[#0e0e10] border-[#464554] hover:bg-[#201f22]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping-protocol"
                        className="mt-1 accent-[#c0c1ff]"
                        checked={shippingSpeed === 4.99}
                        onChange={() => setShippingSpeed(4.99)}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="font-headline text-xs uppercase font-bold text-[#e5e1e4]">
                            Priority Express
                          </span>
                          <span className="font-mono text-xs uppercase text-[#c0c1ff] font-bold">
                            +$4.99
                          </span>
                        </div>
                        <p className="text-[11px] text-[#c7c4d7] leading-tight">
                          Next-morning direct locker courier dispatch with tracking
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* STEP 3: Encrypted Settlement & Payment Node */}
            <section className="bg-[#1c1b1d] p-6 border border-[#464554] shadow-md">
              <div className="flex items-center justify-between pb-3 mb-4 bg-[#201f22] px-4 py-2 -mx-6 -mt-6 border-b border-[#2a2a2c]">
                <div className="flex items-center gap-3">
                  <span className="font-headline text-xs bg-[#c0c1ff] text-[#1000a9] w-6 h-6 flex items-center justify-center font-bold">
                    03
                  </span>
                  <h2 className="font-headline text-base uppercase tracking-wide text-[#e5e1e4] font-bold">
                    Encrypted Settlement
                  </h2>
                </div>
                <div className="flex items-center gap-1 text-[#908fa0] font-mono text-[11px] uppercase">
                  <span className="material-symbols-outlined text-sm">lock</span> PCI-DSS Tier 1
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {[
                  { id: 'card', label: 'Card', icon: 'credit_card' },
                  { id: 'apple', label: 'Apple Pay', icon: 'phone_iphone' },
                  { id: 'paypal', label: 'PayPal', icon: 'account_balance_wallet' },
                  { id: 'cash', label: 'Campus COD', icon: 'payments' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPaymentTab(tab.id as any)}
                    className={`py-2 px-2 font-headline text-xs uppercase font-bold flex items-center justify-center gap-1.5 transition-colors border ${
                      paymentTab === tab.id
                        ? 'bg-[#c0c1ff] text-[#1000a9] border-[#c0c1ff]'
                        : 'bg-[#201f22] text-[#c7c4d7] border-[#464554] hover:text-[#e5e1e4]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Card Panel */}
              {paymentTab === 'card' ? (
                <div className="space-y-4">
                  {/* Neo-Brutalist Hardware Payment Card Emulator */}
                  <div className="w-full bg-gradient-to-tr from-[#0e0e10] via-[#201f22] to-[#2a2a2c] p-5 border border-[#464554] shadow-lg relative overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#c0c1ff]/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-5 bg-[#7c87f3]/40 border border-[#c0c1ff]/50 inline-block"></span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#bdc2ff]">
                          EMV CHIP
                        </span>
                      </div>
                      <div className="font-headline text-base font-bold tracking-wider text-[#c0c1ff] italic">
                        LUMINA PAY
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-[#908fa0] text-[10px] font-mono block uppercase tracking-widest mb-1">
                        Card Encrypted Telemetry
                      </span>
                      <span className="font-headline text-lg sm:text-xl tracking-widest text-[#e5e1e4] font-mono font-bold">
                        {cardNumber || '4242 •••• •••• 9012'}
                      </span>
                    </div>

                    <div className="flex justify-between items-end text-xs">
                      <div>
                        <span className="text-[#908fa0] text-[10px] font-mono block uppercase tracking-widest">
                          Cardholder Node
                        </span>
                        <span className="font-mono uppercase tracking-wider text-[#e5e1e4] font-bold">
                          {cardHolder || 'ALEX R. CHEN'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#908fa0] text-[10px] font-mono block uppercase tracking-widest">
                          Expires
                        </span>
                        <span className="font-mono text-[#4edea3] font-bold">
                          {cardExpiry || '09/28'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Inputs Form */}
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-xs uppercase text-[#c7c4d7] flex justify-between" htmlFor="card-number">
                        <span>Primary Account Number (PAN)</span>
                        <span className="text-[#4edea3] font-mono text-[11px] flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">check_circle</span> Visa / Master Verified
                        </span>
                      </label>
                      <div className="relative flex items-center bg-[#0e0e10] border border-[#464554]">
                        <span className="material-symbols-outlined absolute left-3 text-[#908fa0] text-sm">
                          credit_card
                        </span>
                        <input
                          className="w-full bg-transparent pl-9 pr-3 py-2 font-mono text-xs text-[#e5e1e4] focus:outline-none focus:bg-[#2a2a2c]"
                          id="card-number"
                          maxLength={19}
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-xs uppercase text-[#c7c4d7]" htmlFor="card-expiry">
                          Expiration Index
                        </label>
                        <input
                          className="w-full bg-[#0e0e10] border border-[#464554] px-3 py-2 font-mono text-xs text-[#e5e1e4] focus:outline-none focus:bg-[#2a2a2c]"
                          id="card-expiry"
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-xs uppercase text-[#c7c4d7] flex justify-between" htmlFor="card-cvv">
                          <span>CVV / CVC</span>
                          <span className="material-symbols-outlined text-xs text-[#908fa0]" title="3-digit security code">help</span>
                        </label>
                        <div className="relative flex items-center bg-[#0e0e10] border border-[#464554]">
                          <span className="material-symbols-outlined absolute left-3 text-[#908fa0] text-sm">
                            lock
                          </span>
                          <input
                            className="w-full bg-transparent pl-9 pr-3 py-2 font-mono text-xs text-[#e5e1e4] focus:outline-none focus:bg-[#2a2a2c]"
                            id="card-cvv"
                            maxLength={4}
                            type="password"
                            placeholder="***"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-[#0e0e10] border border-[#464554] text-center space-y-3">
                  <span className="material-symbols-outlined text-4xl text-[#4edea3]">
                    contactless
                  </span>
                  <p className="font-headline text-base text-[#e5e1e4] font-bold">
                    {paymentTab === 'apple' && 'Apple Pay Seamless Dispatch'}
                    {paymentTab === 'paypal' && 'PayPal Sandbox Gateway'}
                    {paymentTab === 'cash' && 'Campus Locker Cash on Delivery'}
                  </p>
                  <p className="text-xs text-[#c7c4d7] max-w-sm mx-auto leading-relaxed">
                    {paymentTab === 'apple' && 'Authorize one-touch biometric verification directly with your campus registered Apple Wallet.'}
                    {paymentTab === 'paypal' && 'Transfers to a 256-bit encrypted academic sandbox session to finalize institutional checkout.'}
                    {paymentTab === 'cash' && 'Deliver tender directly to the campus hub concierge desk during package retrieval. Valid student photo ID required.'}
                  </p>
                </div>
              )}

              {/* Promo Code Input Matrix */}
              <div className="mt-6 pt-4 bg-[#201f22] p-3 border border-[#464554]">
                <label className="font-mono text-xs uppercase text-[#c7c4d7] block mb-1" htmlFor="promo-input">
                  Authorization / Promo Voucher
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1 bg-[#0e0e10] border border-[#464554]">
                    <span className="material-symbols-outlined absolute left-3 top-2 text-[#908fa0] text-sm">
                      sell
                    </span>
                    <input
                      className="w-full bg-transparent pl-9 pr-3 py-1.5 font-mono text-xs uppercase text-[#e5e1e4] focus:outline-none"
                      id="promo-input"
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-[#2a2a2c] hover:bg-[#39393b] text-[#e5e1e4] font-mono text-xs uppercase px-4 py-1.5 font-bold transition-colors border border-[#464554]"
                  >
                    Apply
                  </button>
                </div>

                {/* Applied Badge */}
                {isPromoApplied && (
                  <div className="mt-2 flex items-center justify-between p-2 bg-[#4edea3]/10 border border-[#4edea3]/30">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#4edea3] text-sm">
                        verified
                      </span>
                      <span className="font-mono text-xs text-[#4edea3] font-bold">
                        CAMPUS25 APPLIED (-25% Academic Discount)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRevokePromo}
                      className="text-[#908fa0] hover:text-[#ffb4ab] text-[10px] font-mono uppercase underline"
                    >
                      Revoke
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Live Order Summary & Real-time Math Pipeline (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-[#1c1b1d] p-6 border border-[#464554] shadow-xl relative">
              {/* Top Gradient Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c0c1ff] via-[#4edea3] to-[#bdc2ff]"></div>

              <div className="flex items-center justify-between pb-3 mb-4 bg-[#201f22] px-4 py-2 -mx-6 -mt-6 border-b border-[#2a2a2c]">
                <h2 className="font-headline text-sm uppercase tracking-wide text-[#e5e1e4] flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-[#4edea3]">inventory_2</span> Manifest Summary
                </h2>
                <span className="font-mono text-[10px] bg-[#353437] px-2 py-0.5 text-[#c7c4d7] font-bold">
                  {totalItemCount} ACTIVE ITEM{totalItemCount === 1 ? '' : 'S'}
                </span>
              </div>

              {/* Cart Line Items */}
              <div className="space-y-3 pb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#0e0e10] border border-[#464554] flex gap-3 items-start relative group"
                  >
                    <div className="w-16 h-16 bg-[#201f22] shrink-0 border border-[#2a2a2c] flex items-center justify-center relative overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        alt={item.title}
                        src={item.image}
                      />
                      {item.sku && (
                        <span className="absolute bottom-0 right-0 bg-[#353437] text-[8px] font-mono px-1 text-[#c7c4d7]">
                          {item.sku}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h3 className="font-headline text-xs font-bold text-[#e5e1e4] truncate">
                          {item.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#908fa0] hover:text-[#ffb4ab] p-0.5 transition-colors shrink-0"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>

                      {item.subtitle && (
                        <p className="text-[10px] text-[#908fa0] font-mono truncate mb-1">
                          {item.subtitle}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center bg-[#201f22] border border-[#464554]">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-[#e5e1e4] hover:bg-[#39393b] font-mono text-xs"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs px-2 text-[#c0c1ff] font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#e5e1e4] hover:bg-[#39393b] font-mono text-xs"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#e5e1e4]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Telemetry Breakdown */}
              <div className="space-y-2 pt-3 bg-[#0e0e10] p-4 border border-[#464554] font-mono text-xs">
                <div className="flex justify-between text-[#c7c4d7]">
                  <span className="uppercase tracking-wider">Subtotal:</span>
                  <span className="text-[#e5e1e4] font-bold">${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#4edea3]">
                    <span className="uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">percent</span> Student (CAMPUS25):
                    </span>
                    <span className="font-bold">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#c7c4d7]">
                  <span className="uppercase tracking-wider">Locker Delivery:</span>
                  <span className="text-[#4edea3] font-bold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-[#c7c4d7]">
                  <span className="uppercase tracking-wider">Estimated Tax (7%):</span>
                  <span className="text-[#e5e1e4] font-bold">${tax.toFixed(2)}</span>
                </div>

                {/* Grand Total Highlight */}
                <div className="pt-2 mt-2 bg-[#201f22] p-3 border border-[#2a2a2c] flex justify-between items-center">
                  <div>
                    <span className="font-headline text-xs sm:text-sm text-[#e5e1e4] uppercase font-bold block">
                      Grand Total
                    </span>
                    <span className="text-[10px] text-[#908fa0] uppercase tracking-widest font-mono">
                      Net Payable USD
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline text-lg sm:text-xl font-bold text-[#c0c1ff]">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary CTA Button */}
              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  disabled={isProcessing || cartItems.length === 0}
                  onClick={handleCompleteOrder}
                  className={`w-full py-3 bg-[#c0c1ff] hover:bg-[#8083ff] text-[#1000a9] hover:text-[#0d0096] font-headline text-xs sm:text-sm uppercase font-bold tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 border border-[#c0c1ff] ${
                    isProcessing ? 'opacity-80 cursor-wait' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {isProcessing ? 'sync' : 'lock'}
                  </span>
                  <span>
                    {isProcessing
                      ? 'Processing Encrypted Hash...'
                      : `Complete Order ($${grandTotal.toFixed(2)})`}
                  </span>
                </button>

                {/* Trust and Security Badges */}
                <div className="grid grid-cols-2 gap-2 text-center pt-1">
                  <div className="p-2 bg-[#201f22] border border-[#2a2a2c] flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase text-[#908fa0]">
                    <span className="material-symbols-outlined text-xs text-[#4edea3]">security</span>
                    <span>256-Bit Encrypted</span>
                  </div>
                  <div className="p-2 bg-[#201f22] border border-[#2a2a2c] flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase text-[#908fa0]">
                    <span className="material-symbols-outlined text-xs text-[#c0c1ff]">published_with_changes</span>
                    <span>30-Day Guarantee</span>
                  </div>
                </div>

                {/* Campus Dispatch Guarantee */}
                <div className="p-3 bg-[#4edea3]/10 border border-[#4edea3]/30 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#4edea3] text-base mt-0.5">
                    local_shipping
                  </span>
                  <div className="text-xs text-[#e5e1e4]">
                    <span className="font-bold text-[#4edea3]">Campus Priority Dispatch:</span> Orders finalized before 17:00 EST arrive at student mailboxes by 09:30 AM tomorrow.
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Node Telemetry */}
            <div className="bg-[#1c1b1d] p-3 border border-[#464554] flex items-center justify-between text-[#908fa0] font-mono text-[11px]">
              <span>HOST: node-east.lumina.internal</span>
              <span className="flex items-center gap-1.5 text-[#4edea3]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span> 99.98% LATENCY 14ms
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Order Simulation Success Overlay Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-[#131315]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#1c1b1d] border border-[#464554] p-6 shadow-2xl relative text-center space-y-4">
            <div className="w-14 h-14 bg-[#4edea3] text-[#003824] mx-auto flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#4edea3] font-bold tracking-widest block">
                TELEMETRY RECEIVED
              </span>
              <h3 className="font-headline text-xl text-[#e5e1e4] font-bold uppercase">
                Order #LUM-84920 Dispatched
              </h3>
              <p className="text-xs text-[#c7c4d7] leading-relaxed">
                A receipt manifest has been routed to{' '}
                <strong className="text-[#e5e1e4] font-mono">{email}</strong> with immediate locker access credentials.
              </p>
            </div>

            <div className="p-4 bg-[#0e0e10] border border-[#2a2a2c] text-left font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-[#c7c4d7]">
                <span>Campus Pickup Code:</span>
                <span className="text-[#4edea3] font-bold tracking-widest">782-991</span>
              </div>
              <div className="flex justify-between text-[#c7c4d7]">
                <span>Settlement Transferred:</span>
                <span className="text-[#c0c1ff] font-bold">${grandTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#c7c4d7]">
                <span>Destination Node:</span>
                <span className="text-[#e5e1e4] truncate">{suite}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  onNavigate('confirmation');
                }}
                className="flex-1 py-2.5 bg-[#c0c1ff] text-[#1000a9] font-headline text-xs uppercase font-bold text-center hover:bg-[#8083ff] transition-colors border border-[#c0c1ff]"
              >
                Inspect Fulfillment Telemetry
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  onNavigate('home');
                }}
                className="px-4 py-2.5 bg-[#201f22] text-[#e5e1e4] font-headline text-xs uppercase font-bold hover:bg-[#2a2a2c] transition-colors border border-[#464554]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
