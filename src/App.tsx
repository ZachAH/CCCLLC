import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Collection from './components/Collection'; 
import SeasonalPage from './components/SeasonalPage';
import ContactPage from './components/ContactPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-cream">
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/collection" element={<Collection />} />
          
          {/* Pointing the /seasonal path to your new component */}
          <Route path="/seasonal" element={<SeasonalPage />} />
          
          {/* Future pages */}
          <Route path="/about" element={<div className="p-20 text-center">About Us Coming Soon</div>} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;