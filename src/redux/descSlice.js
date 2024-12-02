import { createSlice } from '@reduxjs/toolkit';

const DescSlice = createSlice({
  name: 'Desc',
  initialState: {
    value: '',
  },
  reducers: {
    setDesc: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDesc } = DescSlice.actions;
export default DescSlice.reducer;