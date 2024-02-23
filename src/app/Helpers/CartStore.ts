import  { create } from 'zustand';
import { IProduct } from '@/app/Models/ProductModel';

type CartStore = {
  items: IProduct[];
  isCartModalOpen: boolean;
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: number) => void;
  toggleCartModal: () => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number, quantity: number) => void;
};

export const useCartStore = create<CartStore>((set) => {
  const storedItems = typeof window !== 'undefined' ? localStorage.getItem('cartItems') : null;
  const initialItems: IProduct[] = storedItems ? JSON.parse(storedItems) : [];

  return {
    items: initialItems,
    isCartModalOpen: false,
    addToCart: (product: IProduct) =>
      set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        const updatedItems = existingItem
          ? state.items.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    price: item.price + item.originalPrice,
                  } : item
            ) : [
              ...state.items, 
              { 
                ...product, 
                quantity: 1,
                price: Math.round(product.price), 
                originalPrice: Math.round(product.price)
              }
            ];

        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return { items: updatedItems };
      }),

    removeFromCart: (productId: number) =>
      set((state) => {
        const updatedItems = state.items.filter((item) => item.id !== productId);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return { items: updatedItems };
      }),

    toggleCartModal: () =>
      set((state) => ({ ...state, isCartModalOpen: !state.isCartModalOpen })),

    increaseQuantity: (productId: number) =>
      set((state) => {
        const updatedItems = state.items.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1, price: item.price + item.originalPrice }
            : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return { items: updatedItems };
      }),

    decreaseQuantity: (productId: number, quantity: number) =>
      set((state) => {
        if (quantity === 1) {
          const updatedItems = state.items.filter((item) => item.id !== productId);
          localStorage.setItem('cartItems', JSON.stringify(updatedItems));
          return { items: updatedItems };
        } else {
          const updatedItems = state.items.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: Math.max(item.quantity - 1, 0),
                  price: Math.max(item.price - item.originalPrice, 0),
                }
              : item
          );
          localStorage.setItem('cartItems', JSON.stringify(updatedItems));
          return { items: updatedItems };
        }
      }),
  };
});
