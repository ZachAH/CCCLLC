import { useEffect, useState } from 'react';
import { client, GET_SEASONAL_PRODUCTS } from '../library/sanity';
import { Link } from 'react-router-dom';

// Define the shape of our seasonal product
interface SeasonalProduct {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  seasonTag: string;
  inStock: boolean;
}

const SeasonalPage = () => {
  const [products, setProducts] = useState<SeasonalProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(GET_SEASONAL_PRODUCTS)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-pink border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pb-20">
      {/* Seasonal Hero Header */}
      <header className="bg-brand-light-yellow/30 px-6 py-16 text-center">
        <h1 className="text-brand-charcoal font-serif text-4xl md:text-6xl italic">
          Celebrate the Season
        </h1>
        <p className="text-brand-charcoal/70 mt-4 text-lg font-medium uppercase tracking-widest">
          Limited Edition Faith-Inspired Pieces
        </p>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link 
                key={product._id} 
                to={`/product/${product.slug}`}
                className="group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-white shadow-md transition-all group-hover:shadow-xl">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Season Tag Badge */}
                  {product.seasonTag && (
                    <span className="absolute top-4 left-4 rounded-full bg-brand-pink px-3 py-1 text-xs font-bold text-white uppercase shadow-sm">
                      {product.seasonTag}
                    </span>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-charcoal/40 backdrop-blur-[2px]">
                      <span className="rounded-md bg-white px-4 py-2 font-bold text-brand-charcoal uppercase tracking-tighter">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="mt-4 text-center">
                  <h3 className="text-brand-charcoal text-xl font-bold">{product.name}</h3>
                  <p className="text-brand-pink font-semibold mt-1">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-brand-charcoal/50 italic text-xl">
              New seasonal items arriving soon. Stay tuned!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SeasonalPage;