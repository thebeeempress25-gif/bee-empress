import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.pexels.com/photos/4040596/pexels-photo-4040596.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Luxury beeswax candles'
  },
  {
    image: 'https://images.pexels.com/photos/3737582/pexels-photo-3737582.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Handcrafted candles in elegant setting'
  },
  {
    image: 'https://images.pexels.com/photos/4040590/pexels-photo-4040590.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Natural beeswax candle collection'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F2] via-[#F4EDE6] to-[#FFF9F2]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 opacity-30 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-30' : 'opacity-0'
              }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-[#1F2124]" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-[#1F2124]" />
      </button>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1F2124] mb-6 leading-tight">
          Luxury in Every Flame
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
          Hand-poured beeswax candles, solid perfumes, and fragrance bars.
          Ethically sourced. Sustainably crafted. Timelessly beautiful.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#shop"
            className="px-8 py-4 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-all duration-300 hover:shadow-lg font-medium uppercase tracking-wider text-sm"
          >
            Shop Candles
          </a>
          <a
            href="#about"
            className="px-8 py-4 bg-transparent border-2 border-[#1F2124] text-[#1F2124] rounded-lg hover:bg-[#1F2124] hover:text-white transition-all duration-300 font-medium uppercase tracking-wider text-sm"
          >
            Our Story
          </a>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-[#D69C4A] w-8'
                : 'bg-white/60 hover:bg-white/80'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
  );
}
