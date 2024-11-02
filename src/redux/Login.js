import { createSlice } from '@reduxjs/toolkit';

const LoginSlice = createSlice({
  name: 'LoginData',
  initialState: {
    Data: [],
  },
  reducers: {
    setLoginData: (state, action) => {
      state.Data = action.payload;
    },
  },
});

export const { setLoginData } = LoginSlice.actions;
export default LoginSlice.reducer;