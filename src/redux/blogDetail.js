import { createSlice } from '@reduxjs/toolkit';

const BlogDetailSlice = createSlice({
  name: 'blogDetail',
  initialState: {
    blogList: [],
  },
  reducers: {
    setBlogListDetail: (state, action) => {
      state.blogList = action.payload;
    },
  },
});

export const { setBlogListDetail } = BlogDetailSlice.actions;
export default BlogDetailSlice.reducer;