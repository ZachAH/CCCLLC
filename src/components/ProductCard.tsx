import { useState } from 'react';
import { Link } from 'react-router-dom';

// 1. Interfaces - Exported so other pages can use them
export interface Variant {
  variantName: string;
  variantImage: string;
  variantPriceId: string;
  variantInStock: boolean;
}

export interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  backImageUrl?: string;
  price: number;
  slug: string;
  description: string;
  category: string;
  inStock: boolean;
  isSeasonal?: boolean;
  seasonTag?: string;
  stripePriceId: string;
  variants?: Variant[];
}

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  
  const [isHovered, setIsHovered] = useState(false);

  const activeImage = selectedVariant?.variantImage || product.imageUrl;
  const activePriceId = selectedVariant?.variantPriceId || product.stripePriceId;
  const isOutOfStock = selectedVariant ? !selectedVariant.variantInStock : !product.inStock;

  const handleCheckout = (e: React.MouseEvent, priceId: string) => {
    // Prevent the click from triggering the parent <Link>
    e.preventDefault();
    e.stopPropagation();

    if (!priceId) {
      alert("Coming soon! Stripe ID not linked yet.");
      return;
    }
    console.log("Redirecting to Stripe:", priceId);
  };

  return (
    <div className="group flex flex-col">
      {/* Wrap the clickable area in a Link to the specific product slug */}
      <Link to={`/product/${product.slug}`} className="cursor-pointer">
        <div 
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg transition-all duration-300 group-hover:shadow-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered && product.backImageUrl ? product.backImageUrl : activeImage}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-500 ease-in-out"
          />
          
          {/* Dynamic Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isOutOfStock ? (
              <span className="bg-brand-charcoal px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest rounded-full">
                Sold Out
              </span>
            ) : product.isSeasonal && product.seasonTag ? (
              <span className="bg-brand-light-yellow px-3 py-1 text-[10px] font-black text-brand-charcoal uppercase tracking-widest rounded-full shadow-md">
                 {product.seasonTag}
              </span>
            ) : (
               <span className="bg-brand-pink px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-md">
                  New
               </span>
            )}
          </div>

          {product.backImageUrl && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter text-brand-charcoal shadow-sm">
              {isHovered ? 'Back' : 'Front'}
            </div>
          )}
        </div>
      </Link>

      <div className="mt-6 px-2">
        <div className="flex justify-between items-start">
          {/* Link the Title section as well */}
          <Link to={`/product/${product.slug}`} className="flex-1 block hover:opacity-70 transition-opacity">
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-pink font-bold mb-1">
              {product.category.replace('-', ' ')}
            </p>
            <h3 className="text-brand-charcoal text-xl font-bold uppercase tracking-tight leading-tight">
              {product.name}
            </h3>
            <p className="text-brand-charcoal/60 font-medium mt-1">${product.price}</p>
          </Link>
          
          {/* Quick Add Button - Styled with e.stopPropagation to avoid jumping to product page */}
          <button 
            onClick={(e) => handleCheckout(e, activePriceId)}
            disabled={isOutOfStock}
            className={`rounded-full p-3 text-white transition-all shadow-md ml-4 z-10 ${
              isOutOfStock ? 'bg-gray-300 cursor-not-allowed' : 'bg-brand-charcoal hover:bg-brand-pink hover:scale-110 active:scale-95'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        {/* Variant Selectors - prevent clicking these from going to the product page */}
        {product.variants && product.variants.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.variantName}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedVariant(variant);
                }}
                className={`px-3 py-1 text-[11px] font-bold rounded-full border-2 transition-all uppercase tracking-wider z-10 ${
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

export default ProductCard;