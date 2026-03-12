import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-brand-cream pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Story */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black tracking-tighter mb-4">
              SAVED <span className="text-brand-pink">&</span> SENT
            </h2>
            <p className="text-brand-cream/60 text-sm leading-relaxed">
              Purpose-driven apparel designed to inspire. 
              Wear your faith, share your journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-brand-light-yellow font-bold uppercase tracking-widest text-xs mb-6">Explore</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/collection" className="hover:text-brand-pink transition-colors">The Collection</Link></li>
              <li><Link to="/seasonal" className="hover:text-brand-pink transition-colors">Celebrate the Season</Link></li>
              <li><Link to="/#mission" className="hover:text-brand-pink transition-colors">Our Mission</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-brand-light-yellow font-bold uppercase tracking-widest text-xs mb-6">Support</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/contact" className="hover:text-brand-pink transition-colors">Contact Us</Link></li>
              <li><a href="mailto:savedandsent26@yahoo.com" className="hover:text-brand-pink transition-colors">Email Us</a></li>
              <li className="text-brand-cream/40">Shipping & Returns</li>
            </ul>
          </div>

          {/* Socials & Community */}
          <div>
            <h3 className="text-brand-light-yellow font-bold uppercase tracking-widest text-xs mb-6">Community</h3>
            <div className="flex gap-4 mb-6">
              {/* Instagram Icon */}
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-brand-pink transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* Facebook Icon */}
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-brand-pink transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
            </div>
            <p className="text-xs text-brand-cream/40 font-bold uppercase tracking-tighter">
              Join the journey @SavedAndSent
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-cream/30">
          <p>© {currentYear} Saved & Sent. All rights reserved.</p>
          <p>Handcrafted for His glory.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;