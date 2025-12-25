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
      <section className="relative py-24 bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('shop')}
            className="text-[#D69C4A] hover:text-[#1F2124] transition-colors text-sm uppercase tracking-wider mb-4"
          >
            ← Back to Shop
          </button>
          <h1 className="font-serif text-5xl md:text-6xl text-[#1F2124] mb-4">
            {selectedCollection?.name || 'Luxury Collection'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            {selectedCollection?.description || 'Opulent scents crafted for grand spaces and special moments. Each candle in our Luxury line tells a story of refinement.'}
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F4EDE6] border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {candleSubcategories.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => setSelectedSubcategory(sub.slug)}
                className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap font-medium ${selectedSubcategory === sub.slug
                    ? 'bg-[#D69C4A] text-white'
                    : 'bg-white text-[#1F2124] border border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {sub.name}
              </button>
            ))}
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
