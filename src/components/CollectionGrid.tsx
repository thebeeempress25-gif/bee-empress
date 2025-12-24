import type { Collection } from '../lib/supabase';

type CollectionGridProps = {
  collections: Collection[];
};

export default function CollectionGrid({ collections }: CollectionGridProps) {
  return (
    <section className="py-24 bg-white">
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
            <a
              key={collection.id}
              href={`#collection/${collection.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-[#F4EDE6]"
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
