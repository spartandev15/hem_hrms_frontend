// features/dropdown/dropdownSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface DropdownTypes {
  items: {
    label: string;
    name: string;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: DropdownTypes = {
  items: [],
  loading: false,
  error: null,
};

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    setDropdownData: (state, action) => {
      state.items = [...action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setDropdownData, setLoading, setError } = dropdownSlice.actions;
export default dropdownSlice;
