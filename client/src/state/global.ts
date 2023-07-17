import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUser: false,
  user: {},
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isUser = action.payload.isUser;
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = globalSlice.actions;

export default globalSlice.reducer;
