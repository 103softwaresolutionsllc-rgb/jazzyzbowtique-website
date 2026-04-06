import { ArrowLeft, ShieldCheck, Truck, HelpCircle, RefreshCcw } from "lucide-react";

export default function PoliciesPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-pink-primary/30 p-6 flex flex-col font-sans relative overflow-x-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10vw] left-[-10vw] w-[40vw] h-[40vw] bg-pink-100 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-70" />
      <div className="absolute bottom-[-10vw] right-[-10vw] w-[50vw] h-[50vw] bg-blue-100 rounded-full blur-[120px] -z-10 mix-blend-multiply opacity-50" />

      <div className="w-full max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="self-start mb-6 flex items-center gap-2 text-pink-600 hover:text-pink-800 font-semibold px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm transition-all sticky top-6 z-10"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Store
        </button>

        <h1 className="text-4xl md:text-5xl text-center text-blue-accent font-display font-bold mb-12 drop-shadow-sm">
          Jazzyz Bowtique Info & Policies
        </h1>

        <div className="space-y-12 pb-20">
          
          {/* FAQ Section */}
          <section className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-3">
              <HelpCircle className="w-7 h-7" /> Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-bold text-lg">Do you take custom orders?</h3>
                <p>Yes, we do! You can start a custom order for tumblers, shirts, bouquets, or bows straight from the custom order button on our homepage. Be sure to leave a note during checkout with exactly what you are looking for.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Can I track my order?</h3>
                <p>Yes. Once your payment is verified and your order ships via Pirate Ship, you will receive full tracking information.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Do you offer wholesale?</h3>
                <p>Absolutely. Orders of 12 items or more qualify for our wholesale pricing at $15 per dozen. This is perfect for party favors and events.</p>
              </div>
            </div>
          </section>

          {/* Shipping Section */}
          <section className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-3">
              <Truck className="w-7 h-7" /> Shipping & Fulfillment
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">📍</span>
                <div>
                  <h3 className="font-bold">Local Pickup & Uber</h3>
                  <p>Located at Santa Ana St & Wilcox. Available Monday–Saturday, 10 AM – 5 PM. Same-day pickup is available!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">🚗</span>
                <div>
                  <h3 className="font-bold">Local Delivery</h3>
                  <p>Free delivery within 10 miles (Minimum order is $40).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">📦</span>
                <div>
                  <h3 className="font-bold">Shipping</h3>
                  <p>All items ship via Pirate Ship (Ground shipping only, with 1–3 days processing time). Shipping is a flat $8, but we offer <strong>free shipping on orders over $50</strong> (Minimum $20 order).</p>
                </div>
              </div>
            </div>
          </section>

          {/* Returns Section */}
          <section className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-3">
              <RefreshCcw className="w-7 h-7" /> Returns & Exchanges
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3 bg-pink-50 p-4 rounded-xl border border-pink-100">
                <span className="font-bold text-xl text-pink-600 shrink-0">❌</span>
                <p><strong>No refunds.</strong> Because many of our items are custom-made or personalized, all sales are final.</p>
              </div>
              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <span className="font-bold text-xl text-blue-accent shrink-0">🔄</span>
                <p><strong>Exchanges only.</strong> We do accept exchanges within 7 days of your purchase. The original item must be returned to us in order to process the exchange.</p>
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-3">
              <ShieldCheck className="w-7 h-7" /> Privacy Policy
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                At Jazzyz Bowtique, your privacy is important to us. We collect your personal information (like your email address, shipping address, and payment details) strictly to process and fulfill your orders, and to provide you with the best customer experience possible.
              </p>
              <p>
                <strong>We do not sell, trade, or rent your personal information to third parties.</strong>
              </p>
              <p>
                If you opt-in to our VIP Marketing or Membership, we may occasionally email you about special deals, giveaways, or new drops. You may unsubscribe from these communications at any time.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
