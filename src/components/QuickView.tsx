import { X, ShoppingBag, Star, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Product } from '../lib/supabase';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../lib/wishlist';

type QuickViewProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function QuickView({ product, isOpen, onClose, onAddToCart, onNavigate }: QuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    if (product) {
      checkWishlistStatus();
    }
  }, [product]);

  async function checkWishlistStatus() {
    if (product) {
      const status = await isInWishlist(product.id);
      setInWishlist(status);
    }
  }

  async function toggleWishlist() {
    if (!product) return;

    if (inWishlist) {
      await removeFromWishlist(product.id);
      setInWishlist(false);
    } else {
      await addToWishlist(product.id);
      setInWishlist(true);
    }
  }

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    onClose();
    setQuantity(1);
  };

  const displayPrice = product.price;
  const originalPrice = product.price + 500;
  const savings = 500;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-serif">Quick View</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 grid md:grid-cols-[45%_55%] overflow-hidden">
          {/* Left side - Images (Fixed, No Scroll) */}
          <div className="bg-white p-6 flex flex-col gap-3 justify-center border-r border-gray-100">
            <div className="aspect-square bg-[#F4EDE6] rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-[#F4EDE6] rounded-lg overflow-hidden border-2 transition-colors ${idx === selectedImage ? 'border-[#D69C4A]' : 'border-transparent'
                      }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Content (Scrollable with custom thin scrollbar) */}
          <div
            className="overflow-y-auto p-6 space-y-5"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#D69C4A #f0f0f0'
            }}
          >
            <style>{`
              .overflow-y-auto::-webkit-scrollbar {
                width: 6px;
              }
              .overflow-y-auto::-webkit-scrollbar-track {
                background: #f0f0f0;
                border-radius: 10px;
              }
              .overflow-y-auto::-webkit-scrollbar-thumb {
                background: #D69C4A;
                border-radius: 10px;
              }
              .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                background: #c28a3a;
              }
            `}</style>

            <div>
              <h1 className="text-2xl font-serif text-[#1F2124] mb-2">{product.name}</h1>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'fill-[#D69C4A] text-[#D69C4A]' : 'fill-gray-200 text-gray-200'}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 mb-3">
                <p className="text-2xl text-[#D69C4A] font-serif">Rs {displayPrice}</p>
                <p className="text-lg text-gray-400 line-through">Rs {originalPrice}</p>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                  Save Rs {savings}
                </span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-[15px]">{product.short_description}</p>

            {product.scent_notes.top && (
              <div className="border-t pt-4">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">Scent Notes</h3>
                <div className="space-y-1.5 text-sm">
                  {product.scent_notes.top.length > 0 && (
                    <div>
                      <span className="font-medium">Top:</span> {product.scent_notes.top.join(', ')}
                    </div>
                  )}
                  {product.scent_notes.heart.length > 0 && (
                    <div>
                      <span className="font-medium">Heart:</span> {product.scent_notes.heart.join(', ')}
                    </div>
                  )}
                  {product.scent_notes.base.length > 0 && (
                    <div>
                      <span className="font-medium">Base:</span> {product.scent_notes.base.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-4">
                <label className="text-xs uppercase tracking-wider text-gray-500 font-medium">Quantity</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-colors flex items-center justify-center gap-2 font-medium uppercase tracking-wider text-sm"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>

                <button
                  onClick={toggleWishlist}
                  className={`px-4 py-3.5 border rounded-lg transition-colors ${inWishlist
                    ? 'border-[#D69C4A] bg-[#FFF9F2] text-[#D69C4A]'
                    : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={18} className={inWishlist ? 'fill-[#D69C4A]' : ''} />
                </button>
              </div>

              <button
                onClick={() => {
                  onNavigate('product', { slug: product.slug });
                  onClose();
                }}
                className="block w-full py-3 text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs uppercase tracking-wider"
              >
                View Full Details
              </button>
            </div>

            {product.reasons_to_love && product.reasons_to_love.length > 0 && (
              <div className="bg-[#FFF9F2] rounded-lg p-4">
                <h3 className="font-medium text-[#1F2124] mb-3 text-sm">Reasons to Love</h3>
                <ul className="space-y-2">
                  {product.reasons_to_love.map((reason, idx) => (
                    <li key={idx} className="flex gap-2 text-gray-700 text-sm">
                      <span className="text-[#D69C4A]">✓</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.set_contains && product.set_contains.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-[#1F2124] mb-2 text-sm">Set Contains</h3>
                <ul className="space-y-1.5">
                  {product.set_contains.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-gray-700 text-sm">
                      <span className="text-[#D69C4A]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
