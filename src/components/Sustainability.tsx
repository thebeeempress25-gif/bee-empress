import { Leaf, Users, Recycle, Factory } from 'lucide-react';

export default function Sustainability() {
  const initiatives = [
    {
      icon: Leaf,
      title: 'Ethical Sourcing',
      description:
        'We partner exclusively with regenerative beekeepers who prioritize bee health over profit. No pesticides, no harmful chemicals, no shortcuts.',
    },
    {
      icon: Users,
      title: 'Beekeeper Partnerships',
      description:
        'Fair wages, transparent relationships, and long-term commitments. Our beekeepers are family, and we grow together.',
    },
    {
      icon: Recycle,
      title: 'Zero Waste',
      description:
        'Reusable glass containers, recyclable packaging, and a take-back program. Every material is chosen with circularity in mind.',
    },
    {
      icon: Factory,
      title: 'Clean Manufacturing',
      description:
        'Hand-poured in small batches, powered by renewable energy. We measure and offset our carbon footprint annually.',
    },
  ];

  return (
    <section id="sustainability" className="py-24 bg-[#FFF9F2]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F2124] mb-4">
            Our Commitment
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sustainability isn't a buzzword for us—it's woven into every decision we make.
            From hive to home, we're building a better future for bees, beekeepers, and our planet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {initiatives.map((initiative) => (
            <div
              key={initiative.title}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#8A9A5B] rounded-lg flex items-center justify-center">
                  <initiative.icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-[#1F2124] mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{initiative.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#8A9A5B] text-white rounded-2xl p-12 text-center">
          <h3 className="font-serif text-3xl mb-4">Our Impact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl font-serif mb-2">10%</div>
              <div className="text-sm text-white/90">
                of profits to bee conservation
              </div>
            </div>
            <div>
              <div className="text-4xl font-serif mb-2">50+</div>
              <div className="text-sm text-white/90">
                beekeeper families supported
              </div>
            </div>
            <div>
              <div className="text-4xl font-serif mb-2">100%</div>
              <div className="text-sm text-white/90">
                carbon neutral operations
              </div>
            </div>
          </div>
          <p className="mt-8 text-white/90 max-w-2xl mx-auto">
            Every candle you buy plants wildflowers and supports pesticide-free habitats.
            Together, we're creating a world where bees thrive.
          </p>
        </div>
      </div>
    </section>
  );
}
