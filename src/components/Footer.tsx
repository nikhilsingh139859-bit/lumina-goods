import React, { useState } from 'react';
import { ASSETS } from '../data/products';
import { ScreenType } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [digestEmail, setDigestEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (digestEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setDigestEmail('');
      }, 3500);
    }
  };

  return (
    <footer className="w-full bg-[#0e0e10] border-t border-[#464554] mt-16 text-[#e5e1e4]">
      <div className="max-w-7xl mx-auto px-4 md:px-14 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img
              alt="Lumina Logo"
              className="h-6 w-auto object-contain"
              src={ASSETS.logo}
            />
            <span className="font-headline text-lg text-[#c0c1ff] font-bold uppercase">
              Lumina
            </span>
          </div>
          <p className="text-xs text-[#c7c4d7] leading-relaxed">
            College Capstone Project demo created with high-performance responsive
            architecture. Curated experimental technology and hardware catalog for
            student productivity.
          </p>
          <div className="flex items-center gap-2 text-[#4edea3] text-xs font-mono font-bold uppercase">
            <span className="w-2 h-2 bg-[#4edea3] inline-block"></span>
            Guaranteed Storefront Protocol
          </div>
        </div>

        {/* Directory Links */}
        <div className="space-y-2 text-xs">
          <span className="font-headline text-sm text-[#e5e1e4] uppercase font-bold block mb-3">
            Directory
          </span>
          <button
            onClick={() => onNavigate('home')}
            className="block text-left text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors py-0.5"
          >
            Hardware Depot Catalog
          </button>
          <button
            onClick={() => onNavigate('pdp')}
            className="block text-left text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors py-0.5"
          >
            Modular Terminals & Audio
          </button>
          <button
            onClick={() => onNavigate('checkout')}
            className="block text-left text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors py-0.5"
          >
            Spec Sheets & Pricing
          </button>
          <button
            onClick={() => onNavigate('confirmation')}
            className="block text-left text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors py-0.5"
          >
            Real-Time Order Tracking
          </button>
        </div>

        {/* Support & Trust */}
        <div className="space-y-2 text-xs">
          <span className="font-headline text-sm text-[#e5e1e4] uppercase font-bold block mb-3">
            Support & Trust
          </span>
          <p className="text-[#c7c4d7]">24/7 Technical Dispatch Available</p>
          <p className="text-[#c7c4d7]">30-Day Physical Diagnostic Guarantee</p>
          <p className="text-[#c7c4d7]">Encrypted Checkout Terminal</p>
          <p className="text-[#908fa0] font-mono text-[11px] pt-1">
            Institutional Hub #4 · West Quad
          </p>
        </div>

        {/* Telemetry Digest Newsletter */}
        <div className="space-y-3">
          <span className="font-headline text-sm text-[#e5e1e4] uppercase font-bold block">
            Telemetry Digest
          </span>
          <p className="text-xs text-[#c7c4d7]">
            Subscribe for lab drop updates, firmware releases, and campus discount frequencies.
          </p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              className="w-full bg-[#201f22] border border-[#464554] px-3 py-2 text-xs text-[#e5e1e4] placeholder:text-[#908fa0] focus:outline-none focus:border-[#c0c1ff] font-mono"
              placeholder="student@college.edu"
              type="email"
              value={digestEmail}
              onChange={(e) => setDigestEmail(e.target.value)}
              required
            />
            <button
              className="bg-[#c0c1ff] text-[#1000a9] text-xs px-3.5 uppercase font-bold hover:bg-[#8083ff] transition-colors shrink-0 font-mono"
              type="submit"
            >
              Join
            </button>
          </form>
          {subscribed && (
            <p className="text-[11px] font-mono text-[#4edea3]">
              ✓ Digest telemetry frequency linked to {digestEmail}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#464554]/50 max-w-7xl mx-auto px-4 md:px-14 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#908fa0]">
        <span>
          © 2025 Lumina Goods Capstone Architecture. Laboratory Sandbox Mode.
        </span>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 border border-[#464554] text-[10px] font-mono text-[#c7c4d7]">
            VISA
          </span>
          <span className="px-2 py-0.5 border border-[#464554] text-[10px] font-mono text-[#c7c4d7]">
            MASTERCARD
          </span>
          <span className="px-2 py-0.5 border border-[#464554] text-[10px] font-mono text-[#c7c4d7]">
            APPLE PAY
          </span>
          <span className="px-2 py-0.5 border border-[#464554] text-[10px] font-mono text-[#c7c4d7]">
            PAYPAL
          </span>
        </div>
      </div>
    </footer>
  );
};
