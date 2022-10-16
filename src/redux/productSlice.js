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
    productStart: (state) => {
      state.isFetching = true;
    },
    productFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
  },
});

export const {
  productStart,
  productFailure,
  getProductSuccess,
  deleteProductSuccess,
} = productSlice.actions;
export default productSlice.reducer;
