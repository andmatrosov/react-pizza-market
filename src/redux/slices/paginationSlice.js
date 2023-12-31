import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = Number(action.payload);
    },
  },
});

export const selectPagination = (state) => state.pagination;

export const { setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;
