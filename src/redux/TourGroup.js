import { createSlice } from '@reduxjs/toolkit';

const TourGroupSlice = createSlice({
  name: 'TourGroup',
  initialState: {
    TourGroup: [],
  },
  reducers: {
    setTourGroup: (state, action) => {
      state.TourGroup = action.payload;
    },
  },
});

export const { setTourGroup } = TourGroupSlice.actions;
export default TourGroupSlice.reducer;