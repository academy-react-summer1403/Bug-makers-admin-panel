// ** Axios Imports
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Base URL
const baseURL = 'https://classapi.sepehracademy.ir/api';

// ** ایجاد Axios Instance و اضافه کردن Interceptor
const axiosInstance = axios.create({
  baseURL: baseURL
});

// ** Interceptor برای اضافه کردن توکن به هر درخواست
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // دریافت توکن از localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // اضافه کردن توکن به هدر
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
  return response.data.listUser; // تغییر اینجا به listUser
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
  const response = await axiosInstance.get(`/${id}`);
  return response.data; // فرض بر این است که API برای دریافت کاربر بر اساس ID کار می‌کند
});

// ** Add User
export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await axiosInstance.post('', user);
  await dispatch(getData(getState().users.params));
  await dispatch(getAllData());
  return user;
});

// ** Delete User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await axiosInstance.delete('/User/DeleteUser', { data: { userId: id } }); // ارسال userId به عنوان data در متد DELETE
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
        state.allData = action.payload; // داده‌ها در اینجا ذخیره می‌شوند
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data; // داده‌های صفحه‌بندی شده
        state.params = action.payload.params; // پارامترهای درخواست
        state.total = action.payload.totalPages; // تعداد صفحات
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload; // کاربر انتخاب شده
      });
  }
});

export default appUsersSlice.reducer;
