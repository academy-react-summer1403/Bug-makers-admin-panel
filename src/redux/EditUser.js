import { createSlice } from '@reduxjs/toolkit';

const EditUserSlice = createSlice({
  name: 'editUser',
  initialState: {
    EditList: [],
  },
  reducers: {
    setEditList: (state, action) => {
      state.EditList = action.payload;
    },
  },
});

export const { setEditList } = EditUserSlice.actions;
export default EditUserSlice.reducer;