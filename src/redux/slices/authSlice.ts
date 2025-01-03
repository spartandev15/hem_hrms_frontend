import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorageItem } from "../../utils/getLocalStorageItem";
import { AUTH_STATUS, AUTH_TOKEN_KEY } from "../../constantsPaths/Constant";

const initialState = {
  isAuthenticateUser: Boolean(getLocalStorageItem(AUTH_TOKEN_KEY)) || false,
  status: getLocalStorageItem(AUTH_STATUS) || "",
};

export const authSlice = createSlice({
  name: "authUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuthUser: (state, actions) => {
      const { isAuthenticate, access_token, status } = actions.payload;
      state.isAuthenticateUser = isAuthenticate;
      state.status = status;
      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(access_token));
      localStorage.setItem(AUTH_STATUS, JSON.stringify(status));
    },

    logoutAuthUser: (state) => {
      state.isAuthenticateUser = false;
      localStorage.removeItem(AUTH_TOKEN_KEY);
    },
  },
});

export const { setAuthUser, logoutAuthUser } = authSlice.actions;
