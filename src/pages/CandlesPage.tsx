import { useEffect, useState } from 'react';
import { supabase, type Product } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

type CandlesPageProps = {
  onQuickView: (product: Product) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  initialCollection?: string;
};

export default function CandlesPage({ onQuickView, onAddToCart, onNavigate, initialCollection }: CandlesPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialCollection || 'luxury');
  const [collections, setCollections] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const candleSubcategories = [
    { slug: 'luxury', name: 'Luxury' },
    { slug: 'elegance', name: 'Elegance' },
    { slug: 'essence', name: 'Essence' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [collectionsRes, productsRes] = await Promise.all([
      supabase.from('collections').select('id, slug, name, description').in('slug', ['luxury', 'elegance', 'essence']),
      supabase.from('products').select('*').eq('type', 'candle').eq('is_active', true),
    ]);

    const collectionsMap: Record<string, any> = {};
    if (collectionsRes.data) {
      collectionsRes.data.forEach((c) => {
        collectionsMap[c.slug] = c;
      });
    }
    setCollections(collectionsMap);

    if (productsRes.data) {
      setProducts(productsRes.data);
    }
    setLoading(false);
  }

  const selectedCollection = collections[selectedSubcategory];
  const filteredProducts = products.filter((p) => p.collection_id === selectedCollection?.id);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Hero Section - BEESWAX SCENTED CANDLES */}
      <section className="relative py-24 bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('shop')}
            className="text-[#D69C4A] hover:text-[#1F2124] transition-colors text-sm uppercase tracking-wider mb-8"
          >
            ← Back to Shop
          </button>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl text-[#1F2124] mb-6">
              BEESWAX SCENTED CANDLES
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 font-serif">
              Our beeswax candles infuse your space with sophisticated scent compositions, each crafted to evoke serenity, grandeur, and timeless allure. With a natural golden glow & exquisite fragrance diffusion, these candles transform any room into a haven of opulence.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-[#D69C4A]">•</span>
                <span>Slow burning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D69C4A]">•</span>
                <span>Clean, toxin-free</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D69C4A]">•</span>
                <span>Fragrances curated for the refined palate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection-Specific Section with Toggles */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Collection Toggle Buttons */}
          <div className="flex gap-3 justify-center mb-12">
            {candleSubcategories.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => setSelectedSubcategory(sub.slug)}
                className={`px-8 py-3 rounded-full transition-all whitespace-nowrap font-medium text-sm uppercase tracking-wider ${selectedSubcategory === sub.slug
                    ? 'bg-[#D69C4A] text-white shadow-lg'
                    : 'bg-transparent text-gray-600 border-2 border-gray-300 hover:border-[#D69C4A] hover:text-[#D69C4A]'
                  }`}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* Collection Details */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl text-[#1F2124] mb-4">
              {selectedCollection?.name || 'Luxury Collection'}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {selectedCollection?.description || 'Opulent scents crafted for grand spaces and special moments. Each candle in our Luxury line tells a story of refinement.'}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found in this collection</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
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
