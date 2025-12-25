import { useState } from 'react';
import { Eye, ShoppingBag } from 'lucide-react';
import type { Product } from '../lib/supabase';

type ProductCardProps = {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (productId: string) => void;
};

export default function ProductCard({ product, onQuickView, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div
      className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageIndex(0);
      }}
    >
      <div className="aspect-square relative overflow-hidden bg-[#F4EDE6]">
        <img
          src={product.images[imageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {product.images.length > 1 && isHovered && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === imageIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-white rounded-full hover:bg-[#D69C4A] hover:text-white transition-colors"
            aria-label="Quick view"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={() => onAddToCart(product.id)}
            className="p-3 bg-white rounded-full hover:bg-[#D69C4A] hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag size={20} />
          </button>
        </div>

        {product.is_featured && (
          <span className="absolute top-4 left-4 bg-[#D69C4A] text-white text-xs uppercase tracking-wider px-3 py-1 rounded-full">
            Best Seller
          </span>
        )}

        {product.gender_tag && (
          <span className="absolute top-4 right-4 bg-white/90 text-[#1F2124] text-xs uppercase tracking-wider px-3 py-1 rounded-full">
            {product.gender_tag}
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-serif text-xl text-[#1F2124] mb-2 hover:text-[#D69C4A] transition-colors cursor-pointer">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.short_description}</p>

        {product.scent_notes.top && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.scent_notes.top.slice(0, 3).map((note) => (
              <span
                key={note}
                className="text-xs text-[#8A9A5B] bg-[#F4EDE6] px-2 py-1 rounded"
              >
                {note}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-serif text-[#1F2124]">Rs {product.price}</span>
          <button
            onClick={() => onAddToCart(product.id)}
            className="text-sm uppercase tracking-wider text-[#D69C4A] hover:text-[#1F2124] transition-colors font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
