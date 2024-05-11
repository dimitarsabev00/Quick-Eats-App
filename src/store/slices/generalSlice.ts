import { createSlice } from "@reduxjs/toolkit";
import store from "..";
import { GeneralSliceInitialState } from "../../Types";

const initialState: GeneralSliceInitialState = {
  authUser: JSON.parse(localStorage.getItem("user-info") || "null") || {},
  isLoading: false,
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    startLoading: (state) => ({ ...state, isLoading: true }),
    stopLoading: (state) => ({ ...state, isLoading: false }),
    login: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { startLoading, stopLoading, login } = generalSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default generalSlice.reducer;
