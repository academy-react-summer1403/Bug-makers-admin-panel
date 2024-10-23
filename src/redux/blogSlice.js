import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogList: [],
  },
  reducers: {
    setBlogList: (state, action) => {
      state.blogList = action.payload;
    },
  },
});

export const { setBlogList } = blogSlice.actions;
export default blogSlice.reducer;