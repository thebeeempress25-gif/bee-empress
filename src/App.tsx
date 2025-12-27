import { useState, useEffect } from 'react';
import { supabase, type Product } from './lib/supabase';
import { getSessionId, type CartItemWithProduct } from './lib/cart';
import { getWishlist } from './lib/wishlist';
import Header from './components/Header';
import Footer from './components/Footer';
import MiniCart from './components/MiniCart';
import QuickView from './components/QuickView';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CandlesPage from './pages/CandlesPage';
import SolidPerfumesPage from './pages/SolidPerfumesPage';
import FragranceBarsPage from './pages/FragranceBarsPage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import SustainabilityPage from './pages/SustainabilityPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import DeliveryReturnsPage from './pages/DeliveryReturnsPage';

type PageParams = Record<string, string>;

type PageState = {
  name: string;
  params?: PageParams;
};

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>({ name: 'home' });
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');

  useEffect(() => {
    fetchCart();
    fetchWishlistCount();
  }, []);

  async function fetchWishlistCount() {
    const wishlistIds = await getWishlist();
    setWishlistCount(wishlistIds.length);
  }

  function navigateTo(page: string, params?: PageParams) {
    setCurrentPage({ name: page, params });
    window.scrollTo(0, 0);
  }

  async function fetchCart() {
    const sessionId = getSessionId();
    const { data } = await supabase
      .from('cart_items')
      .select(`
        id,
        product_id,
        quantity,
        gift_wrap,
        products (name, price, images, slug)
      `)
      .eq('session_id', sessionId);

    if (data) {
      const formattedItems: CartItemWithProduct[] = data.map((item) => {
        const productsRaw = (Array.isArray(item.products) ? item.products[0] : item.products) as Record<string, unknown>;
        return {
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity as number,
          gift_wrap: item.gift_wrap as boolean,
          product: {
            name: (productsRaw?.name as string) || '',
            price: (productsRaw?.price as number) || 0,
            images: (productsRaw?.images as string[]) || [],
            slug: (productsRaw?.slug as string) || '',
          },
        };
      });
      setCartItems(formattedItems);
    }
  }

  async function addToCart(productId: string, quantity: number = 1) {
    const sessionId = getSessionId();

    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('session_id', sessionId)
      .eq('product_id', productId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('cart_items')
        .insert([{ session_id: sessionId, product_id: productId, quantity }]);
    }

    fetchCart();
    showToast('Added to cart!');
  }

  async function updateCartQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    fetchCart();
  }

  async function removeFromCart(itemId: string) {
    await supabase.from('cart_items').delete().eq('id', itemId);
    fetchCart();
  }

  function showToast(message: string) {
    const toast = document.createElement('div');
    toast.className =
      'fixed top-24 right-4 bg-[#D69C4A] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  function handleCheckout() {
    navigateTo('checkout');
  }

  function handleCheckoutComplete(orderNum: string) {
    setOrderNumber(orderNum);
    setCartItems([]);
    navigateTo('order-confirmation');
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage.name) {
      case 'home':
        return (
          <HomePage
            onQuickView={setQuickViewProduct}
            onAddToCart={addToCart}
            onNavigate={navigateTo}
          />
        );
      case 'shop':
        return (
          <ShopPage
            onQuickView={setQuickViewProduct}
            onAddToCart={addToCart}
            onNavigate={navigateTo}
          />
        );
      case 'candles':
        return (
          <CandlesPage
            onQuickView={setQuickViewProduct}
            onAddToCart={addToCart}
            onNavigate={navigateTo}
            initialCollection={currentPage.params?.collection}
          />
        );
      case 'solid-perfumes':
        return (
          <SolidPerfumesPage
            onQuickView={setQuickViewProduct}
            onAddToCart={addToCart}
            onNavigate={navigateTo}
          />
        );
      case 'fragrance-bars':
        return (
          <FragranceBarsPage
            onQuickView={setQuickViewProduct}
            onAddToCart={addToCart}
            onNavigate={navigateTo}
          />
        );
      case 'collection':
        return (
          <CollectionPage
            slug={currentPage.params?.slug || 'luxury'}
            onQuickView={setQuickViewProduct}
            onAddToCart={addToCart}
            onNavigate={navigateTo}
          />
        );
      case 'product':
        return (
          <ProductDetailPage
            slug={currentPage.params?.slug || ''}
            onAddToCart={addToCart}
            onNavigate={navigateTo}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'sustainability':
        return <SustainabilityPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return (
          <CartPage
            items={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onNavigate={navigateTo}
            onCheckout={handleCheckout}
          />
        );
      case 'wishlist':
        return (
          <WishlistPage
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            onWishlistChange={fetchWishlistCount}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage
            items={cartItems}
            onNavigate={navigateTo}
            onCheckoutComplete={handleCheckoutComplete}
          />
        );
      case 'order-confirmation':
        return <OrderConfirmationPage orderNumber={orderNumber} onNavigate={navigateTo} />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'delivery-returns':
        return <DeliveryReturnsPage />;
      default:
        return (
          <HomePage
            onQuickView={setQuickViewProduct}
            onAddToCart={addToCart}
            onNavigate={navigateTo}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2]">
      <Header
        cartItemCount={cartItemCount}
        wishlistCount={wishlistCount}
        onCartClick={() => navigateTo('cart')}
        onWishlistClick={() => navigateTo('wishlist')}
        onNavigate={navigateTo}
      />

      <main>{renderPage()}</main>

      <Footer onNavigate={navigateTo} />

      <MiniCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          navigateTo('cart');
        }}
      />

      <QuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(id, qty) => {
          addToCart(id, qty);
          setQuickViewProduct(null);
        }}
        onNavigate={navigateTo}
      />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
