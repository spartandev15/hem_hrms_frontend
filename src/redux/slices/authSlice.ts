import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorageItem } from "../../utils/getLocalStorageItem";
import {
  AUTH__USER,
  AUTH_EMAIL,
  AUTH_STATUS,
  AUTH_TOKEN_KEY,
  AUTH_UID,
} from "../../constantsPaths/Constant";

const initialState = {
  isAuthenticateUser: Boolean(getLocalStorageItem(AUTH_TOKEN_KEY)) || false,
  status: getLocalStorageItem(AUTH_STATUS) || "",
  name: getLocalStorageItem(AUTH__USER) || "",
  email: getLocalStorageItem(AUTH_EMAIL) || "",
};

export const authSlice = createSlice({
  name: "authUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuthUser: (state, actions) => {
      const {
        isAuthenticate,
        access_token,
        status,
        user_id,
        name,
        last_name,
        email,
      } = actions.payload;
      state.isAuthenticateUser = isAuthenticate;
      state.status = status;
      state.name = name + " " + last_name;
      state.email = email;
      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(access_token));
      localStorage.setItem(AUTH_STATUS, JSON.stringify(status));
      localStorage.setItem(AUTH_UID, JSON.stringify(user_id));
      localStorage.setItem(AUTH_EMAIL, JSON.stringify(email));
      localStorage.setItem(AUTH__USER, JSON.stringify(name + " " + last_name));
    },

    setAuthStatus: (state, actions) => {
      const { status } = actions.payload;
      state.status = status;
    },

    logoutAuthUser: (state) => {
      state.isAuthenticateUser = false;
      localStorage.removeItem(AUTH_TOKEN_KEY);
    },
  },
});

export const { setAuthUser, logoutAuthUser, setAuthStatus } = authSlice.actions;
