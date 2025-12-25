export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-24 bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl md:text-6xl text-[#1F2124] mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            The story of how passion for beeswax became a movement for sustainable luxury
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="font-serif text-4xl text-[#1F2124] mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The Bee Empress was born from a simple belief: luxury and sustainability are not
                opposites—they're partners. In 2019, we began our journey in a small workshop,
                hand-pouring candles with ethically sourced beeswax from local beekeepers.
              </p>
              <p>
                What started as a passion project has grown into a movement. Today, we work with
                regenerative beekeepers across the country, ensuring that every candle supports
                healthy bee populations and thriving ecosystems.
              </p>
              <p>
                Every product we create is a love letter to nature—meticulously crafted, thoughtfully
                packaged, and designed to bring beauty into your daily rituals. We believe that true
                luxury is knowing exactly where your products come from and feeling good about the
                impact they make.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <blockquote className="text-xl font-serif text-[#D69C4A] italic">
                "We don't just make candles. We create moments of peace, mindfulness, and connection
                to the natural world."
              </blockquote>
              <p className="mt-4 text-sm text-gray-600">— Founder, The Bee Empress</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div></div>
            <img
              src="https://images.pexels.com/photos/3688761/pexels-photo-3688761.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Pouring candles"
              className="rounded-lg w-full h-64 object-cover mt-8"
            />
            <img
              src="https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Finished products"
              className="rounded-lg w-full h-64 object-cover"
            />
            <div></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="CEO Portrait"
              className="rounded-2xl w-full h-[500px] object-cover shadow-lg"
            />
          </div>
          <div>
            <h2 className="font-serif text-4xl text-[#1F2124] mb-4">Meet Our CEO</h2>
            <h3 className="text-2xl text-[#D69C4A] mb-6">Chitra</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Chitra founded The Bee Empress with a vision to revolutionize the candle industry by putting sustainability at the heart of luxury. With over 15 years of experience in sustainable product development and a lifelong passion for environmental conservation, she has built The Bee Empress into a beacon of ethical business practices.
              </p>
              <p>
                A former environmental scientist, Sarah spent years researching bee populations and the critical role they play in our ecosystems. This deep understanding drives every decision at The Bee Empress—from the beeswax we source to the partnerships we cultivate.
              </p>
              <p>
                Under her leadership, The Bee Empress has grown from a small workshop to a recognized brand, all while maintaining an unwavering commitment to regenerative practices and bee conservation.
              </p>
            </div>
            <div className="mt-6 p-6 bg-[#FFF9F2] rounded-lg border-l-4 border-[#D69C4A]">
              <p className="text-gray-700 italic">
                "Every product we create is a testament to what's possible when we prioritize the planet alongside profit. We're not just building a business—we're nurturing a movement."
              </p>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="font-serif text-4xl text-[#1F2124] mb-8 text-center">Our Products</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Each collection is thoughtfully designed to bring natural beauty and mindful moments into your daily life
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <img
                src="https://images.pexels.com/photos/3568459/pexels-photo-3568459.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beeswax Candles"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-serif text-2xl text-[#1F2124] mb-3">Beeswax Candles</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our signature collection of hand-poured candles, each one crafted with pure beeswax and natural fragrances. Available in various sizes and scents to suit every space and mood.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <img
                src="https://images.pexels.com/photos/6621392/pexels-photo-6621392.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Solid Perfumes"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-serif text-2xl text-[#1F2124] mb-3">Solid Perfumes</h3>
                <p className="text-gray-600 leading-relaxed">
                  Portable, sustainable luxury in a compact form. Our solid perfumes blend beeswax with essential oils for long-lasting, natural fragrance that travels with you.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <img
                src="https://images.pexels.com/photos/4113778/pexels-photo-4113778.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fragrance Bars"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-serif text-2xl text-[#1F2124] mb-3">Fragrance Bars</h3>
                <p className="text-gray-600 leading-relaxed">
                  Innovative wax bars designed for scent warmers, offering a flameless way to fill your space with natural fragrance. Perfect for offices and homes with pets or children.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F4EDE6] rounded-2xl p-12 md:p-16">
          <h2 className="font-serif text-3xl text-[#1F2124] mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-serif text-xl text-[#D69C4A] mb-3">Craftsmanship</h3>
              <p className="text-gray-700">
                Every candle is hand-poured with meticulous attention to detail. We believe in the
                power of slow, intentional creation.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#D69C4A] mb-3">Sustainability</h3>
              <p className="text-gray-700">
                From sourcing to shipping, every decision is guided by environmental responsibility and
                respect for our planet.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#D69C4A] mb-3">Transparency</h3>
              <p className="text-gray-700">
                We're committed to knowing and sharing exactly where our materials come from and the
                impact of our work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
