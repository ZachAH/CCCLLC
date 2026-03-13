import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Success = () => {
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // The moment this page loads, we wipe the cart!
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-brand-pink/10 text-brand-pink rounded-full flex items-center justify-center mb-8 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      
      <h1 className="text-5xl font-black text-brand-charcoal uppercase tracking-tighter mb-4">
        Order Confirmed
      </h1>
      
      <p className="text-brand-charcoal/60 font-bold max-w-md mb-2">
        Thank you for being part of the journey.
      </p>
      
      {sessionId && (
        <p className="text-[10px] text-brand-charcoal/30 font-mono mb-10">
          Ref: {sessionId.slice(0, 20)}...
        </p>
      )}

      <Link 
        to="/collection" 
        className="bg-brand-charcoal text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-pink transition-all shadow-xl"
      >
        Continue Exploring
      </Link>
    </div>
  );
};

export default Success;