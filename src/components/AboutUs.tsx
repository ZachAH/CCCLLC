import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-brand-cream pb-20">
            {/* Hero Section */}
            <section className="bg-brand-charcoal text-brand-cream py-20 px-6 text-center">
                <h1 className="text-brand-pink font-serif text-5xl md:text-7xl italic mb-6">Our Story</h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-brand-cream/80 leading-relaxed">
                    More than a brand. A mission to wear your faith boldly
                    and share the light of Christ in every step.
                </p>
            </section>

            {/* The Narrative */}
            <section className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="aspect-3/4 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                        <img
                            src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop"
                            alt="Purposeful journey"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Decorative badge */}
                    <div className="absolute -bottom-6 -right-6 bg-brand-light-yellow text-brand-charcoal p-8 rounded-2xl shadow-xl hidden md:block">
                        <p className="font-black italic text-2xl tracking-tighter">Est. 2026</p>
                    </div>
                </div>

                <div className="space-y-6 text-brand-charcoal">
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">The Heart Behind the Brand</h2>
                    <div className="h-1.5 w-16 bg-brand-pink"></div>

                    <p className="text-lg leading-relaxed text-brand-charcoal/80">
                        Saved & Sent wasn't just born out of an idea—it was born out of a transformation.
                        After finding true happiness by reconnecting with God, I realized that
                        the clothes we wear can be powerful tools for the Kingdom.
                    </p>

                    <p className="text-lg leading-relaxed text-brand-charcoal/80 font-medium italic border-l-4 border-brand-light-yellow pl-4">
                        "I wanted to create apparel that didn't just look good, but carried a message
                        that could spark a conversation and change a life, just as mine was changed."
                    </p>

                    <p className="text-lg leading-relaxed text-brand-charcoal/80">
                        As a mother of two young boys and a future wife, I know the importance of
                        leaving a legacy of faith for the next generation. The name comes from the two
                        core pillars of that walk: we are <strong>Saved</strong> by the unwavering grace of God,
                        and we are <strong>Sent</strong> into the world to be His hands and feet.
                    </p>

                    <p className="text-lg leading-relaxed text-brand-charcoal/80">
                        Every piece you find here is a reflection of that journey—from finding peace
                        in Christ to walking boldly into the future He has prepared for my family and I.
                    </p>
                </div>
            </section>

            {/* Core Values / Pillar Section */}
            <section className="bg-brand-light-yellow/20 py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-brand-charcoal text-xs font-black uppercase tracking-[0.4em] mb-12">Our Pillars</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                        <div className="bg-white p-10 rounded-3xl shadow-lg border-b-4 border-brand-pink transition-transform hover:-translate-y-2">
                            <span className="text-4xl mb-4 block">📖</span>
                            <h3 className="font-bold uppercase tracking-widest text-brand-charcoal mb-4">Scripture Focused</h3>
                            <p className="text-brand-charcoal/70">Every design is rooted in the Word of God, meant to be a daily reminder of His promises.</p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-lg border-b-4 border-brand-light-yellow transition-transform hover:-translate-y-2">
                            <span className="text-4xl mb-4 block">🤝</span>
                            <h3 className="font-bold uppercase tracking-widest text-brand-charcoal mb-4">Community Built</h3>
                            <p className="text-brand-charcoal/70">We are more than a store; we are a community of believers walking this journey together.</p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-lg border-b-4 border-brand-charcoal transition-transform hover:-translate-y-2">
                            <span className="text-4xl mb-4 block">✨</span>
                            <h3 className="font-bold uppercase tracking-widest text-brand-charcoal mb-4">Quality Craft</h3>
                            <p className="text-brand-charcoal/70">We believe in excellence. From fabrics to prints, we strive for the best to honor Him.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 text-center px-6">
                <h2 className="text-brand-charcoal text-4xl font-black uppercase tracking-tighter mb-8">Ready to join the journey?</h2>
                <Link
                    to="/collection"
                    className="bg-brand-pink text-white px-12 py-5 rounded-full font-black uppercase tracking-widest shadow-xl hover:bg-brand-charcoal hover:scale-105 transition-all inline-block"
                >
                    Shop the Collection
                </Link>
            </section>
        </div>
    );
};

export default AboutPage;