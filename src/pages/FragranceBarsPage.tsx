import { useEffect, useState } from 'react';
import { getProducts, type Product } from '../lib/data';
import ProductCard from '../components/ProductCard';

type FragranceBarsPageProps = {
  onQuickView: (product: Product) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function FragranceBarsPage({ onQuickView, onAddToCart, onNavigate }: FragranceBarsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getProducts().filter(p => p.type === 'fragrance_bar' && p.is_active);
    setProducts(data);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-16 bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('shop')}
            className="text-[#D69C4A] hover:text-[#1F2124] transition-colors text-sm uppercase tracking-wider mb-8"
          >
            ← Back to Shop
          </button>

          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl md:text-4xl text-[#1F2124] mb-4 uppercase">
              Fragrance Bars
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 font-serif">
              Subtle, lasting scent for your spaces and belongings. Our handcrafted fragrance bars transform any environment with natural, sustainable fragrance. Perfectly designed for wardrobes, drawers, and small personal corners, they offer a flameless way to experience pure olfactory luxury.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-[#D69C4A]">•</span>
                <span>Naturally scents spaces</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D69C4A]">•</span>
                <span>Long-lasting effect</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D69C4A]">•</span>
                <span>Sustainable beeswax base</span>
              </div>
            </div>
          </div>
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
