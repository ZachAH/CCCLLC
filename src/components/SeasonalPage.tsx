import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, GET_SEASONAL_PRODUCTS } from '../library/sanity';
import ProductCard from './ProductCard';
// 1. Import the official Product type from the card file
import type { Product } from './ProductCard'; 

// DELETE the local 'interface Variant' and 'interface Product' sections from here!

const SeasonalPage = () => {
  // 2. Use that imported Product type here
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(GET_SEASONAL_PRODUCTS)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Sanity fetch error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-cream">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-charcoal font-bold uppercase tracking-widest text-sm">Preparing the Season</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream px-6 py-12 lg:py-20">
      <div className="mx-auto max-w-6xl">

        {/* Header Section */}
        <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="text-brand-charcoal text-xs font-bold uppercase tracking-widest hover:text-brand-pink transition-colors order-2 md:order-1">
            ← Back Home
          </Link>

          <div className="text-center order-1 md:order-2">
            <p className="text-brand-pink text-xs font-black uppercase tracking-[0.3em] mb-2">Celebrate the</p>
            <h2 className="text-brand-charcoal text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Current Season
            </h2>
            <div className="h-1.5 w-16 bg-brand-light-yellow mx-auto mt-3"></div>
          </div>

          <div className="hidden md:block w-20 order-3"></div>
        </div>

        {/* Seasonal Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="py-24 text-center bg-white/40 rounded-3xl border-2 border-dashed border-brand-light-yellow/40">
            <p className="text-brand-charcoal/50 font-medium italic text-xl tracking-tight">
              A new season is blooming. Check back soon for the next drop!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonalPage;