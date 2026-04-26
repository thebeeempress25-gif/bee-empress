import { useEffect, useState } from 'react';
import { getProducts, getCollections, type Product, type Collection } from '../lib/data';
import ProductCard from '../components/ProductCard';
import { getCollectionTags, getCollectionTagline } from '../utils/collectionAttributes';

type HomePageProps = {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (productId: string, quantity: number) => void;
};

export default function HomePage({ onNavigate, onQuickView, onAddToCart }: HomePageProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsData = getProducts().filter(p => p.is_featured && p.is_active).slice(0, 4);
    const collectionsData = getCollections().sort((a, b) => a.display_order - b.display_order);

    setFeaturedProducts(productsData);
    setCollections(collectionsData);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-55"
          >
            <source
              src="/images/1000126824-vmake.mp4"
              type="video/mp4"
            />
            {/* Fallback image if video doesn't load */}
            <img
              src="/images/luxury.jpg"
              alt="Luxury beeswax candles"
              className="w-full h-full object-cover"
            />
          </video>
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-lg">
            Pure Beeswax, Timeless Luxury
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Hand-poured candles crafted with 100% natural beeswax, sustainable practices, and a
            commitment to the hive
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-4 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-all duration-300 font-medium uppercase tracking-wider text-sm hover:shadow-2xl hover:scale-105"
            >
              Shop Candles
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#1F2124] transition-all duration-300 font-medium uppercase tracking-wider text-sm hover:shadow-2xl hover:scale-105"
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
            <p className="font-serif text-lg text-gray-600 max-w-2xl mx-auto">
              Each collection tells a story of craftsmanship, sustainability & timeless luxury
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.slice(0, 3).map((collection) => {
              const tags = getCollectionTags(collection.slug);
              const tagline = getCollectionTagline(collection.slug);

              return (
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
                    <p className="text-sm text-white/90 mb-4">{tagline || collection.description}</p>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="inline-block text-sm uppercase tracking-wider border-b-2 border-[#D69C4A] pb-1">
                      Explore Collection
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1F2124] mb-4">
              Best Sellers
            </h2>
            <p className="font-serif text-lg text-gray-600">
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
              <p className="font-serif text-lg text-gray-700 leading-relaxed mb-6">
                Beeswax is nature's most exquisite candle wax, treasured for centuries by royalty, temples, and artisans alike. Crafted by honeybees and perfected by nature, beeswax is entirely pure and minimally processed, unlike modern waxes derived from petroleum or heavily refined plants.
              </p>
              <p className="font-serif text-gray-600 leading-relaxed mb-8">
                Its warm golden glow, clean-burning flame, and subtle natural honey aroma create an atmosphere of quiet luxury and well-being. Choosing beeswax is a return to authenticity — a celebration of craftsmanship, sustainability, and timeless elegance.
              </p>
              <div className="w-24 h-1 bg-[#D69C4A]"></div>
            </div>
            <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/beewax.jpeg"
                alt="Natural beeswax honeycomb"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Naturally Purifies the Air',
                description: 'When lit, beeswax gently releases negative ions that help neutralize airborne impurities and Odors, creating a cleaner, calmer space.',
                stat: '100%',
                label: 'Natural'
              },
              {
                title: 'Unparalleled Burn Time',
                description: 'With its naturally high melting point, beeswax burns slower and longer, offering enduring beauty and exceptional value.',
                stat: '60+',
                label: 'Hours'
              },
              {
                title: 'Immaculate, Clean Flame',
                description: 'Beeswax candles burn with remarkable purity, producing virtually no smoke or soot.',
                stat: '0%',
                label: 'Soot'
              },
              {
                title: 'Pure, Natural & Non-Toxic',
                description: 'Free from petroleum, additives, and synthetic chemicals — only nature, as intended.',
                stat: '100%',
                label: 'Pure'
              },
              {
                title: 'A Subtle Signature Aroma',
                description: 'A delicate, honeyed scent lingers naturally, even without added fragrance.',
                stat: '✓',
                label: 'Natural Scent'
              },
              {
                title: 'Sustainably Luxurious',
                description: 'Renewable, biodegradable, and supportive of beekeeping traditions that nurture our planet.',
                stat: '♻',
                label: 'Eco-Friendly'
              },
            ].map((benefit) => (
              <div key={benefit.title} className="group">
                <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif text-[#1F2124] mb-2">{benefit.title}</h3>
                    <div className="w-12 h-0.5 bg-[#D69C4A] group-hover:w-20 transition-all duration-300"></div>
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
            <p className="font-serif text-lg text-gray-600 max-w-2xl mx-auto">
              A glimpse into our craft, our values & the beauty we create.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
            <div className="col-span-12 md:col-span-8 row-span-2 group relative overflow-hidden rounded-2xl bg-[#F4EDE6] cursor-pointer">
              <img
                src="/images/making-candles.webp"
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
                src="/images/beewaxxx.jpg"
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
                src="/images/smell.jpg"
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
                src="/images/package.jpg"
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
            <button className="px-8 py-4 bg-white text-[#1F2124] rounded-lg hover:bg-[#FFF9F2] transition-colors font-medium uppercase tracking-wider text-sm">
              Start Building
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
