// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { initialState as initialStateB } from "./initialStateSession";
import { initialState as initialStateA } from "./initialStateBreak";

const counterASlice = createSlice({
  name: "counterA",
  initialState: initialStateA,
  reducers: {
    increment: (state) => {
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
    reset: (state) => {
      state.count = initialStateA.count;
    },
  },
});

const counterBSlice = createSlice({
  name: "counterB",
  initialState: initialStateB,
  reducers: {
    increment: (state) => {
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
    reset: (state) => {
      state.count = initialStateB.count;
    },
  },
});

const rootReducer = {
  counterA: counterASlice.reducer,
  counterB: counterBSlice.reducer,
};

const store = configureStore({ reducer: rootReducer });

export default store;
export const {
  increment: incrementCounterA,
  decrement: decrementCounterA,
  reset: resetCounterA,
} = counterASlice.actions;
export const {
  increment: incrementCounterB,
  decrement: decrementCounterB,
  reset: resetCounterB,
} = counterBSlice.actions;
