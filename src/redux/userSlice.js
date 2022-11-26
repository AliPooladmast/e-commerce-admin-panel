import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
  isFetching: false,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    userFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.success = `welcome, ${
        action.payload?.username || "dear new user"
      }!`;
      state.currentUser = action.payload;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    editUserSuccess: (state, action) => {
      state.isFetching = false;
      state.success = "user has been edited successfully";
      state.users[
        state.users.findIndex((user) => user._id === action.payload._id)
      ] = action.payload;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.success = "user has been deleted successfully";
      state.users.splice(
        state.users.findIndex((user) => user._id === action.payload),
        1
      );
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.success = "new user has been created successfully";
      state.users.push(action.payload);
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  userStart,
  loginSuccess,
  userFailure,
  getUserSuccess,
  editUserSuccess,
  deleteUserSuccess,
  addUserSuccess,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
