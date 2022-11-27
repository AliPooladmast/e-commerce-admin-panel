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
  addUserSuccess,
} from "./userSlice";
import { setMessage } from "./uxSlice";

//User API Calls
export const addUser = async (dispatch, user) => {
  dispatch(userStart());
  try {
    const res = await userRequest.post("/auth/register", user);
    dispatch(addUserSuccess(res?.data));
  } catch (err) {
    dispatch(userFailure(err?.response?.data));
  }
};

export const login = async (dispatch, user) => {
  dispatch(userStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    if (res?.data) {
      dispatch(loginSuccess(res.data));
      userRequest.defaults.headers.token = "Bearer " + res.data.token;
      if (res.data.isAdmin) {
        dispatch(
          setMessage({
            type: "success",
            text: "welcome! " + res.data.username?.toString(),
          })
        );
      } else {
        dispatch(
          setMessage({
            type: "error",
            text: "only admin users can enter admin panel",
          })
        );
      }
    }
  } catch (err) {
    dispatch(userFailure());
    dispatch(
      setMessage({ type: "error", text: err?.response?.data?.toString() })
    );
  }
};

export const getUsers = async (dispatch) => {
  dispatch(userStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res?.data));
  } catch (err) {
    dispatch(userFailure(err?.response?.data));
  }
};

export const editUser = async (dispatch, userId, user) => {
  dispatch(userStart());
  try {
    const res = await userRequest.put("/users/" + userId, user);
    dispatch(editUserSuccess(res?.data));
  } catch (err) {
    dispatch(userFailure(err?.response?.data));
  }
};

export const deleteUser = async (dispatch, userId) => {
  dispatch(userStart());
  try {
    const res = await userRequest.delete("/users/" + userId);
    res && dispatch(deleteUserSuccess(userId));
  } catch (err) {
    dispatch(userFailure(err?.response?.data));
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
