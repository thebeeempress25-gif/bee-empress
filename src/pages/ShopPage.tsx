import { useEffect, useState } from 'react';
import { supabase, type Product } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

type ShopPageProps = {
  onQuickView: (product: Product) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function ShopPage({ onQuickView, onAddToCart, onNavigate }: ShopPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, selectedPriceRange, sortBy]);

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (data) {
      setProducts(data);
    }
    setLoading(false);
  }

  function applyFiltersAndSort() {
    let filtered = [...products];

    if (selectedPriceRange !== 'all') {
      filtered = filtered.filter((p) => {
        if (selectedPriceRange === 'under_500') return p.price < 500;
        if (selectedPriceRange === '500_1500') return p.price >= 500 && p.price <= 1500;
        if (selectedPriceRange === 'over_1500') return p.price > 1500;
        return true;
      });
    }

    if (sortBy === 'price_low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-16 bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6] border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <button
              className="px-4 py-2 text-sm uppercase tracking-wider text-[#1F2124] border-b-2 border-[#D69C4A]"
            >
              All Products
            </button>
            <button
              onClick={() => onNavigate('candles')}
              className="px-4 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-[#1F2124] transition-colors"
            >
              Candles
            </button>
            <button
              onClick={() => onNavigate('solid-perfumes')}
              className="px-4 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-[#1F2124] transition-colors"
            >
              Solid Perfumes
            </button>
            <button
              onClick={() => onNavigate('fragrance-bars')}
              className="px-4 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-[#1F2124] transition-colors"
            >
              Fragrance Bars
            </button>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="font-serif text-4xl text-[#1F2124]">Shop All</h1>
            <p className="text-gray-600">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-4 space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-[#1F2124] uppercase tracking-wider mb-4">
                  Price
                </h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Prices' },
                    { value: 'under_500', label: 'Under Rs 500' },
                    { value: '500_1500', label: 'Rs 500 - Rs 1500' },
                    { value: 'over_1500', label: 'Over Rs 1500' },
                  ].map((price) => (
                    <label key={price.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPriceRange === price.value}
                        onChange={() => setSelectedPriceRange(price.value)}
                        className="w-4 h-4 text-[#D69C4A] border-gray-300 rounded focus:ring-[#D69C4A]"
                      />
                      <span className="text-sm text-gray-700">{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-600">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D69C4A]"
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found</p>
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
          </main>
        </div>
      </div>
    </div>
  );
}
