import { useEffect, useState } from 'react';
import { supabase, type Product } from '../lib/supabase';
import { ShoppingBag, Heart, Share2, ChevronRight, Star, Check } from 'lucide-react';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../lib/wishlist';

type ProductDetailPageProps = {
  slug: string;
  onAddToCart: (productId: string, quantity: number) => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function ProductDetailPage({
  slug,
  onAddToCart,
  onNavigate,
}: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

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

  async function fetchProduct() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    setProduct(data);
    setLoading(false);
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const displayPrice = product.offer_price || product.price;
  const hasDiscount = !!product.offer_price;

  return (
    <div className="min-h-screen bg-white">
      <section className="py-6 px-4 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => onNavigate('shop')} className="hover:text-[#D69C4A]">
            Shop
          </button>
          <ChevronRight size={16} />
          <span>{product.name}</span>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-[42%_58%] gap-12">
          {/* Left side - Images (Fixed, No Scroll) */}
          <div className="space-y-4">
            <div className="aspect-square bg-[#F4EDE6] rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-[#F4EDE6] rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === selectedImage ? 'border-[#D69C4A]' : 'border-transparent'
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
            className="space-y-8 max-h-[85vh] overflow-y-auto pr-3"
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
              <h1 className="font-serif text-5xl text-[#1F2124] mb-3">{product.name}</h1>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'fill-[#D69C4A] text-[#D69C4A]' : 'fill-gray-200 text-gray-200'}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <p className="text-3xl font-serif text-[#D69C4A]">${displayPrice}</p>
                {hasDiscount && (
                  <>
                    <p className="text-xl text-gray-400 line-through">${product.price}</p>
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">
                      Save ${(product.price - displayPrice).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">{product.short_description}</p>
            </div>

            {product.scent_notes.top && (
              <div className="space-y-3 pb-6 border-b border-gray-200">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium">
                  Scent Profile
                </h3>
                <div className="space-y-2">
                  {product.scent_notes.top.length > 0 && (
                    <div>
                      <span className="font-medium text-[#1F2124]">Top:</span>{' '}
                      <span className="text-gray-700">{product.scent_notes.top.join(', ')}</span>
                    </div>
                  )}
                  {product.scent_notes.heart.length > 0 && (
                    <div>
                      <span className="font-medium text-[#1F2124]">Heart:</span>{' '}
                      <span className="text-gray-700">{product.scent_notes.heart.join(', ')}</span>
                    </div>
                  )}
                  {product.scent_notes.base.length > 0 && (
                    <div>
                      <span className="font-medium text-[#1F2124]">Base:</span>{' '}
                      <span className="text-gray-700">{product.scent_notes.base.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm uppercase tracking-wider text-gray-500 font-medium">
                  Quantity
                </label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product.id, quantity);
                    setQuantity(1);
                  }}
                  className="flex-1 py-4 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-colors flex items-center justify-center gap-2 font-medium uppercase tracking-wider"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>

                <button
                  onClick={toggleWishlist}
                  className={`px-6 py-4 border rounded-lg transition-colors ${
                    inWishlist
                      ? 'border-[#D69C4A] bg-[#FFF9F2] text-[#D69C4A]'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={20} className={inWishlist ? 'fill-[#D69C4A]' : ''} />
                </button>

                <button className="px-6 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>


            <div className="pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
              <div>SKU: {product.sku}</div>
              {product.dimensions && <div>Size: {product.dimensions}</div>}
            </div>

            {product.full_description && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-serif text-2xl text-[#1F2124] mb-4">About This Product</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.full_description}</p>
                </div>
              </div>
            )}

            {product.ingredients.length > 0 && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-serif text-2xl text-[#1F2124] mb-4">Ingredients</h3>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="text-gray-700 flex gap-2">
                      <span className="text-[#D69C4A]">•</span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.how_to_use && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-serif text-2xl text-[#1F2124] mb-4">How to Use</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.how_to_use}
                </div>
              </div>
            )}

            {product.sustainability_info && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-serif text-2xl text-[#1F2124] mb-4">Sustainability</h3>
                <p className="text-gray-700 leading-relaxed">{product.sustainability_info}</p>
              </div>
            )}

            {product.reasons_to_love && product.reasons_to_love.length > 0 && (
              <div className="bg-[#F4EDE6] rounded-xl p-6 border-t">
                <h3 className="font-serif text-xl text-[#1F2124] mb-4">Reasons to Love</h3>
                <ul className="space-y-3">
                  {product.reasons_to_love.map((reason, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-700">
                      <Check size={20} className="text-[#D69C4A] flex-shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.set_contains && product.set_contains.length > 0 && (
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-serif text-xl text-[#1F2124] mb-4">Set Contains</h3>
                <ul className="space-y-2">
                  {product.set_contains.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-gray-700">
                      <span className="text-[#D69C4A]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-serif text-2xl text-[#1F2124] mb-6">Customer Reviews</h3>

              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-[#D69C4A] text-[#D69C4A]" />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">Sarah M.</span>
                    <span className="text-sm text-gray-500">Verified Purchase</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Absolutely love this! The scent is incredible and lasts all day. The beeswax base feels so nourishing and natural. Will definitely be purchasing again.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < 4 ? 'fill-[#D69C4A] text-[#D69C4A]' : 'fill-gray-200 text-gray-200'} />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">Jessica R.</span>
                    <span className="text-sm text-gray-500">Verified Purchase</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Beautiful fragrance and I appreciate the sustainable packaging. It's perfect for my purse and the scent is not overpowering.
                  </p>
                </div>

                <div className="pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-[#D69C4A] text-[#D69C4A]" />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">Emily K.</span>
                    <span className="text-sm text-gray-500">Verified Purchase</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    This has become my signature scent! I love that it's made with beeswax and natural ingredients. The quality is outstanding and the fragrance is sophisticated yet subtle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
