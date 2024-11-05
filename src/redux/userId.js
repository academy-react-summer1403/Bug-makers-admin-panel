import { createSlice } from '@reduxjs/toolkit';

const userIdSlice = createSlice({
  name: 'userId',
  initialState: {
    userId: [],
  },
  reducers: {
    setUserIdSlice: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserIdSlice } = userIdSlice.actions;
export default userIdSlice.reducer;