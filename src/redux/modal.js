import { createSlice } from "@reduxjs/toolkit";

const modalState = createSlice({
  name: 'modal',
  initialState: {
    value: false,  
  },
  reducers: {
    show: (state, action) => {  
      state.value = true; // نمایش مودال
    },
    hide: (state) => {  
      state.value = false; // بستن مودال
    }
  }
})

export const { show, hide } = modalState.actions; // خروجی اکشن‌ها
export default modalState.reducer; // صادرات ری‌دیوسر
