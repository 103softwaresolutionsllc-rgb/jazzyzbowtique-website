import { ArrowLeft, ExternalLink, ShieldCheck, Tag } from "lucide-react";
import { INVENTORY_CATEGORIES } from "../lib/inventory";

export default function ShopPage({ 
  onBack, 
  onCheckout 
}: { 
  onBack: () => void, 
  onCheckout: (category: string) => void 
}) {
  return (
    <div className="min-h-screen bg-pink-primary/30 p-6 sm:p-10 flex flex-col font-sans relative overflow-x-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10vw] left-[-10vw] w-[40vw] h-[40vw] bg-pink-100 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-70" />
      <div className="absolute bottom-[-10vw] right-[-10vw] w-[50vw] h-[50vw] bg-blue-100 rounded-full blur-[120px] -z-10 mix-blend-multiply opacity-50" />

      <div className="w-full max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="self-start mb-6 flex items-center gap-2 text-pink-600 hover:text-pink-800 font-semibold px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm transition-all sticky top-6 z-10"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <h1 className="text-4xl md:text-6xl text-center text-blue-accent font-display font-bold mb-4 drop-shadow-sm">
          Product Catalog
        </h1>
        
        <div className="bg-blue-accent/10 border-2 border-blue-accent/20 rounded-[2rem] p-6 mb-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="w-16 h-16 bg-blue-accent rounded-2xl flex items-center justify-center shrink-0 shadow-lg rotate-3">
             <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-blue-accent mb-2 tracking-tight">Stay Low-Key, Stay Shoping. 💎</h2>
            <p className="text-gray-700 leading-relaxed font-medium">
              Due to custom licensing limitations, our full design catalog is hosted privately. 
              View all available styles & designs on our <a href="https://www.tiktok.com/@jazzyzbowtique?_r=1&_t=ZT-95IaOANtQPV" target="_blank" rel="noreferrer" className="text-pink-600 underline font-bold inline-flex items-center gap-1 hover:text-pink-700 transition-colors">TikTok Page <ExternalLink className="w-3.5 h-3.5" /></a>.
            </p>
            <p className="mt-2 text-sm text-blue-800 font-bold uppercase tracking-widest bg-blue-100/50 px-3 py-1 rounded-full inline-block">
              Note the ID Code, then Buy here.
            </p>
          </div>
        </div>

        <div className="space-y-16 pb-20">
          {INVENTORY_CATEGORIES.filter(cat => cat.id !== "live_sale").map(category => {
            return (
              <div key={category.id} className="scroll-mt-24" id={`cat-${category.id}`}>
                <h2 className="text-3xl font-display font-bold text-pink-600 mb-6 pb-2 border-b-2 border-pink-200 flex items-center gap-3">
                  {category.name}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.items.map(item => (
                    <div key={item.id} className="bg-white/95 backdrop-blur-sm p-5 rounded-[2rem] shadow-md border border-pink-50 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <code className="bg-gray-100 text-pink-600 px-3 py-1 rounded-full font-bold text-sm border border-gray-200 flex items-center gap-1.5 shadow-inner">
                            <Tag className="w-3.5 h-3.5" /> {item.id}
                          </code>
                          <span className="font-bold text-blue-accent text-xl">${item.price}</span>
                        </div>
                        
                        <div className="bg-gradient-to-tr from-pink-50 to-blue-50/30 rounded-2xl p-4 border border-white mb-4">
                           <h3 className="font-bold text-gray-800 text-lg leading-snug">{item.name}</h3>
                           <p className="text-xs text-gray-500 mt-1 italic">Select code at checkout for specific designs.</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => onCheckout(category.name)}
                        className="w-full btn-pill bg-pink-primary text-blue-accent font-bold hover:bg-pink-300 py-3 shadow-sm active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                      >
                        Buy This Group
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
