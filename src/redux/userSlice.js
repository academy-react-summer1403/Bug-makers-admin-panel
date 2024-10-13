import axiosInstance from '../@core/interceptor/interceptor';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllData } from '../views/apps/user/store';
import { getData } from '../views/apps/user/store';

// ** Get User by ID
export const getUser = createAsyncThunk('appUsers/getUser', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/User/UserDetails/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return rejectWithValue(error.response.data);
  }
});

// ** Update User Location
export const updateUserLocation = createAsyncThunk(
    'appUsers/updateUser',
    async (params, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`/User/UpdateUser`, params); 
        return response.data;
      } catch (error) {
        console.error('Error updating user location:', error);
        return rejectWithValue(error.response.data);
      }
    }
  );
  


// ** Slice
export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectUser: null,  
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
      // Handle getUser
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectUser = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Handle updateUserLocation
      .addCase(updateUserLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserLocation.fulfilled, (state, action) => {
        state.selectUser.latitude = action.payload.latitude;
        state.selectUser.longitude = action.payload.longitude;
        state.loading = false;
      })
      .addCase(updateUserLocation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default appUsersSlice.reducer;
