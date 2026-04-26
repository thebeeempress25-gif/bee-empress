import { useEffect, useState } from 'react';
import { getProducts, type Product } from '../lib/data';
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
    const data = getProducts().filter(p => p.type === 'solid_perfume' && p.is_active);
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
              Solid Perfumes
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 font-serif">
              Handcrafted using pure beeswax and premium fragrance oils, these luxury solid perfumes offer a subtle yet long-lasting aroma that melts gently into your skin. Unlike alcohol-based perfumes, our solid perfumes are skin-friendly, travel-safe, and eco-conscious—perfect for the mindful soul.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-[#D69C4A]">•</span>
                <span>Skin-friendly formula</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D69C4A]">•</span>
                <span>Travel-safe & compact</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D69C4A]">•</span>
                <span>Alcohol-free fragrance</span>
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
