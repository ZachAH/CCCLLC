import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-cream/90 backdrop-blur-md px-6 py-4 border-b-2 border-brand-light-yellow/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tighter text-brand-charcoal">
          SAVED <span className="text-brand-pink">&</span> SENT
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-bold text-brand-charcoal/90">
          <Link to="/about" className="hover:text-brand-pink transition-colors">About Us</Link>
          <Link to="/collection" className="hover:text-brand-pink transition-colors">Shop</Link>
          <Link
            to="/seasonal"
            className="hover:text-brand-pink transition-colors relative"
          >
            Celebrate the Season
            <span className="absolute -top-1 -right-2 flex h-2 w-2 rounded-full bg-brand-light-yellow"></span>
          </Link>
          <Link to="/contact" className="hover:text-brand-pink transition-colors">Contact</Link>
        </div>

        {/* Action Button */}
        <Link
          to="/collection"
          className="bg-brand-pink text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-brand-charcoal transition-all"
        >
          Shop Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;