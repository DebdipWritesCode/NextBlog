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
  post: Blog | null;
  searchQuery: string;
  searchResults: Blog[];
  loading: boolean;
  error: null | string;
}

const initialState: BlogState = {
  blogs: [],
  post: null,
  searchQuery: "",
  searchResults: [],
  loading: true,
  error: null,
};

export const fetchBlogs = createAsyncThunk<
  Blog[], // fulfilled action return type
  void, // thunk argument type
  { rejectValue: string } // rejected action meta type
>("blog/fetchBlogs", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/blogs/all");
    return response.data;
  } catch (err) {
    return rejectWithValue("Failed to fetch blogs");
  }
});

export const searchBlogs = createAsyncThunk<
  Blog[], // fulfilled action return type
  string, // thunk argument type
  { rejectValue: string } // rejected action meta type
>("blog/searchBlogs", async (query, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/blogs/search", {
      params: { q: query },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue("Failed to search blogs");
  }
});

export const createBlog = createAsyncThunk<
  Blog | null, // fulfilled action return type
  Blog, // thunk argument type
  { rejectValue: string } // rejected action meta type
>("blog/createBlog", async (newPost, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/blogs/create", newPost);
    return response.data;
  } catch (err) {
    return rejectWithValue("Failed to create blog");
  }
});

export const fetchBlogById = createAsyncThunk<
  Blog, // fulfilled action return type
  string, // thunk argument type
  { rejectValue: string } // rejected action meta type
>("blog/fetchBlogById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/blogs/posts/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue("Failed to fetch blog");
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
      })
      .addCase(searchBlogs.pending, (state) => {
        state.error = null;
      })
      .addCase(
        searchBlogs.fulfilled,
        (state, action: PayloadAction<Blog[]>) => {
          state.searchResults = action.payload;
        }
      )
      .addCase(searchBlogs.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload as Blog);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBlogById.fulfilled,
        (state, action: PayloadAction<Blog>) => {
          state.post = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery } = blogSlice.actions;
export default blogSlice.reducer;
