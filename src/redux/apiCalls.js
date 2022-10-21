import { publicRequest, userRequest } from "../requestMethods";
import {
  productStart,
  productFailure,
  getProductSuccess,
  deleteProductSuccess,
  addProductSuccess,
  editProductSuccess,
} from "./productSlice";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(productStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(productFailure());
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(productStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    res && dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(productFailure());
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(productStart());
  try {
    const res = await userRequest.post("/products", product);
    dispatch(addProductSuccess(res?.data));
  } catch (err) {
    dispatch(productFailure());
  }
};

export const editProduct = async (dispatch, productId, product) => {
  dispatch(productStart());
  try {
    const res = await userRequest.put("/products/" + productId, product);
    dispatch(editProductSuccess(res?.data));
  } catch (err) {
    dispatch(productFailure());
  }
};
