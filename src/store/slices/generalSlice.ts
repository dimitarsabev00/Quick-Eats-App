import { createSlice } from "@reduxjs/toolkit";
import store from "..";

const initialState = {};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {},
});

export const {} = generalSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default generalSlice.reducer;
