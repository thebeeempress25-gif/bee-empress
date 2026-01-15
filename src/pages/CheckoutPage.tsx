import { useState } from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';
import type { CartItemWithProduct } from '../lib/cart';


type CheckoutPageProps = {
  items: CartItemWithProduct[];
  onNavigate: (page: string) => void;
  onCheckoutComplete: (orderNumber: string) => void;
};

export default function CheckoutPage({
  items,
  onNavigate,
  onCheckoutComplete,
}: CheckoutPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    shippingPhone: '',
  });
  const [onlinePayment, setOnlinePayment] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.price; // Use actual price for calculations
    return sum + price * item.quantity;
  }, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal >= 1500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };




  const handelPaymentMarchent = async () => {

    const textdate = new Date();
    const dd = String(textdate.getDate()).padStart(2, '0');
    const mm = String(textdate.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = textdate.getFullYear();
    const hh = String(textdate.getHours()).padStart(2, '0');
    const min = String(textdate.getMinutes()).padStart(2, '0');
    const ss = String(textdate.getSeconds()).padStart(2, '0');

    const formattedDate = yyyy + mm + dd + hh + min + ss;
    console.log("formattedDate", formattedDate);

    const rendome12digit = Math.floor(100000000000 + Math.random() * 900000000000);
    console.log("rendome12digit", rendome12digit.toString());

    const requestPayload = {
      merchantId: "100000000007164",
      aggregatorID: "A100000000007164",
      merchantTxnNo: rendome12digit.toString(),
      amount: total.toFixed(2).toString(),
      currencyCode: "356",
      payType: "0",
      customerEmailID: formData.customerEmail,
      transactionType: "SALE",
      returnURL: "https://pgpayuat.icicibank.com/tsp/pg/api/merchant",
      txnDate: formattedDate,
      customerMobileNo: formData.customerPhone,
      customerName: formData.customerName,
      addlParam1: "000",
      addlParam2: "111",

    };



    const res = await fetch('http://localhost:3000/api/generate-hash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });

    const data = await res.json();
    console.log("Hash Response from backend:", data);


    const setrequestPayload = {
      ...requestPayload,
      secureHash: data.hash,
    };

    console.log("requestPayload", setrequestPayload);

    try {
      const response = await fetch('http://localhost:3000/api/initiate-sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setrequestPayload),
      });

      const paymentData = await response.json();
      console.log('Payment initiation response:', paymentData);
      const url = new URL(`${paymentData.redirectURI}?tranCtx=${paymentData.tranCtx}`);
      window.location.href = url.toString();
    } catch (error) {
      console.error('Payment error:', error);
    }

  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (onlinePayment) {
      handelPaymentMarchent();
      return;
    }

    try {
      const sessionId = localStorage.getItem('cart_session_id') || '';
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

      const response = await fetch(`${supabaseUrl}/functions/v1/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          sessionId,
          customerInfo: {
            name: formData.customerName,
            email: formData.customerEmail,
            phone: formData.customerPhone,
            notes: formData.notes,
          },
          shippingAddress: {
            fullName: formData.fullName,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
            phone: formData.shippingPhone,
          },
          paymentMethod: 'cash_on_delivery',
        }),
      });

      const data = await response.json();

      if (data.success) {
        onCheckoutComplete(data.order.orderNumber);
      } else {
        alert(data.error || 'Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-[#1F2124] mb-4">Your cart is empty</h2>
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-4 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-12 bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6] border-b">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center gap-2 text-[#D69C4A] hover:text-[#1F2124] transition-colors text-sm uppercase tracking-wider mb-4"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </button>
          <h1 className="font-serif text-5xl md:text-6xl text-[#1F2124]">Checkout</h1>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#F4EDE6] rounded-xl p-8 border border-gray-200">
                <h2 className="font-serif text-2xl text-[#1F2124] mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#F4EDE6] rounded-xl p-8 border border-gray-200">
                <h2 className="font-serif text-2xl text-[#1F2124] mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="shippingPhone"
                      value={formData.shippingPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#F4EDE6] rounded-xl p-8 border border-gray-200">
                <h2 className="font-serif text-2xl text-[#1F2124] mb-6">Order Notes</h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Any special instructions for your order?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69C4A] focus:border-transparent resize-none"
                />
              </div>

              <div className="bg-[#F4EDE6] rounded-xl p-8 border border-gray-200">
                <h2 className="font-serif text-2xl text-[#1F2124] mb-4">Payment Method</h2>
                <div
                  onClick={() => setOnlinePayment(false)}
                  className={`flex items-center gap-3 p-4 mt-2 bg-white rounded-lg border-2 cursor-pointer 
                      ${onlinePayment ? 'border-[#1F2124]' : 'border-[#D69C4A]'}`}
                >

                  <CreditCard className="text-[#D69C4A]" size={24} />
                  <div>
                    <p className="font-medium text-[#1F2124]">Cash on Delivery</p>
                    <p className="text-sm text-gray-600">Pay when you receive your order</p>
                  </div>
                </div>
                <div
                  onClick={() => setOnlinePayment(true)}
                  className={`flex items-center gap-3 p-4 mt-2 bg-white rounded-lg border-2 cursor-pointer 
                      ${onlinePayment ? 'border-[#D69C4A]' : 'border-[#1F2124]'}`}
                >

                  <CreditCard className="text-[#D69C4A]" size={24} />
                  <div>
                    <p className="font-medium text-[#1F2124]">Pay online</p>
                    <p className="text-sm text-gray-600">Pay online for your order</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#F4EDE6] rounded-xl p-8 border border-gray-200 sticky top-24">
                <h2 className="font-serif text-2xl text-[#1F2124] mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded bg-white"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1F2124]">{item.product.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-gray-400 line-through">Rs {item.product.price + 500}</span>
                          <span className="text-xs text-red-600 font-medium">
                            Save Rs 500
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-[#1F2124]">
                        Rs {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-[#1F2124]">Rs {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium text-[#1F2124]">Rs {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
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
                {
                  onlinePayment ? (
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 bg-[#D69C4A] text-white rounded-lg hover:bg-[#c28a3a] transition-colors font-medium uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : 'online payment'}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      // onClick={handelPaymentMarchent}
                      disabled={isProcessing}
                      className="w-full mt-4 py-4 bg-[#D69C4A] text-white rounded-lg border border-[#D69C4A] hover:bg-gray-100 transition-colors font-medium uppercase tracking-wider"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                  )
                }


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
                    <span>Free returns within 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
