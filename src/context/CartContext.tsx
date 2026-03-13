import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface CartItem {
  _id: string; // Ensure this matches your Sanity _id for the backend check
  name: string;
  price: number;
  image: string;
  quantity: number;
  style?: string;
  size?: string;
  color?: string;
  variantName?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, variantKey?: string) => void; // Updated for better removal logic
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from LocalStorage so the cart persists if they refresh the page
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('saved_and_sent_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Keep LocalStorage in sync whenever the cart changes
  useEffect(() => {
    localStorage.setItem('saved_and_sent_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(item => 
        item._id === newItem._id && 
        item.style === newItem.style && 
        item.size === newItem.size && 
        item.color === newItem.color &&
        item.variantName === newItem.variantName
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    // Note: If you have variants, you might want to filter by more than just ID
    setCart(prev => prev.filter(item => item._id !== id));
  };

  // This is the big one for the Success page
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('saved_and_sent_cart');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};