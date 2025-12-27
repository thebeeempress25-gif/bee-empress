import { useState } from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { supabase } from '../lib/supabase';

type FooterProps = {
  onNavigate: (page: string) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) throw error;
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-[#1F2124] text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-serif text-2xl mb-4">The Bee Empress</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Luxury beeswax candles, solid perfumes, and fragrance bars.
              Ethically sourced, sustainably crafted.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D69C4A] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D69C4A] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D69C4A] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => onNavigate('collection')} className="hover:text-[#D69C4A] transition-colors text-left">Candles</button></li>
              <li><button onClick={() => onNavigate('collection')} className="hover:text-[#D69C4A] transition-colors text-left">Solid Perfumes</button></li>
              <li><button onClick={() => onNavigate('collection')} className="hover:text-[#D69C4A] transition-colors text-left">Fragrance Bars</button></li>
              <li><button onClick={() => onNavigate('shop')} className="hover:text-[#D69C4A] transition-colors text-left">All Products</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Learn</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => onNavigate('about')} className="hover:text-[#D69C4A] transition-colors text-left">About Us</button></li>
              <li><button onClick={() => onNavigate('sustainability')} className="hover:text-[#D69C4A] transition-colors text-left">Sustainability</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-[#D69C4A] transition-colors text-left">Blog</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-[#D69C4A] transition-colors text-left">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Join our hive for 10% off your first order
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-4 py-2 bg-[#D69C4A] text-[#1F2124] rounded-lg hover:bg-[#c28a3a] transition-colors disabled:opacity-50 font-medium"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
              {status === 'success' && (
                <p className="text-green-400 text-sm">Check your email for your coupon!</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm">Already subscribed or error occurred</p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2024 The Bee Empress. All rights reserved.</p>
            <div className="flex gap-6">
              <button onClick={() => onNavigate('terms')} className="hover:text-[#D69C4A] transition-colors text-left">Terms & Conditions</button>
              <button onClick={() => onNavigate('privacy')} className="hover:text-[#D69C4A] transition-colors text-left">Privacy Policy</button>
              <button onClick={() => onNavigate('delivery-returns')} className="hover:text-[#D69C4A] transition-colors text-left">Delivery & Returns</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
