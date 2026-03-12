import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenCart: () => void;
}

const Navbar = ({ onOpenCart }: NavbarProps) => {
  const { totalItems } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation whenever totalItems changes (and isn't 0)
  useEffect(() => {
    if (totalItems === 0) return;

    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400); // Matches CSS duration

    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-cream/80 backdrop-blur-xl px-6 py-4 border-b border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-brand-charcoal group">
          SAVED <span className="text-brand-pink transition-colors group-hover:text-brand-light-yellow">&</span> SENT
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-brand-charcoal/70">
          <Link to="/about" className="hover:text-brand-pink transition-colors">About Us</Link>
          <Link to="/collection" className="hover:text-brand-pink transition-colors">Collection</Link>
          <Link
            to="/seasonal"
            className="hover:text-brand-pink transition-colors relative"
          >
            Seasonal
            <span className="absolute -top-1 -right-3 flex h-1.5 w-1.5 rounded-full bg-brand-pink animate-pulse"></span>
          </Link>
          <Link to="/contact" className="hover:text-brand-pink transition-colors">Contact</Link>
        </div>

        {/* Actions: Cart & Shop */}
        <div className="flex items-center gap-5">
          {/* Shopping Bag Trigger with Animation Class */}
          <button 
            onClick={onOpenCart}
            className={`relative p-2 text-brand-charcoal hover:text-brand-pink transition-all group ${
              isAnimating ? 'animate-cart-pop' : ''
            }`}
            aria-label="Open Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.112 16.826a2.25 2.25 0 0 1-2.244 2.398H5.277a2.25 2.25 0 0 1-2.244-2.398H5.277a2.25 2.25 0 0 1-2.244-2.398L4.145 8.507a2.25 2.25 0 0 1 2.244-2.398h11.233a2.25 2.25 0 0 1 2.244 2.398Z" />
            </svg>
            
            {/* Notification Bubble */}
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand-charcoal text-[10px] font-bold text-white shadow-lg ring-2 ring-brand-cream group-hover:bg-brand-pink transition-colors">
                {totalItems}
              </span>
            )}
          </button>

          {/* Quick Shop Link */}
          <Link
            to="/collection"
            className="hidden sm:block bg-brand-charcoal text-brand-cream px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-pink transition-all shadow-md active:scale-95"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;