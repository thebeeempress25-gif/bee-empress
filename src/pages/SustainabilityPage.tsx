import { Leaf, Users, Recycle, Factory } from 'lucide-react';

export default function SustainabilityPage() {
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
    <div className="min-h-screen bg-white">
      <section className="relative py-24 bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl md:text-6xl text-[#1F2124] mb-4">
            Our Commitment to Sustainability
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Building a future where luxury and environmental responsibility go hand in hand
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-24">
          <h2 className="font-serif text-4xl text-[#1F2124] mb-4">Our Initiatives</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sustainability isn't a buzzword for us—it's woven into every decision we make. From hive to
            home, we're building a better future for bees, beekeepers, and our planet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {initiatives.map((initiative) => (
            <div
              key={initiative.title}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#8A9A5B] rounded-lg flex items-center justify-center">
                  <initiative.icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-[#1F2124] mb-2">{initiative.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{initiative.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-24">
          <h2 className="font-serif text-4xl text-[#1F2124] mb-8 text-center">Our Sustainable Journey</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="https://images.pexels.com/photos/2478355/pexels-photo-2478355.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Bees on honeycomb"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-2xl font-serif text-white mb-2">Protecting Bee Habitats</h3>
                  <p className="text-white/90">Working directly with beekeepers to create thriving ecosystems</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="https://images.pexels.com/photos/4040596/pexels-photo-4040596.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Candle making process"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-2xl font-serif text-white mb-2">Artisan Craftsmanship</h3>
                  <p className="text-white/90">Hand-poured in small batches with renewable energy</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sustainable packaging"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-2xl font-serif text-white mb-2">Zero Waste Packaging</h3>
                  <p className="text-white/90">Reusable containers and fully recyclable materials</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Wildflower meadow"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-2xl font-serif text-white mb-2">Wildflower Restoration</h3>
                  <p className="text-white/90">Every purchase helps plant native wildflowers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#8A9A5B] text-white rounded-2xl p-12 md:p-16 text-center">
          <h3 className="font-serif text-4xl md:text-5xl mb-12">Our Impact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-serif mb-4">10%</div>
              <div className="text-lg text-white/90">of profits to bee conservation</div>
            </div>
            <div>
              <div className="text-5xl font-serif mb-4">50+</div>
              <div className="text-lg text-white/90">beekeeper families supported</div>
            </div>
            <div>
              <div className="text-5xl font-serif mb-4">100%</div>
              <div className="text-lg text-white/90">carbon neutral operations</div>
            </div>
          </div>
          <p className="mt-12 text-white/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Every candle you buy plants wildflowers and supports pesticide-free habitats. Together,
            we're creating a world where bees thrive.
          </p>
        </div>

        <div className="mt-24 bg-[#F4EDE6] rounded-2xl p-12 md:p-16">
          <h2 className="font-serif text-3xl text-[#1F2124] mb-8">Why Beeswax?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-xl text-[#D69C4A] mb-4">Environmental Benefits</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-[#D69C4A]">✓</span>
                  <span>100% renewable and biodegradable</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#D69C4A]">✓</span>
                  <span>Purifies air by releasing negative ions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#D69C4A]">✓</span>
                  <span>Carbon-neutral production</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#D69C4A]">✓</span>
                  <span>No petroleum byproducts</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#D69C4A] mb-4">Why Not Paraffin?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-red-400">✗</span>
                  <span>Petroleum-derived synthetic wax</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400">✗</span>
                  <span>Releases toxins when burned</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400">✗</span>
                  <span>Not biodegradable</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400">✗</span>
                  <span>Harmful to water systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="font-serif text-4xl text-[#1F2124] mb-8 text-center">Our Beekeeper Partners</h2>
          <p className="text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto text-center text-lg">
            We're proud to work with family-owned beekeeping operations across the country. Each
            partner shares our commitment to regenerative practices, bee welfare, and environmental
            stewardship.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img
                src="https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beekeeper with hive"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-serif text-xl text-[#1F2124] mb-2">Mountain Meadow Apiaries</h3>
                <p className="text-gray-600 text-sm mb-2">Colorado • Family-owned since 1987</p>
                <p className="text-gray-700 leading-relaxed">
                  Specializing in high-altitude wildflower honey and regenerative beekeeping practices that restore native habitats.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img
                src="https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Bee farm landscape"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-serif text-xl text-[#1F2124] mb-2">Pacific Coast Bees</h3>
                <p className="text-gray-600 text-sm mb-2">Oregon • Certified Organic</p>
                <p className="text-gray-700 leading-relaxed">
                  Three generations of sustainable beekeeping, focused on coastal wildflower varieties and pollinator health.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img
                src="https://images.pexels.com/photos/6945095/pexels-photo-6945095.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beekeepers working"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-serif text-xl text-[#1F2124] mb-2">Heartland Honey Co.</h3>
                <p className="text-gray-600 text-sm mb-2">Iowa • Pesticide-Free</p>
                <p className="text-gray-700 leading-relaxed">
                  Committed to chemical-free hive management and working with local farmers to create bee-friendly landscapes.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6] rounded-2xl p-10 border border-gray-200">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xl text-gray-700 italic mb-4 font-serif">
                "Partnership, not just supply chain."
              </p>
              <p className="text-gray-600">
                By choosing The Bee Empress, you're directly supporting these dedicated families and their mission to create thriving habitats for bees across America.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
