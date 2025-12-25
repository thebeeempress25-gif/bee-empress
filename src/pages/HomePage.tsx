import { useEffect, useState } from 'react';
import { supabase, type Product, type Collection } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

type HomePageProps = {
  onQuickView: (product: Product) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function HomePage({ onQuickView, onAddToCart, onNavigate }: HomePageProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [collectionsData, productsData] = await Promise.all([
      supabase.from('collections').select('*').order('display_order'),
      supabase.from('products').select('*').eq('is_active', true),
    ]);

    if (collectionsData.data) setCollections(collectionsData.data);
    if (productsData.data) {
      setFeaturedProducts(productsData.data.filter((p) => p.is_featured).slice(0, 4));
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F2] via-[#F4EDE6] to-[#FFF9F2]">
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.pexels.com/photos/4040596/pexels-photo-4040596.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Luxury beeswax candles"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1F2124] mb-6 leading-tight">
            Luxury in Every Flame
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Hand-poured beeswax candles, solid perfumes, and fragrance bars.
            Ethically sourced. Sustainably crafted. Timelessly beautiful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-4 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-all duration-300 hover:shadow-lg font-medium uppercase tracking-wider text-sm"
            >
              Shop Candles
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-4 bg-transparent border-2 border-[#1F2124] text-[#1F2124] rounded-lg hover:bg-[#1F2124] hover:text-white transition-all duration-300 font-medium uppercase tracking-wider text-sm"
            >
              Our Story
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-[#D69C4A]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1F2124] mb-4">
              Our Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each collection tells a story of craftsmanship, sustainability, and timeless luxury
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.slice(0, 3).map((collection) => (
              <button
                key={collection.id}
                onClick={() => onNavigate('candles', { collection: collection.slug })}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-[#F4EDE6] text-left"
              >
                <img
                  src={collection.image_url}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="font-serif text-3xl mb-2">{collection.name}</h3>
                  <p className="text-sm text-white/90 mb-4">{collection.description}</p>
                  <span className="inline-block text-sm uppercase tracking-wider border-b-2 border-[#D69C4A] pb-1">
                    Explore Collection
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1F2124] mb-4">
              Best Sellers
            </h2>
            <p className="text-lg text-gray-600">
              Our most loved creations, chosen by the hive
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={(id) => onAddToCart(id, 1)}
                />
              ))}
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() => onNavigate('shop')}
              className="inline-block px-8 py-4 bg-transparent border-2 border-[#1F2124] text-[#1F2124] rounded-lg hover:bg-[#1F2124] hover:text-white transition-all duration-300 font-medium uppercase tracking-wider text-sm"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-[#F4EDE6]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-16">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1F2124] mb-6 leading-tight">
                The Beeswax
                <span className="block text-[#D69C4A] italic">Difference</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                For centuries, beeswax has been revered as nature's most luxurious and sustainable wax.
                Our candles harness this ancient wisdom, creating an experience that transcends ordinary ambiance.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Unlike paraffin or soy, beeswax burns cleaner, lasts longer, and naturally purifies the air around you. Each candle is a testament to nature's perfection and human craftsmanship.
              </p>
              <div className="w-24 h-1 bg-[#D69C4A]"></div>
            </div>
            <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/8953391/pexels-photo-8953391.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Natural beeswax honeycomb"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Air Purifying',
                description: 'Releases negative ions that naturally cleanse your air, reducing allergens and pollutants',
                stat: '100%',
                label: 'Natural'
              },
              {
                title: 'Long Burning',
                description: 'Dense molecular structure provides 60+ hours of clean, smoke-free illumination',
                stat: '60+',
                label: 'Hours'
              },
              {
                title: 'Ethically Sourced',
                description: 'Supporting regenerative beekeeping practices that protect and nurture bee populations',
                stat: '0%',
                label: 'Toxins'
              },
            ].map((benefit) => (
              <div key={benefit.title} className="group">
                <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif text-[#1F2124] mb-2">{benefit.title}</h3>
                      <div className="w-12 h-0.5 bg-[#D69C4A] group-hover:w-20 transition-all duration-300"></div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-serif text-[#D69C4A]">{benefit.stat}</div>
                      <div className="text-xs uppercase tracking-wider text-gray-500">{benefit.label}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1F2124] mb-4">
              Our World
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A glimpse into our craft, our values, and the beauty we create
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
            <div className="col-span-12 md:col-span-8 row-span-2 group relative overflow-hidden rounded-2xl bg-[#F4EDE6] cursor-pointer">
              <img
                src="https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Beeswax candle making process"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-serif text-3xl text-white mb-2">Handcrafted Excellence</h3>
                <p className="text-white/90 text-sm">Each candle is poured with intention and care</p>
              </div>
            </div>

            <div className="col-span-6 md:col-span-4 row-span-1 group relative overflow-hidden rounded-2xl bg-[#F4EDE6] cursor-pointer">
              <img
                src="https://images.pexels.com/photos/2526105/pexels-photo-2526105.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Natural ingredients"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl text-white">Pure Ingredients</h3>
              </div>
            </div>

            <div className="col-span-6 md:col-span-4 row-span-1 group relative overflow-hidden rounded-2xl bg-[#D69C4A] cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🐝</div>
                  <h3 className="font-serif text-2xl mb-2">Bee Friendly</h3>
                  <p className="text-white/90 text-sm">Supporting sustainable beekeeping</p>
                </div>
              </div>
            </div>

            <div className="col-span-6 md:col-span-5 row-span-2 group relative overflow-hidden rounded-2xl bg-[#F4EDE6] cursor-pointer">
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Aromatherapy experience"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl text-white mb-2">Sensory Journey</h3>
                <p className="text-white/90 text-sm">Luxury fragrances that transform your space</p>
              </div>
            </div>

            <div className="col-span-6 md:col-span-3 row-span-1 group relative overflow-hidden rounded-2xl bg-[#1F2124] cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center text-white">
                  <div className="text-5xl mb-3 font-serif">60+</div>
                  <p className="text-white/90 text-sm uppercase tracking-wider">Burn Hours</p>
                </div>
              </div>
            </div>

            <div className="col-span-6 md:col-span-4 row-span-1 group relative overflow-hidden rounded-2xl bg-[#F4EDE6] cursor-pointer">
              <img
                src="https://images.pexels.com/photos/6620874/pexels-photo-6620874.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sustainable packaging"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl text-white">Eco Packaging</h3>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 row-span-1 group relative overflow-hidden rounded-2xl" style={{ background: 'linear-gradient(135deg, #FFF9F2 0%, #F4EDE6 100%)' }}>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="font-serif text-2xl md:text-3xl text-[#1F2124] italic">
                    "Luxury that honors the earth and elevates the soul"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#D69C4A] to-[#c28a3a] rounded-2xl p-12 md:p-16 text-center text-white">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Build Your Perfect Gift Box
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Create a custom collection of candles, perfumes, and fragrance bars.
              Beautifully packaged and ready to delight.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-white text-[#1F2124] rounded-lg hover:bg-[#FFF9F2] transition-colors font-medium uppercase tracking-wider text-sm"
            >
              Start Customising
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
