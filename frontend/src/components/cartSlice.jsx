// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Cart slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
        toast.info(`${product.name} quantity updated!`);
      } else {
        state.items.push({ ...product, quantity: 1 });
        toast.success(`${product.name} added to cart!`);
      }
      
      saveCartToStorage(state.items);
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);
      if (item) {
        item.quantity += 1;
        saveCartToStorage(state.items);
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === productId);
      
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
          toast.warn(`${item.name} removed from cart!`);
        }
        
        saveCartToStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;