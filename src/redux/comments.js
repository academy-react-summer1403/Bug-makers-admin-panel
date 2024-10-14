import axiosInstance from '../@core/interceptor/interceptor';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllData } from '../views/apps/user/store';
import { getData } from '../views/apps/user/store';

// ** Get User by ID
export const getComments = createAsyncThunk('comment/getComments', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/Course/CommentManagment?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=InsertDate&userId=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return rejectWithValue(error.response.data);
  }
});

// ** Slice
export const comments = createSlice({
  name: 'comment',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectUser: [],  
    error: null,   
    loading: false  
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle getAllData
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      // Handle getData
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.params = action.payload.params;
        state.total = action.payload.totalPages;
      })
      // Handle getComments
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.selectUser = action.payload;
        state.loading = false;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
  }
});

export default comments.reducer;
