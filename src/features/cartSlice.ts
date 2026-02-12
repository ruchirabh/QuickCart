import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showMessage } from 'react-native-flash-message';

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addedToCartIds: number[]; 
}

const initialState: CartState = {
  items: [],
  addedToCartIds: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        showMessage({
          message: 'Quantity Updated!',
          description: `${action.payload.title} quantity increased in cart`,
          type: 'info',
          icon: 'info',
        });
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.addedToCartIds.push(action.payload.id);
        showMessage({
          message: 'Added to Cart!',
          description: `${action.payload.title} has been added to your cart`,
          type: 'success',
          icon: 'success',
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.addedToCartIds = state.addedToCartIds.filter(
        id => id !== action.payload
      );
      showMessage({
        message: 'Removed from Cart',
        description: 'Item has been removed from your cart',
        type: 'warning',
        icon: 'warning',
      });
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: state => {
      state.items = [];
      state.addedToCartIds = [];
      showMessage({
        message: 'Cart Cleared',
        description: 'All items have been removed from your cart',
        type: 'info',
        icon: 'info',
      });
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;