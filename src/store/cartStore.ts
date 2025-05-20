import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '@/types/cart';
import { Product } from '@/types/product';

interface CartStore {
  cart: Cart;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const initialState: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: initialState,
      
      addToCart: (product: Product) => {
        set((state) => {
          const existingItemIndex = state.cart.items.findIndex(
            (item) => item.product.id === product.id
          );
          
          let updatedItems: CartItem[];
          
          if (existingItemIndex >= 0) {
            updatedItems = [...state.cart.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + 1,
            };
          } else {
            updatedItems = [...state.cart.items, { product, quantity: 1 }];
          }
          const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity, 
            0
          );
          
          return {
            cart: {
              items: updatedItems,
              totalItems,
              totalPrice,
            }
          };
        });
      },
      
      removeFromCart: (productId: number) => {
        set((state) => {
          const updatedItems = state.cart.items.filter(
            (item) => item.product.id !== productId
          );
          const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity, 
            0
          );
          
          return {
            cart: {
              items: updatedItems,
              totalItems,
              totalPrice,
            }
          };
        });
      },
      
      updateQuantity: (productId: number, quantity: number) => {
        set((state) => {
          const updatedItems = state.cart.items.map((item) => {
            if (item.product.id === productId) {
              return { ...item, quantity: Math.max(1, quantity) };
            }
            return item;
          });
          const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity, 
            0
          );
          
          return {
            cart: {
              items: updatedItems,
              totalItems,
              totalPrice,
            }
          };
        });
      },
      
      clearCart: () => {
        set({ cart: initialState });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
