import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
  blogs: any[];
  searchQuery: string;
}

const initialState: BlogState = {
  blogs: [],
  searchQuery: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = blogSlice.actions;
export default blogSlice.reducer;