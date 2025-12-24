export default function WhyBeeswax() {
  const benefits = [
    {
      title: 'Air Purifying',
      description: 'Releases negative ions that naturally cleanse your air and remove pollutants',
      image: 'https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Long Burning',
      description: '60+ hours of clean, smoke-free burn time with a natural honey scent',
      image: 'https://images.pexels.com/photos/4040610/pexels-photo-4040610.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Ethically Sourced',
      description: 'Supporting regenerative beekeeping practices and healthy bee populations',
      image: 'https://images.pexels.com/photos/6945095/pexels-photo-6945095.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Natural & Non-Toxic',
      description: 'Free from synthetic fragrances, petroleum products, and harmful chemicals',
      image: 'https://images.pexels.com/photos/3568459/pexels-photo-3568459.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Brighter Flame',
      description: 'Burns with a warm, natural light similar to sunlight for a cozy atmosphere',
      image: 'https://images.pexels.com/photos/4040596/pexels-photo-4040596.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Biodegradable',
      description: '100% renewable and returns to nature without leaving harmful residue',
      image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#F4EDE6] to-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F2124] mb-4">
            Why Beeswax?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nature's most perfect wax, transformed into luxury you can feel good about
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-72">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-serif text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/90 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="font-serif text-3xl text-[#1F2124] mb-6">The Beeswax Difference</h3>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              Unlike paraffin or soy candles, beeswax is a natural byproduct of honey production. It burns cleaner,
              lasts longer, and actually improves your indoor air quality. When you choose beeswax, you're not just
              getting a superior candle—you're supporting sustainable beekeeping and protecting our planet's most
              important pollinators.
            </p>
            <div className="inline-block bg-[#FFF9F2] px-6 py-3 rounded-lg border-l-4 border-[#D69C4A]">
              <p className="text-[#D69C4A] font-serif text-lg">
                Nature's gift, crafted with care
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
