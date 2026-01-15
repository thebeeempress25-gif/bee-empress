import { useEffect, useState } from 'react';
import { supabase, type Product } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

type SolidPerfumesPageProps = {
  onQuickView: (product: Product) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function SolidPerfumesPage({ onQuickView, onAddToCart, onNavigate }: SolidPerfumesPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('type', 'solid_perfume')
      .eq('is_active', true);

    if (data) {
      setProducts(data);
    }
    setLoading(false);
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-24 bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('shop')}
            className="text-[#D69C4A] hover:text-[#1F2124] transition-colors text-sm uppercase tracking-wider mb-4"
          >
            ← Back to Shop
          </button>
          <h1 className="font-serif text-5xl md:text-6xl text-[#1F2124] mb-4">
            Solid Perfumes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Handcrafted using pure beeswax and premium fragrance oils, these solid perfumes offer a subtle yet long-lasting aroma that melts gently into your skin.
            Unlike alcohol-based perfumes, our solid perfumes are skin-friendly, travel-safe, and eco-conscious, making them perfect for everyday wear.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={(id) => onAddToCart(id, 1)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
