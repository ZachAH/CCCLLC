import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  // Smooth scroll helper
  const scrollToMission = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-cream overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center">
        
        {/* SUN & CROSS ANIMATION CONTAINER */}
        <div className="relative w-full flex justify-center mb-8 h-40">
          
          {/* Pulsing Sun & Rays */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute bottom-4 flex items-center justify-center"
          >
            {/* The Main Sun Glow */}
            <div className="w-24 h-24 bg-brand-light-yellow rounded-full blur-2xl opacity-60 absolute" />
            
            {/* The Sun Rays (Pulsing) */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 45, 90],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute w-40 h-40"
            >
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-20 bg-brand-light-yellow origin-top -translate-x-1/2 rounded-full opacity-40"
                  style={{ transform: `rotate(${i * 45}deg) translateY(-40px)` }}
                />
              ))}
            </motion.div>
            
            {/* The Core Sun Circle */}
            <div className="w-16 h-16 bg-brand-light-yellow rounded-full relative z-0 shadow-[0_0_40px_rgba(255,249,196,0.8)]" />
          </motion.div>

          {/* The Rising Cross */}
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="relative z-10 flex items-center justify-center self-end"
          >
            {/* Using your cross.svg icon */}
            <img 
              src="/cross.svg" 
              alt="Cross" 
              className="w-16 h-16 text-brand-charcoal drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]" 
            />
          </motion.div>
        </div>

        {/* Text Content with Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h1 className="text-brand-charcoal mb-4 text-5xl font-extrabold tracking-tight md:text-7xl uppercase">
            SAVED <span className="text-brand-pink">&</span> SENT
          </h1>
          
          <p className="text-brand-charcoal/80 max-w-xl text-lg md:text-xl mx-auto">
            Purpose-driven apparel designed to inspire. <br />
            Wear your faith, share your journey.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link 
            to="/collection" 
            className="bg-brand-pink hover:bg-brand-pink/90 rounded-full px-10 py-4 font-bold text-white transition-all shadow-lg hover:scale-105 inline-block"
          >
            Shop the Collection
          </Link>
          
          <button 
            onClick={scrollToMission}
            className="border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white rounded-full border-2 px-10 py-4 font-bold transition-all inline-block"
          >
            Our Mission
          </button>
        </motion.div>

        {/* Featured Lifestyle Image Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="bg-brand-pink/10 mt-16 aspect-video w-full max-w-5xl rounded-3xl border-4 border-white shadow-2xl flex items-center justify-center text-brand-pink italic"
        >
          <span className="opacity-40 font-black tracking-widest uppercase">I am thinking a picutre of the family or you working on the items?</span>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-pink font-serif text-3xl md:text-5xl italic mb-8"
          >
            Our Mission
          </motion.h2>
          
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
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="h-1 w-24 bg-brand-light-yellow rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;