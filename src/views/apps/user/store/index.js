// ** Axios Imports
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Base URL
const baseURL = 'https://classapi.sepehracademy.ir/api';

const axiosInstance = axios.create({
  baseURL: baseURL
});

// Set up interceptors for authorization
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ** Get All Users Data
export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await axiosInstance.get(`/User/UserMannage?PageNumber=0&RowsOfPage=0&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true&roleId=<integer>`);
  return response.data.listUser; 
});

// ** Get Paginated Users Data
export const getData = createAsyncThunk('appUsers/getData', async (params) => {
  const response = await axiosInstance.get(`User/UserMannage?PageNumber=${params.page}&RowsOfPage=${params.perPage}&SortingCol=${params.sortColumn}&SortType=${params.sort}&Query=${params.q}&roleId=${params.userRoles}`);
  return {
    params,
    data: response.data.listUser,
    totalPages: response.data.total
  };
});

// ** Get User by ID
export const getUser = createAsyncThunk('appUsers/getUser', async (id) => {
  const response = await axiosInstance.get(`/User/UserDetails/${id}`);
  return response.data;
});

// ** Add User
export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  try {
    const response = await axiosInstance.post('/User/CreateUser', {
      lastName: user.lastName,
      firstName: user.firstName,
      gmail: user.gmail,
      password: user.password,
      phoneNumber: user.phoneNumber,
      isStudent: user.isStudent,
      isTeacher: user.isTeacher
    });
    
    await dispatch(getData(getState().users.params));
    await dispatch(getAllData());

    return response.data; 
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
});

// ** Update User
export const updateUser = createAsyncThunk('appUsers/updateUser', async (user, { dispatch, getState }) => {
  try {
    const response = await axiosInstance.put('/User/UpdateUser', {
      id: user.id, // Send user ID
      lastName: user.lastName,
      firstName: user.firstName,
      gmail: user.gmail,
      password: user.password,
      phoneNumber: user.phoneNumber,
      isStudent: user.isStudent,
      isTeacher: user.isTeacher,
      nationalCode: user.nationalCode,
      birthday: user.birthDay ,
    });
    
    await dispatch(getData(getState().users.params));
    await dispatch(getAllData());

    return response.data; 
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
});

// ** Delete User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await axiosInstance.delete('/User/DeleteUser', { data: { userId: id } }); 
  await dispatch(getData(getState().users.params));
  await dispatch(getAllData());
  return id;
});

// ** Slice
export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data; 
        state.params = action.payload.params; 
        state.total = action.payload.totalPages; 
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload; 
      });
  }
});

export default appUsersSlice.reducer;
