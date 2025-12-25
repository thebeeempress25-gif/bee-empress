import { useEffect, useState } from 'react';
import { supabase, type Product, type Collection } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

type CollectionPageProps = {
  slug: string;
  onQuickView: (product: Product) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function CollectionPage({
  slug,
  onQuickView,
  onAddToCart,
  onNavigate,
}: CollectionPageProps) {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollectionData();
  }, [slug]);

  async function fetchCollectionData() {
    setLoading(true);
    const { data: collectionData } = await supabase
      .from('collections')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (collectionData) {
      setCollection(collectionData);

      let query = supabase
        .from('products')
        .select('*')
        .eq('collection_id', collectionData.id)
        .eq('is_active', true);

      const { data: productsData } = await query;
      if (productsData) {
        setProducts(productsData);
        if (!selectedSegment && productsData.length > 0) {
          const firstSegment = productsData[0].scent_notes?.base?.[0] || 'all';
          setSelectedSegment(firstSegment);
        }
      }
    }
    setLoading(false);
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!collection) {
    return <div className="min-h-screen flex items-center justify-center">Collection not found</div>;
  }

  const subCollections =
    slug === 'luxury'
      ? ['Opulent', 'Signature', 'Limited']
      : slug === 'elegance'
        ? ['Classic', 'Refined', 'Subtle']
        : slug === 'essence'
          ? ['Pure', 'Essential', 'Minimal']
          : null;

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
            {collection.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">{collection.description}</p>
        </div>
      </section>

      {subCollections && (
        <section className="py-12 bg-[#F4EDE6] border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {subCollections.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSegment(sub)}
                  className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${selectedSegment === sub
                      ? 'bg-[#D69C4A] text-white'
                      : 'bg-white text-[#1F2124] border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found in this collection</p>
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
