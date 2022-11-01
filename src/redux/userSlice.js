import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userStart: (state) => {
      state.isFetching = true;
    },
    userFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.users = action.payload;
    },
    editUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.users[
        state.users.findIndex((user) => user._id === action.payload._id)
      ] = action.payload;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.users.splice(
        state.users.findIndex((user) => user._id === action.payload),
        1
      );
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
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
