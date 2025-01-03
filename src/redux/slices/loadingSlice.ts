import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsLoading: (state, actions) => {
      state.isLoading = actions.payload;
    },
  },
});

export const { setIsLoading } = loadingSlice.actions;
