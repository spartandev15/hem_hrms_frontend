import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  toastMessage: "",
};

export const toastSlice = createSlice({
  name: "loading",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToast: (state, actions) => {
      state.toastMessage = actions.payload;
    },
  },
});

export const { setToast } = toastSlice.actions;
