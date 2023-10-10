import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import pagination from './slices/paginationSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filter,
    pagination,
    cart,
  },
});
