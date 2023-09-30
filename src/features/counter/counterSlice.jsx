import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count++;
    },
    decreament: (state) => {
      state.count--;
    },
    reset: (state) => {
      state.count = 0;
    },
    increamentByValue: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decreament, reset, increamentByValue } =
  counterSlice.actions;

export default counterSlice.reducer;
