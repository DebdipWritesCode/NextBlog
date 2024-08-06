import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  isAuthenticated: boolean;
  user: null | { id: string; username: string };
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const verifyTokenAsync = createAsyncThunk<
  { id: string; username: string }, // fulfilled type
  void, // argument type
  { rejectValue: string } // reject type
>(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/verify");
      return response.data.decoded;
    } catch (err) {
      return rejectWithValue("Invalid token");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ id: string; username: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyTokenAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        verifyTokenAsync.fulfilled,
        (state, action: PayloadAction<{ id: string; username: string }>) => {
          state.isAuthenticated = true;
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        verifyTokenAsync.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
