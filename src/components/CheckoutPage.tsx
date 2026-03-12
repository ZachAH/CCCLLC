import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Publishable Key from Stripe Dashboard
const stripePromise = loadStripe('pk_test_your_publishable_key_here');

const CheckoutPage = () => {
  const { cart, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    const stripe = await stripePromise;

    // Mapping our custom cart items to Stripe's line_items format
    const lineItems = cart.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          // Sending the custom details as the description so they show up on Zach's Stripe dashboard
          description: `${item.style}${item.color ? ` / Color: ${item.color}` : ''}${item.size ? ` / Size: ${item.size}` : ''}${item.variantName ? ` / Option: ${item.variantName}` : ''}`,
          images: [item.image],
        },
        // Stripe expects amounts in cents
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity,
    }));

    console.log("Redirecting to Stripe with items:", lineItems);

    /* Note: In a production environment, you would send 'lineItems' 
       to your backend (Node.js/Netlify/Vercel function) to create a 
       Session ID, then use stripe.redirectToCheckout({ sessionId }).
    */
    
    setTimeout(() => {
      alert("Backend connection required to securely redirect to Stripe. Data is ready!");
      setIsProcessing(false);
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-black text-brand-charcoal uppercase tracking-tighter mb-4">Your journey is empty</h2>
        <Link to="/collection" className="bg-brand-pink text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-charcoal transition-all">
          Explore the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-12 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-brand-charcoal uppercase tracking-tighter mb-12">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Customer & Shipping Information */}
          <div className="space-y-10 order-2 lg:order-1">
            <section>
              <h3 className="text-brand-pink font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <span className="w-4 h-px bg-brand-pink"></span> 01. Contact Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <input type="email" placeholder="Email Address" className="w-full bg-white border-2 border-brand-charcoal/5 rounded-xl px-6 py-4 focus:border-brand-pink outline-none transition-all font-medium" />
              </div>
            </section>

            <section>
              <h3 className="text-brand-pink font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <span className="w-4 h-px bg-brand-pink"></span> 02. Shipping Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full bg-white border-2 border-brand-charcoal/5 rounded-xl px-6 py-4 focus:border-brand-pink outline-none transition-all font-medium" />
                <input type="text" placeholder="Last Name" className="w-full bg-white border-2 border-brand-charcoal/5 rounded-xl px-6 py-4 focus:border-brand-pink outline-none transition-all font-medium" />
                <input type="text" placeholder="Address" className="md:col-span-2 w-full bg-white border-2 border-brand-charcoal/5 rounded-xl px-6 py-4 focus:border-brand-pink outline-none transition-all font-medium" />
                <input type="text" placeholder="City" className="w-full bg-white border-2 border-brand-charcoal/5 rounded-xl px-6 py-4 focus:border-brand-pink outline-none transition-all font-medium" />
                <input type="text" placeholder="ZIP / Postal Code" className="w-full bg-white border-2 border-brand-charcoal/5 rounded-xl px-6 py-4 focus:border-brand-pink outline-none transition-all font-medium" />
              </div>
            </section>

            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${
                isProcessing ? 'bg-brand-charcoal/50 cursor-wait' : 'bg-brand-charcoal text-white hover:bg-brand-pink'
              }`}
            >
              {isProcessing ? 'Connecting...' : 'Proceed to Payment'}
            </button>
          </div>

          {/* Right: Order Summary Card */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-2 border-brand-charcoal/5 order-1 lg:order-2 sticky top-32">
            <h3 className="text-brand-charcoal font-black uppercase tracking-widest text-xs mb-8">Order Summary</h3>
            
            <div className="space-y-6 mb-10 overflow-y-auto max-h-[400px] pr-2">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="w-16 h-20 bg-brand-cream rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-brand-charcoal font-bold text-sm uppercase leading-tight">{item.name}</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.style && <span className="text-[9px] bg-brand-pink/10 text-brand-pink px-2 py-0.5 rounded-full font-black uppercase">{item.style}</span>}
                      <p className="text-[10px] text-brand-charcoal/50 font-bold uppercase py-0.5">
                        {item.color && `${item.color} / `}{item.size}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-brand-charcoal">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-brand-charcoal/5 pt-8">
              <div className="flex justify-between text-brand-charcoal/50 font-bold uppercase text-[10px] tracking-widest">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-brand-charcoal/50 font-bold uppercase text-[10px] tracking-widest">
                <span>Shipping</span>
                <span className="italic">Calculated at next step</span>
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