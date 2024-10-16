import { createSlice } from '@reduxjs/toolkit';

const CourseSlice = createSlice({
  name: 'Course',
  initialState: {
    CourseList: [],
  },
  reducers: {
    setCourseList: (state, action) => {
      state.CourseList = action.payload;
    },
  },
});

export const { setCourseList } = CourseSlice.actions;
export default CourseSlice.reducer;