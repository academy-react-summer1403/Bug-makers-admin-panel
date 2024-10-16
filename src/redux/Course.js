// import axiosInstance from '../@core/interceptor/interceptor';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAllData } from '../views/apps/user/store';
// import { getData } from '../views/apps/user/store';
// import { useQuery } from '@tanstack/react-query';

// // ** Get User by ID
// export const getCourse = createAsyncThunk('courseList/getCourse', async () => {
//   try {
//     const response = await axiosInstance.get(`/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=500&SortingCol=Active&SortType=DESC`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return rejectWithValue(error.response.data);
//   }
// });


// // ** Slice
// export const courseList = createSlice({
//   name: 'courseList',
//   initialState: {
//     data: [],
//     total: 1,
//     params: {},
//     allData: [],
//     selectUser: [],  
//     error: null,   
//     loading: false  
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       // Handle getAllData
//       .addCase(getAllData.fulfilled, (state, action) => {
//         state.allData = action.payload;
//       })
//       // Handle getData
//       .addCase(getData.fulfilled, (state, action) => {
//         state.data = action.payload.data;
//         state.params = action.payload.params;
//         state.total = action.payload.totalPages;
//       })
//       // Handle getComments
//       .addCase(getCourse.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getCourse.fulfilled, (state, action) => {
//         state.selectUser = action.payload;
//         state.loading = false;
//       })
//       .addCase(getCourse.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       })
//   }
// });

// export default courseList.reducer;
