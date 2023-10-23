import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalItems: 0,
  items: [],
};

const updateTotalPrice = (state) => {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

const updateTotalItems = (state) => {
  state.totalItems = state.items.reduce((sum, obj) => {
    return obj.count + sum;
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      updateTotalItems(state);
      updateTotalPrice(state);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem && findItem.count > 1) {
        findItem.count--;
        state.totalItems--;
      } else {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
        state.totalItems--;
      }

      updateTotalPrice(state);
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      updateTotalItems(state);
      updateTotalPrice(state);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
});

export const selectCart = (state) => state.cart.items;

export const selectCartTotalPrice = (state) => state.cart.totalPrice;

export const selectCartTotalCount = (state) => state.cart.totalItems;

export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === +id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
