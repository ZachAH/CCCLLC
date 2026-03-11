import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-brand-charcoal mb-4 text-5xl font-extrabold tracking-tight md:text-7xl">
          SAVED <span className="text-brand-pink">&</span> SENT
        </h1>
        
        <p className="text-brand-charcoal/80 max-w-xl text-lg md:text-xl">
          Purpose-driven apparel designed to inspire. 
          Wear your faith, share your journey.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          {/* Linked to /collection */}
          <Link 
            to="/collection" 
            className="bg-brand-pink hover:bg-brand-pink/90 rounded-full px-8 py-4 font-bold text-white transition-all shadow-lg hover:scale-105 inline-block"
          >
            Shop Collection
          </Link>
          
          <Link 
            to="/mission"
            className="border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white rounded-full border-2 px-8 py-4 font-bold transition-all inline-block"
          >
            Our Mission
          </Link>
        </div>

        <div className="bg-brand-pink/20 mt-16 aspect-video w-full max-w-5xl rounded-2xl border-4 border-white shadow-2xl flex items-center justify-center text-brand-pink italic">
          [ Featured Lifestyle Image Here ]
        </div>
      </section>
    </div>
  );
};

export default LandingPage;