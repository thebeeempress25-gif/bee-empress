import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, MessageCircle } from 'lucide-react';

type HeaderProps = {
  cartItemCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function Header({ cartItemCount, wishlistCount, onCartClick, onWishlistClick, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', page: 'home' },
    { name: 'Shop', page: 'shop' },
    { name: 'About', page: 'about' },
    { name: 'Sustainability', page: 'sustainability' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <>
      <div className="bg-[#D69C4A] text-[#1F2124] text-center py-2 px-4 text-sm">
        Free shipping on orders over $100 · Sustainably sourced beeswax
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex-shrink-0">
              <button
                onClick={() => onNavigate('home')}
                className="group relative text-2xl font-serif text-[#1F2124] hover:text-[#D69C4A] transition-colors"
              >
                <span>The Bee Empress</span>
                <img
                  src="/images/bee-icon.png"
                  alt=""
                  className="absolute -top-3 -right-6 w-7 h-7 pointer-events-none transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 mix-blend-multiply"
                />
              </button>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.page)}
                  className="text-[#1F2124] hover:text-[#D69C4A] transition-colors text-sm uppercase tracking-wider"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={onWishlistClick}
                className="relative p-2 hover:text-[#D69C4A] transition-colors"
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D69C4A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-[#D69C4A] transition-colors hidden sm:block"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>

              <button
                onClick={onCartClick}
                className="relative p-2 hover:text-[#D69C4A] transition-colors"
                aria-label={`Cart with ${cartItemCount} items`}
              >
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D69C4A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col py-4 px-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMenuOpen(false);
                  }}
                  className="py-3 text-[#1F2124] hover:text-[#D69C4A] transition-colors uppercase tracking-wider text-sm text-left"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}

      </header>
    </>
  );
}
