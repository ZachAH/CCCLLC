import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Smooth scroll helper
  const scrollToMission = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' });
  };

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
          <Link 
            to="/seasonal" 
            className="bg-brand-pink hover:bg-brand-pink/90 rounded-full px-10 py-4 font-bold text-white transition-all shadow-lg hover:scale-105 inline-block"
          >
            Celebrate the Season
          </Link>
          
          {/* Updated to trigger smooth scroll */}
          <button 
            onClick={scrollToMission}
            className="border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white rounded-full border-2 px-10 py-4 font-bold transition-all inline-block"
          >
            Our Mission
          </button>
        </div>

        <div className="bg-brand-pink/20 mt-16 aspect-video w-full max-w-5xl rounded-2xl border-4 border-white shadow-2xl flex items-center justify-center text-brand-pink italic">
          [ Featured Lifestyle Image Here ]
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-brand-pink font-serif text-3xl md:text-5xl italic mb-8">
            Our Mission
          </h2>
          
          <div className="space-y-6 text-brand-charcoal/90 text-lg md:text-xl leading-relaxed">
            <p className="font-semibold text-brand-charcoal">
              "Go into all the world and preach the gospel to all creation." — Mark 16:15
            </p>
            <p>
              Saved & Sent was born out of a desire to create more than just clothing. 
              We believe that every piece of apparel is an opportunity to start a conversation, 
              share a testimony, and spread the light of Christ.
            </p>
            <p>
              Each design is prayerfully crafted to remind you that you are 
              <strong> Saved</strong> by grace and <strong>Sent</strong> with a purpose. 
              Whether you're at the gym, the grocery store, or in your local community, 
              we want to equip you to wear your faith boldly.
            </p>
          </div>

          {/* Optional decorative element using your light yellow */}
          <div className="mt-12 flex justify-center">
            <div className="h-1 w-24 bg-brand-light-yellow rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;