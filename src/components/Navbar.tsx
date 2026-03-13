import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenCart: () => void;
}

const Navbar = ({ onOpenCart }: NavbarProps) => {
  const { totalItems } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (totalItems === 0) return;
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [totalItems]);

  const navLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Collection', path: '/collection' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Seasonal', path: '/seasonal', badge: true },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-cream/80 backdrop-blur-xl border-b border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Mobile Menu Toggle (Hamburger) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-brand-charcoal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter text-brand-charcoal group">
          SAVED <span className="text-brand-pink transition-colors group-hover:text-brand-light-yellow">&</span> SENT
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-brand-charcoal/70">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="hover:text-brand-pink transition-colors relative"
            >
              {link.name}
              {link.badge && (
                <span className="absolute -top-1 -right-3 flex h-1.5 w-1.5 rounded-full bg-brand-pink animate-pulse"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-5">
          <button 
            onClick={onOpenCart}
            className={`relative p-2 text-brand-charcoal hover:text-brand-pink transition-all group ${isAnimating ? 'animate-cart-pop' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.112 16.826a2.25 2.25 0 0 1-2.244 2.398H5.277a2.25 2.25 0 0 1-2.244-2.398L4.145 8.507a2.25 2.25 0 0 1 2.244-2.398h11.233a2.25 2.25 0 0 1 2.244 2.398Z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand-charcoal text-[10px] font-bold text-white shadow-lg ring-2 ring-brand-cream group-hover:bg-brand-pink transition-colors">
                {totalItems}
              </span>
            )}
          </button>

          <Link
            to="/collection"
            className="hidden sm:block bg-brand-charcoal text-brand-cream px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-pink transition-all shadow-md active:scale-95"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-brand-cream border-t border-brand-charcoal/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6 text-[12px] font-black uppercase tracking-[0.3em] text-brand-charcoal/80">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="hover:text-brand-pink active:text-brand-pink transition-colors">
                  {link.name}
                </Link>
              ))}
              <Link to="/collection" className="text-brand-pink">Shop the collection</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;