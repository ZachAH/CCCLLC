import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, GET_PRODUCTS } from '../library/sanity';
import ProductCard from './ProductCard'; 
import type { Product } from './ProductCard';

const Collection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(GET_PRODUCTS)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Sanity fetch error:", error);
        setLoading(false);
      });
  }, []);

  const groupedProducts = products.reduce((acc: { [key: string]: Product[] }, product) => {
    const category = product.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  const categories = Object.keys(groupedProducts);

  // Smooth scroll helper
  const scrollToCategory = (category: string) => {
    const element = document.getElementById(`category-${category}`);
    if (element) {
      const offset = 100; // Account for sticky navbars
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-cream">
        <div className="text-center">
            <div className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-brand-charcoal font-bold uppercase tracking-widest text-sm">Loading Collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream px-6 py-12 lg:py-20">
      <div className="mx-auto max-w-6xl">
        
        {/* Navigation & Header */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="text-brand-charcoal text-xs font-bold uppercase tracking-widest hover:text-brand-pink transition-colors order-2 md:order-1">
            ← Back Home
          </Link>
          <div className="text-center order-1 md:order-2">
             <h2 className="text-brand-charcoal text-4xl md:text-5xl font-black uppercase tracking-tighter">
                The Collection
             </h2>
             <div className="h-1.5 w-16 bg-brand-pink mx-auto mt-3"></div>
          </div>
          <div className="hidden md:block w-20 order-3"></div>
        </div>

        {/* CATEGORY MINI-NAV */}
        {categories.length > 1 && (
          <div className="sticky top-20 z-40 bg-brand-cream/90 backdrop-blur-md py-4 mb-12 border-b border-brand-charcoal/5">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => scrollToCategory(category)}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal/40 hover:text-brand-pink transition-all border-b-2 border-transparent hover:border-brand-pink pb-1"
                >
                  {category.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Categorized Sections */}
        {categories.length > 0 ? (
          Object.entries(groupedProducts).map(([category, items]) => (
            <section 
              key={category} 
              id={`category-${category}`} // Important for scrolling
              className="mb-20 scroll-mt-32" 
            >
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-brand-charcoal text-2xl font-black uppercase tracking-widest italic">
                  {category.replace('-', ' ')}
                </h3>
                <div className="grow h-px bg-brand-charcoal/10"></div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="py-24 text-center bg-white/40 rounded-3xl border-2 border-dashed border-brand-pink/20">
            <p className="text-brand-charcoal/50 font-medium italic text-xl tracking-tight">
              Our latest journey is being curated. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;