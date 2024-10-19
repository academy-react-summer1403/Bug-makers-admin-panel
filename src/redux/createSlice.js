import { createSlice } from '@reduxjs/toolkit';

const CreatedSlice = createSlice({
  name: 'CreatedSlice',
  initialState: {
    Id: '',
    Image: '',
    Title: '',
    GoogleTitle: '',
    MiniDescribe: '',
    CoursePrerequisiteId: '',
    Capacity: '',
    Cost: '',
    SessionNumber: '',
    StartTime: '',
    EndTime: '',
    Describe: '',
    TeacherId: '',
    CourseLvlId: '',
    ClassId : '',
    CourseTypeId: '',
    TremId: '',
  },
  reducers: {
    
  },
});

export const { setCourseListDetail } = CreatedSlice.actions;
export default CreatedSlice.reducer;