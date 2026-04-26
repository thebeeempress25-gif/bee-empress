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
                Born from silence. Crafted with intention.
                Illuminated by purpose.
                Rooted in the sacred stillness of Almora, Uttarakhand, and refined in the contemporary elegance of Gurgaon, our brand is where ancient wisdom meets modern luxury.
                This journey began when Chitra chose to step away from the noise of corporate life and return to the essence of being slowness, spirituality, and soulful creation. Guided by ritual, reverence for nature, and the transformative power of light, she founded a brand devoted to artisanal beeswax candles and solid perfumes.
              </p>
              <p>
                We are honored to create the first pure beeswax solid perfume collection, blending rare, fresh fragrances with the purity of nature’s most sacred wax. Each piece is hand-poured, slow-crafted, and energetically cleansed, designed not merely to scent a space—but to elevate it.
              </p>
              <p>Our creations are:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Symbols of light and awakening</li>
                <li>Expressions of understated luxury</li>
                <li>Sacred objects for modern rituals</li>
              </ul>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <blockquote className="text-xl font-serif text-[#D69C4A] italic">
                We believe true luxury is intentional, ethical, and soulful.
                Every flame carries warmth. Every fragrance holds prayer.
                This is not indulgence.
                This is devotion, made luminous.
              </blockquote>
              <p className="mt-4 text-sm text-gray-600">— Founder, The Bee Empress</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div></div>
            <img
              src="/images/ourstory1.jpg"
              alt="Pouring candles"
              className="rounded-lg w-full h-64 object-cover mt-8"
            />
            <img
              src="/images/golden _oud_Arabia_3.png"
              alt="Finished products"
              className="rounded-lg w-full h-64 object-cover"
            />
            <div></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <img
              src="/images/chitra.jpg"
              alt="CEO Portrait"
              className="rounded-2xl w-full h-[500px] object-cover shadow-lg"
            />
          </div>
          <div>
            <h2 className="font-serif text-4xl text-[#1F2124] mb-4">
              Meet Our CEO
            </h2>

            <h3 className="text-2xl text-[#D69C4A] mb-1">
              Chitra
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              Founder | Artisan | Spiritual Visionary
            </p>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Born in the tranquil Himalayan town of Almora, Uttarakhand, and now living in Gurgaon, Chitra embodies a life lived between serenity and sophistication.
                Her early years, surrounded by mountains, temples, and silence, deeply shaped her spiritual sensibility. Though her professional path led her into the corporate world, her soul longed for creation rooted in meaning rather than momentum.
              </p>

              <p>
                Answering that call, Chitra left corporate life to devote herself to handcrafted luxury infused with spirituality. Her work is inspired by sacred rituals, mindful living, and the belief that light and fragrance can shift energy, heal emotions, and awaken presence.
                As the creator of the first pure beeswax solid perfume line, Chitra blends ancient traditions with modern elegance—creating sensorial experiences that feel intimate, elevated, and timeless.
              </p>
            </div>

            {/* Philosophy Section */}
            <div className="mt-6">
              <p className="font-medium text-[#1F2124] mb-3">
                Her philosophy is simple yet profound:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Luxury must feel pure</li>
                <li>Fragrance must feel alive</li>
                <li>Light must feel sacred</li>
              </ul>
            </div>

            {/* Closing Thought */}
            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Every creation reflects her intention to serve as a gentle guide—a flame in moments of stillness, a fragrance in moments of becoming.
              </p>

              <p>
                Chitra’s purpose is not just to create products, but to create experiences of calm, clarity, and inner radiance.
              </p>
            </div>

            {/* Quote */}
            <div className="mt-6 p-6 bg-[#FFF9F2] rounded-lg border-l-4 border-[#D69C4A]">
              <p className="text-gray-700 italic">
                “To be a light for others—quietly, consciously, beautifully.”
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
                src="/images/luxury.jpg"
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
                src="/images/ancient_essence_musk.jpg"
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
                src="/images/classic_fresh_1.jpg"
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
