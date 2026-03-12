import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, GET_PRODUCTS } from '../library/sanity';

// 1. Interfaces
interface Variant {
  variantName: string;
  variantImage: string;
  variantPriceId: string;
  variantInStock: boolean;
}

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  backImageUrl?: string; // New field for the back view
  price: number;
  slug: string;
  description: string;
  category: string;
  inStock: boolean;
  stripePriceId: string;
  variants?: Variant[];
}

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  
  // State to track hover for the front/back flip
  const [isHovered, setIsHovered] = useState(false);

  const activeImage = selectedVariant?.variantImage || product.imageUrl;
  const activePriceId = selectedVariant?.variantPriceId || product.stripePriceId;
  const isOutOfStock = selectedVariant ? !selectedVariant.variantInStock : !product.inStock;

  const handleCheckout = (priceId: string) => {
    if (!priceId) {
      alert("Coming soon! Stripe ID not linked yet.");
      return;
    }
    console.log("Redirecting to Stripe:", priceId);
  };

  return (
    <div className="group flex flex-col">
      {/* Image Container with Hover Flip */}
      <div 
        className="relative aspect-[4/5] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg transition-all duration-300 group-hover:shadow-xl cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={isHovered && product.backImageUrl ? product.backImageUrl : activeImage}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-500 ease-in-out"
        />
        
        {/* Indicators */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isOutOfStock ? (
            <span className="bg-brand-charcoal px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest rounded-full">
              Sold Out
            </span>
          ) : (
             <span className="bg-brand-pink px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-md">
                New
             </span>
          )}
        </div>

        {/* Front/Back Label */}
        {product.backImageUrl && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter text-brand-charcoal shadow-sm">
            {isHovered ? 'Back' : 'Front'}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="mt-6 px-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-pink font-bold mb-1">
              {product.category.replace('-', ' ')}
            </p>
            <h3 className="text-brand-charcoal text-xl font-bold uppercase tracking-tight leading-tight">
              {product.name}
            </h3>
            <p className="text-brand-charcoal/60 font-medium mt-1">${product.price}</p>
          </div>
          
          <button 
            onClick={() => handleCheckout(activePriceId)}
            disabled={isOutOfStock}
            className={`rounded-full p-3 text-white transition-all shadow-md ml-4 ${
              isOutOfStock ? 'bg-gray-300 cursor-not-allowed' : 'bg-brand-charcoal hover:bg-brand-pink hover:scale-110 active:scale-95'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        {/* Variant Selectors */}
        {product.variants && product.variants.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.variantName}
                onClick={() => setSelectedVariant(variant)}
                className={`px-3 py-1 text-[11px] font-bold rounded-full border-2 transition-all uppercase tracking-wider ${
                  selectedVariant?.variantName === variant.variantName
                    ? 'border-brand-pink bg-brand-pink text-white shadow-sm'
                    : 'border-gray-100 bg-white text-gray-400 hover:border-brand-pink/30'
                }`}
              >
                {variant.variantName}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
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