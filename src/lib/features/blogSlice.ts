import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageURL: string;
}

interface BlogState {
  blogs: Blog[];
  searchQuery: string;
  loading: boolean;
  error: null | string;
}

const initialState: BlogState = {
  blogs: [],
  searchQuery: "",
  loading: false,
  error: null,
};

export const fetchBlogs = createAsyncThunk<
  Blog[], // fulfilled action return type
  void, // thunk argument type
  { rejectValue: string } // rejected action meta type
>(
  "blog/fetchBlogs", 
  async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/blogs/all");
    return response.data;
  } catch (err) {
    return rejectWithValue("Failed to fetch blogs");
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery } = blogSlice.actions;
export default blogSlice.reducer;
