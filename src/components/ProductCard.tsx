import { useState } from 'react';
import { Link } from 'react-router-dom';

// 1. Interfaces - Exported for global use
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
  isCustomizable?: boolean;
  stripePriceId: string;
  variants?: Variant[];
}

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  
  const [isHovered, setIsHovered] = useState(false);

  const activeImage = selectedVariant?.variantImage || product.imageUrl;
  const isOutOfStock = selectedVariant ? !selectedVariant.variantInStock : !product.inStock;

  return (
    <div className="group flex flex-col">
      {/* Primary Image Link */}
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

          {/* Front/Back Indicator */}
          {product.backImageUrl && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter text-brand-charcoal shadow-sm">
              {isHovered ? 'Back View' : 'Front View'}
            </div>
          )}
        </div>
      </Link>

      <div className="mt-6 px-2">
        <div className="flex justify-between items-start">
          {/* Info Section - Now the main anchor for the whole card */}
          <Link to={`/product/${product.slug}`} className="flex-1 block transition-all">
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-pink font-bold mb-1">
              {product.category.replace('-', ' ')}
            </p>
            <h3 className="text-brand-charcoal text-xl font-bold uppercase tracking-tight leading-tight group-hover:text-brand-pink transition-colors">
              {product.name}
            </h3>
            <p className="text-brand-charcoal/60 font-medium mt-1">
              {product.isCustomizable ? `From $${product.price}` : `$${product.price}`}
            </p>
          </Link>
          
          {/* Decorative Arrow Indicator instead of "Add to Cart" */}
          <div className="text-brand-pink opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 flex items-center gap-1 mt-6">
             <span className="text-[9px] font-black uppercase tracking-[0.2em]">View</span>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
             </svg>
          </div>
        </div>

        {/* Variant Selectors - Keeping these as they are great for visual shopping */}
        {product.variants && product.variants.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.variantName}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedVariant(variant);
                }}
                className={`px-3 py-1 text-[10px] font-bold rounded-full border-2 transition-all uppercase tracking-wider z-10 ${
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