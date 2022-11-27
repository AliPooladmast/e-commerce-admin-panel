import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isFetching: false,
  error: false,
  success: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.success = false;
    },
    productFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.success = true;
      state.products = action.payload;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.success = true;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.success = true;
      state.products.push(action.payload);
    },
    editProductSuccess: (state, action) => {
      state.isFetching = false;
      state.success = true;
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    },
  },
});

export const {
  productStart,
  productFailure,
  getProductSuccess,
  deleteProductSuccess,
  addProductSuccess,
  editProductSuccess,
} = productSlice.actions;
export default productSlice.reducer;
