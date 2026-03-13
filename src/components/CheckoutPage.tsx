import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // 1. Call your Netlify function
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cart,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Checkout failed');
      }

      // 2. Teleport to Stripe using the URL returned from the backend
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received from server.");
      }

    } catch (err: any) {
      console.error("Payment Error:", err);
      alert(`Something went wrong: ${err.message}`);
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-black text-brand-charcoal uppercase tracking-tighter mb-4">Your journey is empty</h2>
        <Link to="/collection" className="bg-brand-pink text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-charcoal transition-all shadow-lg">
          Explore the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-12 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/collection" className="text-brand-charcoal/40 hover:text-brand-pink transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-brand-charcoal uppercase tracking-tighter">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-10 order-2 lg:order-1">
            <div className="bg-white/50 border-2 border-dashed border-brand-charcoal/10 rounded-[2.5rem] p-8 text-center">
              <p className="text-brand-charcoal/60 font-bold uppercase text-xs tracking-widest mb-4">Secure Checkout Powered by Stripe</p>
              <p className="text-sm text-brand-charcoal/40 max-w-xs mx-auto">Shipping and payment details will be securely collected on the next page.</p>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-8 rounded-2xl font-black uppercase tracking-[0.3em] text-sm shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 ${
                isProcessing ? 'bg-brand-charcoal/50 cursor-wait' : 'bg-brand-charcoal text-white hover:bg-brand-pink'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Connecting...
                </>
              ) : 'Begin Secure Checkout'}
            </button>
            
            <p className="text-center text-[10px] text-brand-charcoal/30 font-bold uppercase tracking-widest">
              Guaranteed Safe & Secure Checkout
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-2 border-brand-charcoal/5 order-1 lg:order-2 sticky top-32">
            <h3 className="text-brand-charcoal font-black uppercase tracking-widest text-xs mb-8">Your Selection</h3>
            
            <div className="space-y-6 mb-10 overflow-y-auto max-h-100 pr-2 custom-scrollbar">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="w-16 h-20 bg-brand-cream rounded-xl overflow-hidden shrink-0 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="grow">
                    <h4 className="text-brand-charcoal font-bold text-sm uppercase leading-tight">{item.name}</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {(item.variantName || item.size) && (
                        <span className="text-[9px] bg-brand-pink/10 text-brand-pink px-2 py-0.5 rounded-full font-black uppercase">
                          {item.variantName || item.size}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-bold text-brand-charcoal">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-brand-charcoal/5 pt-8">
              <div className="flex justify-between text-brand-charcoal/50 font-bold uppercase text-[10px] tracking-widest">
                <span>Items Total</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-brand-charcoal font-black uppercase tracking-tighter text-xl">Total</span>
                <span className="text-3xl font-black text-brand-charcoal tracking-tighter">${totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;