import { createSlice } from "@reduxjs/toolkit";
import store from "..";
import { GeneralSliceInitialState } from "../../Types";

const initialState: GeneralSliceInitialState = {
  authUser: JSON.parse(localStorage.getItem("user-info") || "null") || {},
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { login } = generalSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default generalSlice.reducer;
