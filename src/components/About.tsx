export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1F2124] mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The Bee Empress was born from a simple belief: luxury and sustainability
                are not opposites—they're partners. In 2019, we began our journey in a
                small workshop, hand-pouring candles with ethically sourced beeswax from
                local beekeepers.
              </p>
              <p>
                What started as a passion project has grown into a movement. Today, we work
                with regenerative beekeepers across the country, ensuring that every candle
                supports healthy bee populations and thriving ecosystems.
              </p>
              <p>
                Every product we create is a love letter to nature—meticulously crafted,
                thoughtfully packaged, and designed to bring beauty into your daily rituals.
                We believe that true luxury is knowing exactly where your products come from
                and feeling good about the impact they make.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <blockquote className="text-xl font-serif text-[#D69C4A] italic">
                "We don't just make candles. We create moments of peace, mindfulness, and
                connection to the natural world."
              </blockquote>
              <p className="mt-4 text-sm text-gray-600">— Founder, The Bee Empress</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/making-candles.webp"
              alt="Beeswax candle making"
              className="rounded-lg w-full h-64 object-cover"
            />
            <img
              src="/images/ourstory1.jpg"
              alt="Pouring candles"
              className="rounded-lg w-full h-64 object-cover mt-8"
            />
            <img
              src="/images/luxury.jpg"
              alt="Finished products"
              className="rounded-lg w-full h-64 object-cover"
            />
            <img
              src="/images/beewax.jpeg"
              alt="Bees on honeycomb"
              className="rounded-lg w-full h-64 object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
