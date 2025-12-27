export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-16 bg-gradient-to-r from-[#FFF9F2] to-[#F4EDE6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl text-[#1F2124] mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            How we collect, use, and protect your personal information
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <p className="text-gray-700 leading-relaxed mb-4">
              We respect your privacy and are committed to protecting your personal information. By using this Website, you agree to this Privacy Policy and the Website's Terms of Use. We may update this policy from time to time by publishing a revised version on the Website. You are responsible for reviewing it regularly.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#1F2124] mb-4">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect personal information when you:
            </p>
            <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-4">
              <li>Register on the Website</li>
              <li>Place an order</li>
              <li>Contact us for support</li>
              <li>Participate in promotions, surveys, or contests</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              This information may include your name, email, address, phone number, payment details, and delivery details. We may also collect technical data such as browser type, IP address, operating system, and visit timestamps.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#1F2124] mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-4">
              <li>Process orders and respond to inquiries</li>
              <li>Deliver products as requested</li>
              <li>Personalize your experience</li>
              <li>Send updates, offers, and communications</li>
              <li>Improve our services and offerings</li>
              <li>Conduct research and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#1F2124] mb-4">Sharing Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell or rent your personal information to third parties. Some information may be shared with trusted partners such as delivery services or payment processors to fulfill your orders. We may also disclose information as required by law or to protect our rights.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#1F2124] mb-4">Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies are small data files stored by your browser to help us provide a smooth and personalized experience. They do not store personal information for external use. Most browsers allow you to block cookies if you choose.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#1F2124] mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#1F2124] mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-8 text-gray-700 space-y-2 mb-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where we rely on it</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              To exercise these rights, please contact us at <a href="mailto:info@thebeeempress.com" className="text-[#D69C4A] hover:underline">info@thebeeempress.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[#1F2124] mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-[#F4EDE6] p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> <a href="mailto:info@thebeeempress.com" className="text-[#D69C4A] hover:underline">info@thebeeempress.com</a>
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> <a href="tel:+918810314219" className="text-[#D69C4A] hover:underline">+91 88103 14219</a>
              </p>
            </div>
          </section>

          <section className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Last updated: December 2024
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
