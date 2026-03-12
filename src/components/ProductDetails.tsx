import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, GET_PRODUCT_BY_SLUG } from '../library/sanity';
import { type Product, type Variant } from './ProductCard';

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    client
      .fetch(GET_PRODUCT_BY_SLUG, { slug })
      .then((data) => {
        setProduct(data);
        if (data?.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
        setLoading(false);
      })
      .catch(console.error);
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-brand-pink border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return <div className="min-h-screen bg-brand-cream p-20 text-center">Product not found.</div>;

  const activeImage = showBack && product.backImageUrl 
    ? product.backImageUrl 
    : (selectedVariant?.variantImage || product.imageUrl);

  const activePriceId = selectedVariant?.variantPriceId || product.stripePriceId;
  const isOutOfStock = selectedVariant ? !selectedVariant.variantInStock : !product.inStock;

  return (
    <div className="min-h-screen bg-brand-cream pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <Link to="/collection" className="text-brand-charcoal/60 text-sm font-bold uppercase tracking-widest hover:text-brand-pink transition-colors">
          ← Back to Collection
        </Link>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-2xl border-8 border-white">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-700"
              />
              
              {/* Front/Back Toggle Button */}
              {product.backImageUrl && (
                <button 
                  onClick={() => setShowBack(!showBack)}
                  className="absolute bottom-6 right-6 bg-brand-charcoal text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg hover:bg-brand-pink transition-all"
                >
                  View {showBack ? 'Front' : 'Back'}
                </button>
              )}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <p className="text-brand-pink font-black uppercase tracking-[0.3em] text-xs mb-2">
              {product.category.replace('-', ' ')}
            </p>
            <h1 className="text-brand-charcoal text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-medium text-brand-charcoal/80 mb-8">${product.price}</p>

            <div className="h-px w-full bg-brand-charcoal/10 mb-8" />

            <div className="prose prose-brand text-brand-charcoal/70 mb-10 text-lg">
              <p>{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-10">
                <h3 className="text-brand-charcoal font-bold uppercase tracking-widest text-xs mb-4">Select Style</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.variantName}
                      onClick={() => {
                        setSelectedVariant(v);
                        setShowBack(false);
                      }}
                      className={`px-6 py-3 rounded-xl border-2 font-bold transition-all uppercase tracking-widest text-sm ${
                        selectedVariant?.variantName === v.variantName
                          ? 'border-brand-pink bg-brand-pink text-white shadow-lg'
                          : 'border-brand-charcoal/10 bg-white text-brand-charcoal/40 hover:border-brand-pink/30'
                      }`}
                    >
                      {v.variantName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <button
              disabled={isOutOfStock}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${
                isOutOfStock 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-brand-charcoal text-white hover:bg-brand-pink'
              }`}
            >
              {isOutOfStock ? 'Currently Sold Out' : 'Add to Journey'}
            </button>

            {/* Trust Badge */}
            <p className="mt-6 text-center text-xs font-bold text-brand-charcoal/40 uppercase tracking-widest">
              ✨ Saved by grace. Sent with purpose. ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;