import React from 'react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: number[];
  allProducts: Product[];
  onRemoveFromWishlist: (id: number) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  allProducts,
  onRemoveFromWishlist,
  onMoveToCart
}) => {
  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-[#1c1b1d] border-l border-[#464554] shadow-[4px_4px_0px_0px_#000000] transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#464554] flex items-center justify-between bg-[#201f22]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb4ab]">
              favorite
            </span>
            <span className="font-headline text-base text-[#e5e1e4] font-bold uppercase tracking-wide">
              Saved Wishlist
            </span>
            <span className="text-[11px] bg-[#93000a] text-[#ffdad6] px-1.5 py-0.5 font-mono font-bold">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'ITEM' : 'ITEMS'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#c7c4d7] hover:text-[#e5e1e4] p-1 transition-colors"
            aria-label="Close wishlist"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <span className="material-symbols-outlined text-[#908fa0] text-4xl">
                heart_broken
              </span>
              <p className="text-sm text-[#c7c4d7] font-mono">No items saved in wishlist yet.</p>
              <p className="text-xs text-[#908fa0]">
                Tap the heart icon on any product to bookmark for future telemetry orders.
              </p>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 bg-[#0e0e10] border border-[#464554] flex gap-3 group"
              >
                <div className="w-16 h-16 bg-[#201f22] flex items-center justify-center border border-[#464554] shrink-0 overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  {p.tag && (
                    <span className="absolute bottom-0 right-0 bg-[#2a2a2c] text-[8px] font-mono px-1 text-[#c0c1ff]">
                      {p.tag}
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-xs text-[#e5e1e4] font-bold truncate block">
                        {p.title}
                      </span>
                      <button
                        onClick={() => onRemoveFromWishlist(p.id)}
                        className="text-[#908fa0] hover:text-[#ffb4ab] p-0.5 transition-colors shrink-0"
                        title="Remove from wishlist"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                    </div>
                    <span className="text-[10px] text-[#908fa0] font-mono block">
                      {p.category} // {p.sku}
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xs text-[#c0c1ff] font-mono font-bold">
                        ${p.price.toFixed(2)}
                      </span>
                      {p.originalPrice && (
                        <span className="text-[10px] text-[#908fa0] font-mono line-through">
                          ${p.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onMoveToCart(p)}
                      className="w-full py-1.5 bg-[#2a2a2c] hover:bg-[#c0c1ff] hover:text-[#1000a9] text-[#e5e1e4] font-headline text-[11px] uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-1 border border-[#464554]"
                    >
                      <span className="material-symbols-outlined text-xs">shopping_cart</span>
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-[#464554] bg-[#201f22]">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => onMoveToCart(p));
                onClose();
              }}
              className="w-full py-2.5 bg-[#4edea3] text-[#003824] font-headline text-xs uppercase font-bold tracking-wider hover:bg-[#6ffbbe] transition-colors flex items-center justify-center gap-2 border border-[#4edea3]"
            >
              <span className="material-symbols-outlined text-sm">inventory_2</span>
              Transfer All to Manifest Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};
