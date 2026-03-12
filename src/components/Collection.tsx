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

  // Helper function to group products by category
  const groupedProducts = products.reduce((acc: { [key: string]: Product[] }, product) => {
    const category = product.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

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
        <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
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

        {/* Categorized Sections */}
        {Object.keys(groupedProducts).length > 0 ? (
          Object.entries(groupedProducts).map(([category, items]) => (
            <section key={category} className="mb-20">
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-brand-charcoal text-2xl font-black uppercase tracking-widest italic">
                  {category.replace('-', ' ')}
                </h3>
                <div className="flex-grow h-px bg-brand-charcoal/10"></div>
              </div>

              {/* Product Grid for this category */}
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </section>
          ))
        ) : (
          /* Empty State */
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