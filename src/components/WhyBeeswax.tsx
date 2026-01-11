export default function WhyBeeswax() {
  const benefits = [
    {
      title: 'Naturally Purifies the Air',
      description: 'When lit, beeswax gently releases negative ions that help neutralize airborne impurities and Odors, creating a cleaner, calmer space.',
      image: 'https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Unparalleled Burn Time',
      description: 'With its naturally high melting point, beeswax burns slower and longer, offering enduring beauty and exceptional value.',
      image: 'https://images.pexels.com/photos/4040610/pexels-photo-4040610.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Immaculate, Clean Flame',
      description: 'Beeswax candles burn with remarkable purity, producing virtually no smoke or soot.',
      image: 'https://images.pexels.com/photos/6945095/pexels-photo-6945095.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Pure, Natural & Non-Toxic',
      description: 'Free from petroleum, additives, and synthetic chemicals — only nature, as intended.',
      image: 'https://images.pexels.com/photos/3568459/pexels-photo-3568459.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'A Subtle Signature Aroma',
      description: 'A delicate, honeyed scent lingers naturally, even without added fragrance.',
      image: 'https://images.pexels.com/photos/4040596/pexels-photo-4040596.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Sustainably Luxurious',
      description: 'Renewable, biodegradable, and supportive of beekeeping traditions that nurture our planet.',
      image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#F4EDE6] to-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1F2124] mb-4">
            The Beeswax Difference
          </h2>
          <p className="font-serif text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Beeswax is nature's most exquisite candle wax, treasured for centuries by royalty, temples, and artisans alike. Crafted by honeybees and perfected by nature, beeswax is entirely pure and minimally processed, unlike modern waxes derived from petroleum or heavily refined plants. Its warm golden glow, clean-burning flame, and subtle natural honey aroma create an atmosphere of quiet luxury and well-being. Choosing beeswax is a return to authenticity — a celebration of craftsmanship, sustainability, and timeless elegance.
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

      </div>
    </section>
  );
}
