import { ArrowLeft, ShoppingBag, ShoppingCart, CreditCard, Mail, Gift, MousePointerClick, Upload, Truck } from 'lucide-react';

interface HowToPageProps {
  onBack: () => void;
  onShop: () => void;
}

export default function HowToPage({ onBack, onShop }: HowToPageProps) {
  return (
    <div className="min-h-screen bg-pink-primary/30 p-6 flex flex-col font-sans relative overflow-x-hidden">
      {/* Background decorations */}
      <div className="fixed top-[-10vw] left-[-10vw] w-[40vw] h-[40vw] bg-pink-100 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-70 pointer-events-none" />
      <div className="fixed bottom-[-10vw] right-[-10vw] w-[50vw] h-[50vw] bg-blue-100 rounded-full blur-[120px] -z-10 mix-blend-multiply opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="max-w-5xl mx-auto w-full mb-12 relative z-10">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-pink-600 hover:text-pink-800 font-semibold px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-sm transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center text-blue-accent font-display font-bold mb-4 drop-shadow-sm">
          A Quick Guide to Shopping
        </h1>
        <p className="text-center text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Here is exactly how to shop, place your custom order, and join the VIP community step-by-step!
        </p>
      </div>

      {/* Steps Container */}
      <div className="max-w-4xl mx-auto w-full space-y-8 relative z-10">
        
        {/* Step 1 */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white shadow-xl hover:shadow-2xl transition-shadow flex flex-col md:flex-row gap-8 items-center md:items-start group">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-center md:justify-start gap-2">
              <span className="text-pink-500">Step 1:</span> Pick Your Items
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Explore our wide variety of collections! Navigate to our <strong>Shop With Us</strong> menu or click the shopping bag icon. Select a specific category using the organized dropdown menu, choose the gorgeous item you like, adjust the quantity, and eagerly click "Add to Cart"!
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start text-sm">
               <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-semibold flex items-center gap-1"><MousePointerClick className="w-4 h-4"/> Select Category</span>
               <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-semibold flex items-center gap-1"><ShoppingCart className="w-4 h-4"/> Add to Cart</span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white shadow-xl hover:shadow-2xl transition-shadow flex flex-col md:flex-row-reverse gap-8 items-center md:items-start group">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-accent text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
            <CreditCard className="w-10 h-10" />
          </div>
          <div className="flex-1 text-center md:text-right">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-center md:justify-end gap-2">
              <span className="text-blue-accent">Step 2:</span> Checkout & Confirm
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg border-l-4 md:border-r-4 md:border-l-0 border-blue-200 pl-4 md:pr-4 md:pl-0">
              When your cart is filled with goodies, review your total (remember orders $50+ get free shipping!) and click <strong>Confirm Order</strong>. We process orders via safe direct payments (Zelle, Cash App) to bypass heavy fees and keep prices low for you! 
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-end text-sm">
               <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold flex items-center gap-1"><Upload className="w-4 h-4"/> Upload Screenshot</span>
               <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold flex items-center gap-1"><Gift className="w-4 h-4"/> Get Order</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white shadow-xl hover:shadow-2xl transition-shadow flex flex-col md:flex-row gap-8 items-center md:items-start group">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-500 text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
            <Mail className="w-10 h-10" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-center md:justify-start gap-2">
              <span className="text-purple-500">Step 3:</span> Join the VIP List
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Want special perks, promos, and first dibs on exclusive collections? Scroll to the very bottom of the homepage right now! Simply type your email into the <strong>Subscribe</strong> box and hit the button. It will open up your email app with a pre-written message to join our VIP family instantly!
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start text-sm">
               <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold flex items-center gap-1"><Mail className="w-4 h-4"/> Send Request</span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white shadow-xl hover:shadow-2xl transition-shadow flex flex-col md:flex-row-reverse gap-8 items-center md:items-start group">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
            <Truck className="w-10 h-10" />
          </div>
          <div className="flex-1 text-center md:text-right">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-center md:justify-end gap-2">
              <span className="text-cyan-500">Step 4:</span> Uber Delivery
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg border-l-4 md:border-r-4 md:border-l-0 border-cyan-200 pl-4 md:pr-4 md:pl-0">
              Need your order ASAP? Select <strong>Uber Delivery</strong> at checkout! 1) Text us the address to be shipped to. 2) We will order the Uber and get the price for delivery. 3) We'll send you a screenshot of the Uber delivery price and driver's info. 4) After, the driver will send confirmation of the delivered package!
            </p>
          </div>
        </div>

      </div>

      <div className="mt-16 text-center pb-12 relative z-10">
        <button 
          onClick={onShop}
          className="bg-gradient-to-r from-pink-500 to-blue-accent hover:from-pink-600 hover:to-blue-600 text-white font-bold py-5 px-12 rounded-full shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] hover:shadow-[0_15px_50px_-10px_rgba(236,72,153,0.7)] transition-all transform hover:-translate-y-1 text-xl flex items-center gap-3 mx-auto"
        >
          <ShoppingBag className="w-6 h-6" />
          I'm Ready to Shop!
        </button>
      </div>

    </div>
  );
}
