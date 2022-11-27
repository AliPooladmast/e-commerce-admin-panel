import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displaySideMenu: false,
  message: { type: "info", text: null },
};

const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    sideMenuToggle: (state) => {
      state.displaySideMenu = !state.displaySideMenu;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { sideMenuToggle, setMessage } = styleSlice.actions;
export default styleSlice.reducer;
