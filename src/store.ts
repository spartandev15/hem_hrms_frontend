import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./redux/api/auth";
import { loadingSlice } from "./redux/slices/loadingSlice";
import { authSlice } from "./redux/slices/authSlice";
import { profileApi } from "./redux/api/profile";
import { baseApi } from "./baseApi/baseApi";
import { toastSlice } from "./redux/slices/toastSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [baseApi.reducerPath]: baseApi.reducer,
    authUser: authSlice.reducer,
    loader: loadingSlice.reducer,
    toast: toastSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
