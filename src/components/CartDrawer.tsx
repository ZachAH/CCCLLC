import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-brand-charcoal/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-cream z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="p-6 border-b border-brand-charcoal/5 flex justify-between items-center">
            <h2 className="text-brand-charcoal font-black uppercase tracking-tighter text-2xl">Your Journey</h2>
            <button onClick={onClose} className="text-brand-charcoal hover:text-brand-pink transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-6 space-y-8">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-brand-charcoal/40 italic font-medium">Your cart is currently empty.</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-brand-pink font-bold uppercase tracking-widest text-xs border-b-2 border-brand-pink"
                >
                  Start your collection
                </button>
              </div>

            ) : (
              cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex gap-4">
                  <div className="w-24 h-32 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-brand-charcoal font-bold uppercase tracking-tight text-sm leading-tight">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-brand-charcoal/30 hover:text-brand-pink transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>

                    {/* Display Customizations */}
                    <div className="mt-2 space-y-0.5">
                      {item.style && <p className="text-[10px] uppercase font-bold text-brand-pink">{item.style}</p>}
                      <div className="flex gap-2 text-[10px] text-brand-charcoal/60 font-medium">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span>• Color: {item.color}</span>}
                      </div>
                      {item.variantName && <p className="text-[10px] text-brand-charcoal/60">Option: {item.variantName}</p>}
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-[10px] font-black uppercase tracking-widest">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-brand-charcoal">${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-brand-charcoal/5">
              <div className="flex justify-between items-center mb-6">
                <span className="text-brand-charcoal/40 uppercase font-bold text-xs tracking-[0.2em]">Subtotal</span>
                <span className="text-2xl font-black text-brand-charcoal tracking-tighter">${totalPrice}</span>
              </div>
              <Link
                to="/checkout"
                onClick={onClose} // Close drawer when navigating
                className="w-full bg-brand-charcoal text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:bg-brand-pink transition-all flex items-center justify-center"
              >
                Proceed to Checkout
              </Link>
              <p className="mt-4 text-center text-[10px] font-bold text-brand-charcoal/30 uppercase tracking-widest">
                Shipping calculated at next step
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;