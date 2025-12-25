import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

const accordionData: AccordionItem[] = [
  {
    title: 'Easy Returns Policy',
    content: (
      <>
        <p className="text-gray-700 leading-relaxed mb-4">
          We want you to be happy with your purchase. If for any reason you're not satisfied, you may return the product within 7 days of delivery, provided:
        </p>
        <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-4">
          <li>The item is unused</li>
          <li>All original packaging, labels, and tags are intact</li>
          <li>The product is undamaged</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Each return request is reviewed individually to ensure your satisfaction.
        </p>
      </>
    ),
  },
  {
    title: 'How to Return',
    content: (
      <>
        <p className="text-gray-700 leading-relaxed mb-4">
          To initiate a return, please contact us within 7 days of receiving your order:
        </p>
        <div className="bg-[#F4EDE6] p-6 rounded-lg mb-4">
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> <a href="tel:+918810314219" className="text-[#D69C4A] hover:underline">+91 88103 14219</a>
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> <a href="mailto:info@thebeeempress.com" className="text-[#D69C4A] hover:underline">info@thebeeempress.com</a>
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          Please ensure the product is in its original condition and packaging. If your item arrived damaged, we request that you record an unboxing video to help us assess the issue.
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>Note:</strong> Products purchased during a special offer are eligible for exchange only, not refunds.
        </p>
      </>
    ),
  },
  {
    title: 'Refund Details',
    content: (
      <>
        <p className="text-gray-700 leading-relaxed mb-4">
          Once we receive and inspect your return:
        </p>
        <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-4">
          <li>A refund will be issued to your original mode of payment</li>
          <li>Refunds are processed within 7–10 business days from the date of approval</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Please note that any promo code used on the order will not be refunded or reissued in the event of cancellation.
        </p>
      </>
    ),
  },
  {
    title: 'Delivery Information',
    content: (
      <>
        <p className="text-gray-700 leading-relaxed mb-4">
          If your package is undelivered, missing, or damaged, please report this to us within 48 hours of delivery confirmation (as shared via SMS or email).
        </p>
        <p className="text-gray-700 leading-relaxed">
          We may cancel your order if delivery to your PIN/ZIP code is not possible with our delivery partner. In such cases, your payment will be refunded within 5–7 days of cancellation.
        </p>
      </>
    ),
  },
  {
    title: 'Shipping Times',
    content: (
      <>
        <p className="text-gray-700 leading-relaxed mb-4">
          Standard delivery typically takes 5-7 business days within India. You will receive tracking information once your order ships.
        </p>
        <div className="bg-[#F4EDE6] p-6 rounded-lg">
          <h3 className="font-medium text-[#1F2124] mb-3">Delivery Timeline:</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li><strong>Processing:</strong> 1-2 business days</li>
            <li><strong>Shipping:</strong> 5-7 business days</li>
            <li><strong>Total:</strong> 6-9 business days</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    title: 'Contact Us',
    content: (
      <>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you have any questions about delivery or returns, please don't hesitate to reach out:
        </p>
        <div className="bg-[#F4EDE6] p-6 rounded-lg">
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> <a href="tel:+918810314219" className="text-[#D69C4A] hover:underline">+91 88103 14219</a>
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> <a href="mailto:info@thebeeempress.com" className="text-[#D69C4A] hover:underline">info@thebeeempress.com</a>
          </p>
          <p className="text-gray-700 text-sm mt-4">
            Our customer service team is available Monday-Friday, 9:00 AM - 6:00 PM IST
          </p>
        </div>
      </>
    ),
  },
];

export default function DeliveryReturnsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-16 bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl text-[#1F2124] mb-4">Delivery & Returns</h1>
          <p className="text-lg text-gray-600">
            Important information about our delivery and returns policy
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4">
          {accordionData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-[#FFF9F2] transition-colors duration-300"
              >
                <h2 className="font-serif text-xl md:text-2xl text-[#1F2124]">
                  {item.title}
                </h2>
                <ChevronDown
                  className={`w-6 h-6 text-[#D69C4A] transition-transform duration-300 flex-shrink-0 ml-4 ${openIndex === index ? 'rotate-180' : ''
                    }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-0 bg-white">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Last updated: December 2024
          </p>
        </div>
      </div>
    </div>
  );
}
