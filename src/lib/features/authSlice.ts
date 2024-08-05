import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: null | { id: string; username: string };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string; username: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;