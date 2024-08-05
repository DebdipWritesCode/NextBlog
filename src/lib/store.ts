import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import blogReducer from "./features/blogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
  },
});

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;