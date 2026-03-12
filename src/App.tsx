import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import the provider
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Collection from './components/Collection'; 
import SeasonalPage from './components/SeasonalPage';
import ContactPage from './components/ContactPage';
import ProductDetails from './components/ProductDetails';
import AboutPage from './components/AboutUs';

function App() {
  return (
    /* Wrapping the entire App in CartProvider so state 
       persists across every route and component.
    */
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-brand-cream selection:bg-brand-pink/30">
          
          {/* Navigation stays at the top */}
          <Navbar />

          {/* Main content area grows to fill available space */}
          <main className="grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/collection" element={<Collection />} />
              
              {/* The seasonal/special drop page */}
              <Route path="/seasonal" element={<SeasonalPage />} />
              
              {/* Individual Product Detail Page */}
              <Route path="/product/:slug" element={<ProductDetails />} />
              
              {/* Support and Story pages */}
              <Route path="/about" element={<AboutPage />} />            
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>

          {/* Footer stays at the bottom */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;