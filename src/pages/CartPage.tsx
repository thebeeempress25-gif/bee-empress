import { ArrowLeft, Trash2 } from 'lucide-react';
import type { CartItemWithProduct } from '../lib/cart';

type CartPageProps = {
  items: CartItemWithProduct[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onNavigate: (page: string) => void;
  onCheckout?: () => void;
};

export default function CartPage({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  onCheckout,
}: CartPageProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 1500 ? 0 : 50;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-12 bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6] border-b">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-2 text-[#D69C4A] hover:text-[#1F2124] transition-colors text-sm uppercase tracking-wider mb-4"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </button>
          <h1 className="font-serif text-5xl md:text-6xl text-[#1F2124]">Shopping Cart</h1>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F4EDE6] rounded-full mb-6">
                <span className="text-4xl">🛒</span>
              </div>
            </div>
            <h2 className="font-serif text-2xl text-[#1F2124] mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start adding your favorite products to get started</p>
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-4 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-colors font-medium uppercase tracking-wider text-sm"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 p-6 bg-[#F4EDE6] rounded-xl border border-gray-200"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg bg-white"
                    />

                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-[#1F2124] mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {item.gift_wrap && <span>Gift wrap included • </span>}
                        SKU: {item.product_id.slice(0, 8)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-fit">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white transition-colors"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="font-serif text-lg text-[#1F2124]">
                            Rs {(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-[#F4EDE6] rounded-xl border border-gray-200">
                <h3 className="font-serif text-lg text-[#1F2124] mb-4">Shipping & Delivery</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Standard shipping: 5-7 business days</p>
                  <p className="text-[#8A9A5B] font-medium">
                    Free shipping on orders over Rs 1500
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#F4EDE6] rounded-xl p-8 border border-gray-200 sticky top-24">
                <h2 className="font-serif text-2xl text-[#1F2124] mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-[#1F2124]">Rs {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium text-[#1F2124]">Rs {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-[#1F2124]">
                      {shipping === 0 ? 'FREE' : `Rs ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-serif text-lg text-[#1F2124]">Total</span>
                  <span className="font-serif text-2xl text-[#D69C4A]">Rs {total.toFixed(2)}</span>
                </div>

                {subtotal < 1500 && subtotal > 0 && (
                  <p className="text-xs text-[#8A9A5B] font-medium mb-6 p-3 bg-white rounded">
                    Add Rs {(1500 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}

                <button
                  onClick={onCheckout}
                  className="w-full py-4 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-colors font-medium uppercase tracking-wider mb-4"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full py-3 border border-gray-300 rounded-lg hover:bg-white transition-colors text-sm uppercase tracking-wider font-medium"
                >
                  Continue Shopping
                </button>

                <div className="mt-6 pt-6 border-t border-gray-300 space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Eco-friendly packaging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Ethically sourced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
