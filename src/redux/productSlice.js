import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isFetching: false,
  error: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.isFetching = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getProductFailure, getProductStart, getProductSuccess } =
  productSlice.actions;
export default productSlice.reducer;
