import { useState, useEffect } from "react";
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft, Upload, Tag } from "lucide-react";
import { INVENTORY_CATEGORIES } from "../lib/inventory";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  customNote?: string;
  productCode?: string;
};

type PromoCode = {
  code: string;
  type: 'free_shipping' | 'flat_discount' | 'percent_discount';
  value?: number;
  minSpend?: number;
  description: string;
};

const ACTIVE_PROMOS: Record<string, PromoCode> = {
  "JB50": { code: "JB50", type: "free_shipping", description: "Free Shipping!" },
  "FREEMONEY": { code: "FREEMONEY", type: "flat_discount", value: 5, description: "$5 Off Your Order!" },
  "VIP20": { code: "VIP20", type: "percent_discount", value: 20, minSpend: 50, description: "20% Off Orders Over $50!" }
};

export default function CheckoutPage({ onBack, initialCategory }: { onBack: () => void, initialCategory?: string }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || INVENTORY_CATEGORIES[0].name);
  const [selectedItem, setSelectedItem] = useState(INVENTORY_CATEGORIES.find(c => c.name === selectedCategory)?.items[0]?.id || INVENTORY_CATEGORIES[0].items[0].id);
  const [qty, setQty] = useState(1);
  const [customNote, setCustomNote] = useState("");
  const [productCode, setProductCode] = useState("");
  const [liveClaimAmount, setLiveClaimAmount] = useState<number | "">("");
  const [fulfillment, setFulfillment] = useState("shipping");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState("");

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      const cat = INVENTORY_CATEGORIES.find((c) => c.name === initialCategory);
      if (cat?.items.length) {
        setSelectedItem(cat.items[0].id);
      }
    }
  }, [initialCategory]);

  const activeCategory = INVENTORY_CATEGORIES.find((c) => c.name === selectedCategory);
  const activeProduct = activeCategory?.items.find((i) => i.id === selectedItem);

  const addToCart = () => {
    if (!activeProduct) return;

    // Live Sale Price Override
    const actualPrice = selectedCategory === "🔴 Live Sale Claim" ? (Number(liveClaimAmount) || 0) : activeProduct.price;

    // Create a unique id based on the product and the custom note, so same products with different notes don't merge
    let uniqueId = activeProduct.id + (customNote ? `-${btoa(customNote).substring(0, 10)}` : "");
    if (selectedCategory === "🔴 Live Sale Claim") uniqueId += `-${Date.now()}`; // Make live claims always unique line items

    setCart((prev) => {
      const existing = prev.find((item) => item.id === uniqueId && item.productCode === productCode);
      if (existing) {
        return prev.map((item) =>
          (item.id === uniqueId && item.productCode === productCode) ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...activeProduct, price: actualPrice, id: uniqueId, qty, customNote, productCode }];
    });
    setQty(1); // Reset qty after adding
    setCustomNote(""); // Reset note
    setProductCode(""); // Reset product code
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  let discount = 0;
  const isPromoValidBySpend = !appliedPromo?.minSpend || subtotal >= appliedPromo.minSpend;
  if (appliedPromo && isPromoValidBySpend) {
    if (appliedPromo.type === 'flat_discount') discount = appliedPromo.value || 0;
    if (appliedPromo.type === 'percent_discount') discount = subtotal * ((appliedPromo.value || 0) / 100);
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const isShippingFreeFromPromo = appliedPromo?.type === 'free_shipping' && isPromoValidBySpend;
  const shippingCost = (fulfillment === 'shipping' && subtotal < 50 && !isShippingFreeFromPromo) ? 10 : 0;
  const total = discountedSubtotal + shippingCost;

  return (
    <div className="min-h-screen bg-pink-primary/30 p-6 flex flex-col font-sans relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-[-10vw] left-[-10vw] w-[40vw] h-[40vw] bg-pink-100 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-70" />
      <div className="absolute bottom-[-10vw] right-[-10vw] w-[50vw] h-[50vw] bg-blue-100 rounded-full blur-[120px] -z-10 mix-blend-multiply opacity-50" />

      <button
        onClick={onBack}
        className="self-start mb-6 flex items-center gap-2 text-pink-600 hover:text-pink-800 font-semibold px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-sm transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Store
      </button>

      <div className="flex flex-row items-center justify-center gap-4 mb-10 w-full">
        <img src="/logo.JPG" alt="Jazzyz Bowtique Logo" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full shadow-md border-[3px] border-white shrink-0" />
        <h1 className="text-3xl md:text-5xl text-blue-accent font-display font-bold drop-shadow-sm whitespace-nowrap">
          Jazzyz Bowtique Checkout
        </h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8 max-w-7xl mx-auto w-full">

        {/* LEFT COLUMN: Add to Cart & Your Order */}
        <div className="flex flex-col gap-8">

          {/* Add Item Section */}
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-2">
              <Plus className="w-6 h-6" /> Add Items to Cart
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-widest">Category</label>
                <select
                  className="p-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:ring-0 bg-white/50 transition-colors"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    const cat = INVENTORY_CATEGORIES.find(c => c.name === e.target.value);
                    if (cat?.items.length) {
                      setSelectedItem(cat.items[0].id);
                    }
                  }}
                >
                  {INVENTORY_CATEGORIES.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {selectedCategory === "🔴 Live Sale Claim" ? (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-widest">Total Price Owed ($)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 25"
                    className="p-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:ring-0 bg-white/50 transition-colors"
                    value={liveClaimAmount}
                    onChange={(e) => setLiveClaimAmount(parseFloat(e.target.value) || "")}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-widest">Product</label>
                  <select
                    className="p-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:ring-0 bg-white/50 transition-colors"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                  >
                    {activeCategory?.items.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name} - ${item.price}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-widest flex items-center gap-2">
                  <Tag className="w-4 h-4 text-pink-500" /> Stock / Design Code
                </label>
                <input
                  type="text"
                  placeholder="EX: wrap_5 (Found in Catalog)"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  className="p-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:ring-0 bg-white/50 transition-colors w-full uppercase font-mono font-bold"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-widest">
                  {selectedCategory === "🔴 Live Sale Claim" ? "What did you claim? (Required)" : "Notes / Size / Color"}
                </label>
                <input
                  type="text"
                  placeholder="Any special requests..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="p-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 focus:ring-0 bg-white/50 transition-colors w-full"
                />
              </div>
            </div>

            <div className="flex items-end gap-4">
              <div className="flex flex-col gap-2 w-32">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-widest">Qty</label>
                <div className="flex items-center justify-between border-2 border-pink-100 rounded-xl bg-white p-1">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-pink-50 rounded-lg text-pink-600"><Minus className="w-4 h-4" /></button>
                  <span className="font-semibold text-lg w-8 text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-pink-50 rounded-lg text-pink-600"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
              <button
                onClick={addToCart}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-pink-500/30 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart — ${(activeProduct?.price || 0) * qty}
              </button>
            </div>
          </div>

          {/* Cart Section */}
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white flex-1 flex flex-col">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" /> Your Order
            </h2>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 py-12">
                  <ShoppingCart className="w-16 h-16 opacity-20" />
                  <p className="text-lg">Your cart is empty.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-pink-50/50 rounded-2xl border border-pink-100/50 hover:bg-pink-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          {item.name}
                          {item.productCode && (
                            <span className="text-sm text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                              <Tag className="w-3.5 h-3.5" /> ID: {item.productCode}
                            </span>
                          )}
                          {item.customNote && (
                            <span className="text-sm text-pink-500 font-medium bg-pink-100 px-2 py-0.5 rounded flex-wrap">
                              📝 {item.customNote}
                            </span>
                          )}
                        </h3>
                        <p className="text-pink-500 font-medium">${item.price} each</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-pink-100 shadow-sm">
                          <button onClick={() => updateCartQty(item.id, -1)} className="text-gray-400 hover:text-pink-500"><Minus className="w-4 h-4" /></button>
                          <span className="font-semibold min-w-[1.5rem] text-center">{item.qty}</span>
                          <button onClick={() => updateCartQty(item.id, 1)} className="text-gray-400 hover:text-pink-500"><Plus className="w-4 h-4" /></button>
                        </div>

                        <div className="w-20 text-right font-bold text-lg text-gray-800">
                          ${item.price * item.qty}
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 mb-2 flex gap-2">
              <input
                type="text"
                placeholder="Promo code (Optional)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg uppercase"
              />
              <button
                onClick={() => {
                  setPromoError("");
                  const code = promoCode.trim().toUpperCase();
                  if (!code) return;

                  const promo = ACTIVE_PROMOS[code];
                  if (!promo) {
                    setPromoError("Invalid promo code.");
                    return;
                  }

                  if (promo.minSpend && subtotal < promo.minSpend) {
                    setPromoError(`This promo requires a minimum spend of $${promo.minSpend.toFixed(2)}.`);
                    return;
                  }

                  try {
                    const used = JSON.parse(localStorage.getItem('usedPromos') || '[]');
                    if (used.includes(code)) {
                      setPromoError("You have already used this promo code.");
                      return;
                    }
                  } catch (e) { }

                  setAppliedPromo(promo);
                  setPromoCode("");
                }}
                className="px-4 py-2 bg-blue-accent text-white rounded-lg font-bold hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
            {promoError && <p className="text-red-500 text-sm font-bold mt-1 mb-2">{promoError}</p>}
            {appliedPromo && <p className="text-green-500 text-sm font-bold mt-1 mb-2">{appliedPromo.code} Applied: {appliedPromo.description}</p>}

            <div className="mt-2 pt-4 border-t-2 border-dashed border-pink-200">
              <label className="block text-sm font-semibold text-gray-600 uppercase tracking-widest mb-2">Fulfillment Method</label>
              <select
                title="Fulfillment Method"
                className="w-full p-3 rounded-xl border-2 border-pink-100 focus:border-pink-400 bg-white/50 mb-4 transition-colors"
                value={fulfillment}
                onChange={(e) => setFulfillment(e.target.value)}
              >
                <option value="shipping">Shipping (Pirate Ship) - Free over $50</option>
                <option value="pickup">Local Pickup (Santa Ana St & Wilcox)</option>
                <option value="uber">Uber Delivery</option>
              </select>

              <div className="flex justify-between items-center text-gray-600 mb-2">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && appliedPromo.type !== 'free_shipping' && isPromoValidBySpend && (
                <div className="flex justify-between items-center text-green-500 mb-2 font-semibold">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              {appliedPromo && !isPromoValidBySpend && (
                <div className="flex justify-between items-center text-red-500 mb-2 font-semibold text-sm">
                  <span>{appliedPromo.code} Minimum Spend Not Met</span>
                  <span>Add ${(appliedPromo.minSpend! - subtotal).toFixed(2)}</span>
                </div>
              )}
              {fulfillment === 'shipping' && (
                <div className="flex justify-between items-center text-gray-600 mb-4">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {subtotal >= 50 || isShippingFreeFromPromo ? "Free!" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-end font-bold text-3xl text-blue-accent drop-shadow-sm">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              {fulfillment === 'shipping' && subtotal > 0 && subtotal < 50 && appliedPromo?.type !== 'free_shipping' && (
                <p className="text-sm text-pink-500 text-right mt-2 font-medium">Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Payment Proof */}
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(236,72,153,0.3)] border border-pink-100 flex flex-col relative overflow-hidden">
          {/* Decorative accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-bl-full -z-10 mix-blend-multiply opacity-50" />

          <h2 className="text-2xl font-bold text-pink-600 mb-2">Complete Payment</h2>
          <p className="text-gray-500 mb-6 text-sm">Send your total of <strong className="text-pink-500">${total}</strong> using one of the methods below, then upload proof of payment.</p>

          <div className="space-y-4 mb-8 flex-1">
            {/* ZELLE */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-100 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-200 rounded-full blur-2xl opacity-50"></div>
              <h3 className="font-bold text-purple-700 text-lg flex items-center justify-center sm:justify-start gap-2 mb-2 w-full">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div> Zelle
              </h3>
              <p className="text-sm text-gray-700 mb-1 w-full"><span className="font-semibold">Email:</span> Jazmincorona93@gmail.com</p>
              <p className="text-sm text-gray-700 w-full"><span className="font-semibold">Name:</span> Luisa J Corona</p>
              <div className="mt-4 bg-white p-3 rounded-2xl inline-block border border-purple-100 shadow-sm mx-auto sm:mx-0">
                <img src="/zelle-qr.png" alt="Zelle QR Code" className="w-64 h-64 sm:w-72 sm:h-72 object-contain rounded-lg mx-auto" />
              </div>
              <button
                onClick={(e) => {
                  navigator.clipboard.writeText('Jazmincorona93@gmail.com');
                  e.currentTarget.innerText = 'Email Copied!';
                  setTimeout(() => e.currentTarget.innerText = 'Tap to Copy Email', 2000);
                }}
                className="mt-4 w-full py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors shadow-md sm:hidden"
              >
                Tap to Copy Email
              </button>
            </div>

            {/* CASH APP */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-100 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-green-200 rounded-full blur-2xl opacity-50"></div>
              <h3 className="font-bold text-green-700 text-lg flex items-center justify-center sm:justify-start gap-2 mb-2 w-full">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Cash App
              </h3>
              <p className="text-sm text-gray-700 font-medium bg-white px-3 py-1 rounded-md border border-green-100 inline-block w-full sm:w-auto">
                $Jazzyzbowtique1
              </p>
              <div className="mt-4 bg-white p-3 rounded-2xl inline-block border border-green-100 shadow-sm mx-auto sm:mx-0">
                <img src="/cashapp-qr.png" alt="Cash App QR Code" className="w-64 h-64 sm:w-72 sm:h-72 object-contain rounded-lg mx-auto" />
              </div>
              <a
                href="https://cash.app/$Jazzyzbowtique1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full block text-center py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors shadow-md sm:hidden"
              >
                Tap to Open Cash App
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-700 mb-3">Upload Screenshot</h3>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-pink-200 border-dashed rounded-2xl cursor-pointer bg-pink-50/50 hover:bg-pink-50 transition-colors group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-pink-400 group-hover:text-pink-500 group-hover:scale-110 transition-transform" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
              </div>
              <input type="file" className="hidden" />
            </label>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={() => {
              if (appliedPromo) {
                try {
                  const used = JSON.parse(localStorage.getItem('usedPromos') || '[]');
                  if (!used.includes(appliedPromo.code)) {
                    used.push(appliedPromo.code);
                    localStorage.setItem('usedPromos', JSON.stringify(used));
                  }
                } catch (e) { }
              }

              const orderDetails = cart.map(item => `- ${item.qty}x ${item.name}${item.productCode ? ` [ID: ${item.productCode}]` : ''} ($${item.price * item.qty})${item.customNote ? `\n  Note: ${item.customNote}` : ''}`).join('\n');
              const promoDetails = appliedPromo ? `\nPromo Applied: ${appliedPromo.code} - ${appliedPromo.description}\nDiscount: -$${discount.toFixed(2)}\n` : '';
              const subject = encodeURIComponent(`New Order - $${total.toFixed(2)}`);
              const body = encodeURIComponent(`Hello Jazzyz Bowtique,\n\nI have placed a new order!\n\nOrder Details:\n${orderDetails}\n\nSubtotal: $${subtotal.toFixed(2)}\n${promoDetails}Fulfillment: ${fulfillment}\nTotal: $${total.toFixed(2)}\n\nI have attached my payment screenshot to this email.`);
              window.location.href = `mailto:JazzyzBowtique@gmail.com?subject=${subject}&body=${body}`;
            }}
            className={`w-full mt-6 py-4 rounded-2xl font-bold text-lg shadow-xl uppercase tracking-wider transition-all transform active:scale-[0.98]
              ${cart.length > 0
                ? 'bg-gradient-to-r from-pink-500 to-blue-accent text-white hover:shadow-pink-500/40 hover:from-pink-600 hover:to-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
          >
            Confirm Order
          </button>

          <p className="text-xs text-center mt-4 text-gray-400 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 inline-block animate-pulse"></span>
            Orders processed after payment confirmation
          </p>
        </div>
      </div>
    </div>
  );
}
