import { createSlice } from '@reduxjs/toolkit';

const CourseDetailSlice = createSlice({
  name: 'CourseDetail',
  initialState: {
    CourseList: [],
  },
  reducers: {
    setCourseListDetail: (state, action) => {
      state.CourseList = action.payload;
    },
  },
});

export const { setCourseListDetail } = CourseDetailSlice.actions;
export default CourseDetailSlice.reducer;