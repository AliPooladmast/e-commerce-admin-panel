import { publicRequest, userRequest } from "../requestMethods";
import {
  productStart,
  productFailure,
  getProductSuccess,
  deleteProductSuccess,
  addProductSuccess,
  editProductSuccess,
} from "./productSlice";
import {
  userFailure,
  userStart,
  loginSuccess,
  getUserSuccess,
  editUserSuccess,
  deleteUserSuccess,
} from "./userSlice";

//User API Calls
export const login = async (dispatch, user) => {
  dispatch(userStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res?.data));
  } catch (err) {
    dispatch(userFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(userStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res?.data));
  } catch (err) {
    dispatch(userFailure());
  }
};

export const editUser = async (dispatch, userId, user) => {
  dispatch(userStart());
  try {
    const res = await userRequest.put("/users/" + userId, user);
    dispatch(editUserSuccess(res?.data));
  } catch (err) {
    dispatch(userFailure());
  }
};

export const deleteUser = async (dispatch, userId) => {
  dispatch(userStart());
  try {
    const res = await userRequest.delete("/users/" + userId);
    res && dispatch(deleteUserSuccess(userId));
  } catch (err) {
    dispatch(userFailure());
  }
};

//Product API Calls
export const getProducts = async (dispatch) => {
  dispatch(productStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res?.data));
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
