import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, GET_PRODUCT_BY_SLUG } from '../library/sanity';
import type { Product, Variant } from './ProductCard';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [showBack, setShowBack] = useState(false);

  // --- Customization State ---
  const [garmentStyle, setGarmentStyle] = useState('T-Shirt');
  const [customSize, setCustomSize] = useState('L');
  const [customColor, setCustomColor] = useState('');

  const stylePrices: { [key: string]: number } = {
    'T-Shirt': 20,
    'Long Sleeve': 23,
    'Crewneck': 35,
    'Sweatshirt': 40
  };

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

  if (!product) return <div className="min-h-screen bg-brand-cream p-20 text-center uppercase font-black tracking-widest">Product not found</div>;

  const activeImage = showBack && product.backImageUrl 
    ? product.backImageUrl 
    : (selectedVariant?.variantImage || product.imageUrl);

  const displayPrice = product.isCustomizable ? stylePrices[garmentStyle] : product.price;
  const isOutOfStock = selectedVariant ? !selectedVariant.variantInStock : !product.inStock;

  // 3. Updated handleAddToCart with Context logic
  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: displayPrice,
      image: activeImage,
      quantity: 1,
      // Pass the custom fields to the cart
      style: product.isCustomizable ? garmentStyle : undefined,
      size: product.isCustomizable ? customSize : undefined,
      color: product.isCustomizable ? customColor : undefined,
      variantName: selectedVariant?.variantName
    });

    // We'll replace this alert with a slide-out cart drawer soon!
    alert(`${product.name} added to your journey!`);
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <Link to="/collection" className="text-brand-charcoal/40 text-xs font-black uppercase tracking-[0.2em] hover:text-brand-pink transition-colors">
          ← Back to Collection
        </Link>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Image Viewer */}
          <div className="sticky top-24">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-2xl border-[12px] border-white">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
              
              {product.backImageUrl && (
                <button 
                  onClick={() => setShowBack(!showBack)}
                  className="absolute bottom-8 right-8 bg-brand-charcoal text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-brand-pink transition-all active:scale-95"
                >
                  View {showBack ? 'Front' : 'Back'}
                </button>
              )}
            </div>
          </div>

          {/* Right: Details & Customization */}
          <div className="flex flex-col pt-4">
            <span className="text-brand-pink font-black uppercase tracking-[0.4em] text-[10px] mb-4">
              {product.category?.replace('-', ' ')}
            </span>
            <h1 className="text-brand-charcoal text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              {product.name}
            </h1>
            <p className="text-3xl font-medium text-brand-charcoal/90 mb-10">${displayPrice}</p>

            <div className="h-px w-full bg-brand-charcoal/10 mb-10" />

            <div className="text-brand-charcoal/70 mb-12 text-lg leading-relaxed">
              {product.description}
            </div>

            {/* --- CUSTOMIZATION PANEL --- */}
            {product.isCustomizable && (
              <div className="mb-12 p-8 bg-white rounded-[2rem] shadow-sm border-2 border-brand-light-yellow/30">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-brand-light-yellow animate-pulse"></div>
                  <h3 className="text-brand-charcoal font-black uppercase tracking-widest text-xs">Custom Options</h3>
                </div>

                <div className="space-y-6">
                  {/* Style Select */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-charcoal/40">Select Garment</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(stylePrices).map((style) => (
                        <button
                          key={style}
                          onClick={() => setGarmentStyle(style)}
                          className={`py-3 px-4 rounded-xl text-[11px] font-bold uppercase transition-all border-2 ${
                            garmentStyle === style 
                            ? 'border-brand-pink bg-brand-pink text-white shadow-md' 
                            : 'border-brand-cream bg-brand-cream/50 text-brand-charcoal/50 hover:border-brand-pink/20'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Size Select */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-charcoal/40">Size (up to 5X)</label>
                      <select 
                        value={customSize}
                        onChange={(e) => setCustomSize(e.target.value)}
                        className="w-full bg-brand-cream/50 border-2 border-transparent focus:border-brand-pink rounded-xl px-4 py-4 outline-none font-bold text-sm transition-all appearance-none"
                      >
                        {['XS', 'S', 'M', 'L', 'XL', '2X', '3X', '4X', '5X'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Color Input */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-charcoal/40">Garment Color</label>
                      <input 
                        type="text"
                        placeholder="e.g. Sage"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="w-full bg-brand-cream/50 border-2 border-transparent focus:border-brand-pink rounded-xl px-4 py-4 outline-none font-bold text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Variants (if any) */}
            {!product.isCustomizable && product.variants && product.variants.length > 0 && (
              <div className="mb-12">
                <h3 className="text-brand-charcoal font-black uppercase tracking-widest text-xs mb-6">Select Option</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.variantName}
                      onClick={() => { setSelectedVariant(v); setShowBack(false); }}
                      className={`px-8 py-4 rounded-2xl border-2 font-bold transition-all uppercase tracking-widest text-xs ${
                        selectedVariant?.variantName === v.variantName
                          ? 'border-brand-pink bg-brand-pink text-white shadow-xl'
                          : 'border-brand-charcoal/5 bg-white text-brand-charcoal/40 hover:border-brand-pink/20'
                      }`}
                    >
                      {v.variantName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-sm shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 ${
                isOutOfStock 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-brand-charcoal text-white hover:bg-brand-pink'
              }`}
            >
              {isOutOfStock ? 'Sold Out' : 'Add to Journey'}
            </button>

            <p className="mt-8 text-center text-[10px] font-black text-brand-charcoal/30 uppercase tracking-[0.4em]">
              Saved by Grace • Sent with Purpose
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;