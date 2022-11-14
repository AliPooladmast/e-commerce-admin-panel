import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displaySideMenu: false,
};

const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    sideMenuToggle: (state) => {
      state.displaySideMenu = !state.displaySideMenu;
    },
  },
});

export const { sideMenuToggle } = styleSlice.actions;
export default styleSlice.reducer;
