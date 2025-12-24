import { useEffect, useState } from 'react';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { supabase, type Product } from '../lib/supabase';
import { getWishlist, removeFromWishlist } from '../lib/wishlist';

type WishlistPageProps = {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onWishlistChange: () => void;
};

export default function WishlistPage({ onNavigate, onAddToCart, onWishlistChange }: WishlistPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlistProducts();
  }, []);

  async function fetchWishlistProducts() {
    const wishlistIds = await getWishlist();

    if (wishlistIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('products')
      .select('*')
      .in('id', wishlistIds);

    setProducts(data || []);
    setLoading(false);
  }

  async function handleRemove(productId: string) {
    await removeFromWishlist(productId);
    setProducts(products.filter(p => p.id !== productId));
    onWishlistChange();
  }

  async function handleAddToCart(productId: string) {
    onAddToCart(productId, 1);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D69C4A] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-serif text-[#1F2124] mb-8">My Wishlist</h1>
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-serif text-[#1F2124] mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save your favorite items here to view them later</p>
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-3 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-colors uppercase tracking-wider text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-serif text-[#1F2124]">My Wishlist</h1>
          <p className="text-gray-600">{products.length} {products.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const displayPrice = product.offer_price || product.price;
            const hasDiscount = !!product.offer_price;

            return (
              <div key={product.id} className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <button
                  onClick={() => handleRemove(product.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <X size={18} className="text-gray-600 hover:text-red-600" />
                </button>

                <button
                  onClick={() => onNavigate('product', { slug: product.slug })}
                  className="block"
                >
                  <div className="aspect-square bg-[#F4EDE6] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </button>

                <div className="p-5">
                  <button
                    onClick={() => onNavigate('product', { slug: product.slug })}
                    className="text-left"
                  >
                    <h3 className="font-serif text-xl text-[#1F2124] mb-2 group-hover:text-[#D69C4A] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.short_description}</p>
                  </button>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-serif text-[#D69C4A]">${displayPrice}</span>
                      {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through">${product.price}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full py-2.5 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
