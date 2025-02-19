// features/dropdown/dropdownSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface DropdownTypes {
  emailItems: {
    label: string;
    name: string;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: DropdownTypes = {
  emailItems: [],
  loading: false,
  error: null,
};

const allEmailSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    setEmailData: (state, action) => {
      state.emailItems = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setEmailData, setLoading, setError } = allEmailSlice.actions;
export default allEmailSlice;
