import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, GET_PRODUCTS } from '../library/sanity';

// Defining an interface makes working with the data much easier
interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: string;
}

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-cream">
        <p className="text-brand-charcoal animate-pulse font-bold">Loading Collection...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Navigation / Header */}
        <div className="mb-12 flex items-center justify-between">
          <Link to="/" className="text-brand-charcoal font-bold hover:underline">
            ← Back Home
          </Link>
          <h2 className="text-brand-charcoal text-3xl font-extrabold uppercase tracking-tight">
            The Collection
          </h2>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product._id} className="group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                   <span className="bg-brand-pink rounded-full px-3 py-1 text-xs font-bold text-white shadow-md">
                     NEW
                   </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between px-2">
                <div>
                  <h3 className="text-brand-charcoal text-xl font-bold uppercase tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-brand-charcoal/60 font-medium">${product.price}</p>
                </div>
                <button className="bg-brand-charcoal hover:bg-brand-pink rounded-full p-3 text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-brand-charcoal/50 italic text-lg">Your collection is currently being curated. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;