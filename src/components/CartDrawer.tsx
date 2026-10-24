import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.08; // 8%
  const tax = subtotal * taxRate;
  const shipping = 0; // FREE
  const grandTotal = subtotal + tax + shipping;
  const totalItemCount = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-[#1c1b1d] border-l border-[#464554] shadow-[4px_4px_0px_0px_#000000] transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#464554] flex items-center justify-between bg-[#201f22]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3]">
              shopping_bag
            </span>
            <span className="font-headline text-base text-[#e5e1e4] font-bold uppercase tracking-wide">
              Manifest Cart
            </span>
            <span className="text-[11px] bg-[#00a572] text-[#00311f] px-1.5 py-0.5 font-mono font-bold">
              {totalItemCount} {totalItemCount === 1 ? 'ITEM' : 'ITEMS'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#c7c4d7] hover:text-[#e5e1e4] p-1 transition-colors"
            aria-label="Close cart drawer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <span className="material-symbols-outlined text-[#908fa0] text-4xl">
                remove_shopping_cart
              </span>
              <p className="text-sm text-[#c7c4d7] font-mono">Manifest is currently empty.</p>
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-[#2a2a2c] text-[#c0c1ff] font-mono text-xs uppercase hover:bg-[#353437] transition-colors"
              >
                Inspect Inventory Matrix
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#0e0e10] border border-[#464554] flex gap-3 group"
              >
                <div className="w-16 h-16 bg-[#201f22] flex items-center justify-center border border-[#464554] shrink-0 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.sku && (
                    <span className="absolute bottom-0 right-0 bg-[#2a2a2c] text-[9px] font-mono px-1 text-[#c7c4d7]">
                      {item.sku}
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-xs text-[#e5e1e4] font-bold truncate block">
                        {item.title}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#908fa0] hover:text-[#ffb4ab] p-0.5 transition-colors shrink-0"
                        title="Remove unit"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                    {item.subtitle && (
                      <span className="text-[10px] text-[#908fa0] block truncate font-mono">
                        {item.subtitle}
                      </span>
                    )}
                    <span className="text-xs text-[#c7c4d7] font-mono block mt-0.5">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center bg-[#201f22] border border-[#464554] text-[#e5e1e4] hover:bg-[#39393b] font-mono text-xs transition-colors"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs px-2 text-[#c0c1ff] font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center bg-[#201f22] border border-[#464554] text-[#e5e1e4] hover:bg-[#39393b] font-mono text-xs transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Financial Calculation Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#464554] bg-[#201f22] space-y-2 font-mono text-xs">
            <div className="flex justify-between text-[#c7c4d7]">
              <span>Subtotal:</span>
              <span className="text-[#e5e1e4] font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#c7c4d7]">
              <span>Estimated Tax (8%):</span>
              <span className="text-[#e5e1e4]">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#c7c4d7]">
              <span>Calculated Shipping:</span>
              <span className="text-[#4edea3] font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-[#e5e1e4] text-sm font-bold pt-2 border-t border-[#464554]/60">
              <span>Total Telemetry:</span>
              <span className="text-[#c0c1ff]">${grandTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="block w-full text-center py-2.5 bg-[#c0c1ff] text-[#1000a9] font-headline text-xs uppercase font-bold tracking-wider hover:bg-[#8083ff] hover:text-[#0d0096] transition-colors mt-3 border border-[#c0c1ff]"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};
