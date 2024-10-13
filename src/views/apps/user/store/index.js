import axiosInstance from '../../../../@core/interceptor/interceptor'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
      id: user.id || null, 
      fName: user.fName || null,
      lName: user.lName || null,
      userName: user.userName || null,
      gmail: user.gmail || null,
      phoneNumber: user.phoneNumber || null,
      active: user.active ? true : false,
      isDelete: user.isDelete || false,
      isTecher: user.isTecher || false,
      isStudent: user.isStudent || false,
      recoveryEmail: user.recoveryEmail || null,
      userAbout: user.userAbout || null,
      telegramLink: user.telegramLink || null,
      homeAdderess: user.homeAdderess || null,
      nationalCode: user.nationalCode || null,
      gender: user.gender ? true : false,
      latitude: user.latitude || null,
      longitude: user.longitude || null,
      insertDate: user.insertDate || null,
      birthDay: user.birthDay || null,
      currentPictureAddress: user.currentPictureAddress || null,
      linkdinProfile: user.linkdinProfile || null,
      roles: user.roles.map(role => ({
        id: Number(role.id) || null,
        roleName: role.roleName || null,
        roleParentName: role.roleParentName || null
      }))
    });
    
    await dispatch(getData(getState().users.params));
    await dispatch(getAllData());

    return response.data; 
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
});

// ** add role
export const addRole = createAsyncThunk('appUsers/addRole', async ({ user, enable }, { dispatch, getState }) => {
  try {
    const response = await axiosInstance.post(`/User/AddUserAccess?Enable=${enable}`, {
      roleId: Number(user.RoleId),
      userId: user.id
    });
    
    // Dispatch to refresh the data after adding the role
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
