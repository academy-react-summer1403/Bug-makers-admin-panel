import { createSlice } from '@reduxjs/toolkit';

const create = createSlice({
  name: 'create',
  initialState: {
    createList: [],
  },
  reducers: {
    setCreate: (state, action) => {
      state.createList = action.payload;
    },
  },
});

export const { setCreate } = create.actions;
export default create.reducer;