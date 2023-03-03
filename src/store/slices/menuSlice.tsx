import { createSlice } from "@reduxjs/toolkit";

export interface MenuState {
  show: boolean;
}

const initialState: MenuState = {
  show: true,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.show = !state.show;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;

export default menuSlice.reducer;
