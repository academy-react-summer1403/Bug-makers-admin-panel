import { createSlice } from '@reduxjs/toolkit';

const Preview = createSlice({
  name: 'Preview',
  initialState: {
    value: true,
  },
  reducers: {
    setPreview: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPreview } = Preview.actions;
export default Preview.reducer;