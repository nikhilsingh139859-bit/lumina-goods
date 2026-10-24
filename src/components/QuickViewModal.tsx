import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewFullPDP?: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewFullPDP
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#131315]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1c1b1d] border border-[#464554] max-w-2xl w-full p-6 shadow-[8px_8px_0px_0px_#000000] relative">
        <button
          className="absolute top-4 right-4 text-[#c7c4d7] hover:text-[#e5e1e4] transition-colors p-1"
          onClick={onClose}
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Visual Showcase */}
          <div className="h-64 bg-[#0e0e10] border border-[#464554] flex items-center justify-center overflow-hidden relative group">
            <img
              src={product.image}
              alt={product.imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.tag && (
              <div className="absolute top-2 left-2 bg-[#c0c1ff] text-[#1000a9] font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                {product.tag}
              </div>
            )}
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-[#0e0e10]/90 px-2 py-0.5 font-mono text-[10px] text-[#4edea3]">
              <span className="w-1.5 h-1.5 bg-[#4edea3] inline-block"></span>
              IN STOCK // 14.8V
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[#c0c1ff] font-mono text-[11px] uppercase tracking-wider block">
                {product.category} // {product.sku}
              </span>
              <h3 className="font-headline text-lg text-[#e5e1e4] uppercase font-bold leading-snug">
                {product.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[#4edea3] font-mono text-xs font-bold">
                  {product.rating} ★
                </span>
                <span className="text-[#908fa0] text-xs font-mono">
                  ({product.reviews} verified reviews)
                </span>
              </div>
              <p className="text-xs text-[#c7c4d7] leading-relaxed line-clamp-3">
                {product.description}
              </p>
              <div className="flex items-baseline gap-2 pt-1 font-mono">
                <span className="text-xl font-bold text-[#c0c1ff]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#908fa0] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#c7c4d7]">
                  Select Units:
                </span>
                <div className="flex items-center bg-[#2a2a2c] border border-[#464554]">
                  <button
                    className="w-8 h-8 flex items-center justify-center text-[#e5e1e4] hover:bg-[#39393b] font-mono text-sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono text-xs font-bold text-[#c0c1ff]">
                    {quantity}
                  </span>
                  <button
                    className="w-8 h-8 flex items-center justify-center text-[#e5e1e4] hover:bg-[#39393b] font-mono text-sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 py-2.5 bg-[#c0c1ff] text-[#1000a9] font-headline text-xs uppercase font-bold tracking-wider hover:bg-[#8083ff] hover:text-[#0d0096] transition-all shadow-[2px_2px_0px_0px_#000000]"
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                >
                  Load Into Cart // ${(product.price * quantity).toFixed(2)}
                </button>
                {onViewFullPDP && (
                  <button
                    className="px-3 py-2.5 bg-[#2a2a2c] border border-[#464554] text-[#e5e1e4] hover:border-[#c0c1ff] font-mono text-xs uppercase tracking-wider transition-colors"
                    onClick={() => {
                      onViewFullPDP(product);
                      onClose();
                    }}
                    title="Open Full Engineering Spec Sheet"
                  >
                    Full Spec
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
