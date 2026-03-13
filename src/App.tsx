import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Collection from './components/Collection'; 
import SeasonalPage from './components/SeasonalPage';
import ContactPage from './components/ContactPage';
import ProductDetails from './components/ProductDetails';
import AboutPage from './components/AboutUs';
import CartDrawer from './components/CartDrawer';
import CheckoutPage from './components/CheckoutPage';
import Success from './pages/Success';
import FAQ from './pages/Faq';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // State to handle the slide-out cart visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartProvider>
      <Router>
      <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-brand-cream selection:bg-brand-pink/30">
          
          {/* Pass the openCart function to the Navbar so the 
              shopping bag icon can trigger the drawer.
          */}
          <Navbar onOpenCart={openCart} />

          <main className="grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/seasonal" element={<SeasonalPage />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/about" element={<AboutPage />} />            
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              
              {/* Stripe will redirect back to this route */}
              <Route path="/success" element={<Success />} />
            </Routes>
          </main>

          <Footer />

          {/* The CartDrawer sits at the root level so it can 
              overlay the entire app with its backdrop.
          */}
          <CartDrawer 
            isOpen={isCartOpen} 
            onClose={closeCart} 
          />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;