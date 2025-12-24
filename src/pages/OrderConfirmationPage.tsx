import { CheckCircle, Package, Mail } from 'lucide-react';

type OrderConfirmationPageProps = {
  orderNumber: string;
  onNavigate: (page: string) => void;
};

export default function OrderConfirmationPage({
  orderNumber,
  onNavigate,
}: OrderConfirmationPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1F2124] mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-2">Thank you for your purchase</p>
          <p className="text-sm text-gray-500">
            Order Number: <span className="font-mono font-semibold text-[#D69C4A]">{orderNumber}</span>
          </p>
        </div>

        <div className="bg-[#F4EDE6] rounded-xl p-8 border border-gray-200 mb-8">
          <h2 className="font-serif text-2xl text-[#1F2124] mb-6">What happens next?</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Mail className="text-[#D69C4A]" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-[#1F2124] mb-1">Order Confirmation Email</h3>
                <p className="text-sm text-gray-600">
                  You'll receive an email confirmation with your order details shortly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Package className="text-[#D69C4A]" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-[#1F2124] mb-1">Processing & Shipping</h3>
                <p className="text-sm text-gray-600">
                  We'll carefully prepare your order and ship it within 2-3 business days.
                  You'll receive tracking information once shipped.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <CheckCircle className="text-[#D69C4A]" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-[#1F2124] mb-1">Delivery</h3>
                <p className="text-sm text-gray-600">
                  Standard delivery takes 5-7 business days. All our products are
                  carefully packaged in eco-friendly materials.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6] rounded-xl p-8 border border-gray-200 mb-8">
          <h3 className="font-serif text-xl text-[#1F2124] mb-3">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            If you have any questions about your order, please don't hesitate to contact us.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-2 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-colors text-sm font-medium"
          >
            Contact Support
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-3 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-colors font-medium uppercase tracking-wider"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-[#F4EDE6] transition-colors font-medium uppercase tracking-wider"
          >
            Browse Products
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-4">
            We appreciate your trust in The Bee Empress. Every purchase supports
            sustainable beekeeping and environmental conservation.
          </p>
          <div className="flex justify-center gap-8 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>100% Natural</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Ethically Sourced</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Eco-Friendly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
