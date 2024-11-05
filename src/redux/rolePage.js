import { createSlice } from '@reduxjs/toolkit';

const rolePageSlice = createSlice({
  name: 'rolePage',
  initialState: {
    rolePage: [],
  },
  reducers: {
    setRolePage: (state, action) => {
      state.rolePage = action.payload;
    },
  },
});

export const { setRolePage } = rolePageSlice.actions;
export default rolePageSlice.reducer;