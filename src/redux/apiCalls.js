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
    if (res?.data) {
      dispatch(addUserSuccess(res.data));
      dispatch(
        setMessage({
          type: "success",
          text:
            res.data.username?.toString() +
            " account has been created successfully",
        })
      );
    }
  } catch (err) {
    dispatch(userFailure());
    dispatch(
      setMessage({ type: "error", text: err?.response?.data?.toString() })
    );
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
    dispatch(userFailure());
    dispatch(
      setMessage({ type: "error", text: err?.response?.data?.toString() })
    );
  }
};

export const editUser = async (dispatch, userId, user) => {
  dispatch(userStart());
  try {
    const res = await userRequest.put("/users/" + userId, user);
    if (res?.data) {
      dispatch(editUserSuccess(res.data));
      dispatch(
        setMessage({
          type: "success",
          text:
            res.data.username?.toString() +
            " account has been edited successfully",
        })
      );
    }
  } catch (err) {
    dispatch(userFailure());
    dispatch(
      setMessage({ type: "error", text: err?.response?.data?.toString() })
    );
  }
};

export const deleteUser = async (dispatch, userId) => {
  dispatch(userStart());
  try {
    const res = await userRequest.delete("/users/" + userId);
    if (res) {
      dispatch(deleteUserSuccess(userId));
      dispatch(
        setMessage({
          type: "success",
          text: "user has been deleted successfully",
        })
      );
    }
  } catch (err) {
    dispatch(userFailure());
    dispatch(
      setMessage({ type: "error", text: err?.response?.data?.toString() })
    );
  }
};

//Product API Calls
export const getProducts = async (dispatch) => {
  dispatch(productStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res?.data?.products));
  } catch (err) {
    dispatch(productFailure());
    dispatch(
      setMessage({ type: "error", text: err?.response?.data?.toString() })
    );
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(productStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);

    if (res) {
      dispatch(deleteProductSuccess(id));
      dispatch(
        setMessage({
          type: "success",
          text: "product has been deleted successfully",
        })
      );
    }
  } catch (err) {
    dispatch(productFailure());
    dispatch(
      setMessage({ type: "error", text: err?.response?.data?.toString() })
    );
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(productStart());
  try {
    const res = await userRequest.post("/products", product);

    if (res?.data) {
      dispatch(addProductSuccess(res.data));
      dispatch(
        setMessage({
          type: "success",
          text:
            res.data.title?.toString() +
            " product has been created successfully",
        })
      );
    }
  } catch (err) {
    dispatch(productFailure());
    dispatch(
      setMessage({ type: "error", text: err?.response?.data?.toString() })
    );
  }
};

export const editProduct = async (dispatch, productId, product) => {
  dispatch(productStart());
  try {
    const res = await userRequest.put("/products/" + productId, product);

    if (res?.data) {
      dispatch(editProductSuccess(res.data));
      dispatch(
        setMessage({
          type: "success",
          text:
            res.data.title?.toString() +
            " product has been edited successfully",
        })
      );
    }
  } catch (err) {
    dispatch(productFailure());
    dispatch(
      setMessage({ type: "error", text: err?.response?.data?.toString() })
    );
  }
};
