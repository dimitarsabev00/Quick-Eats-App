import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import store from "..";
import { GeneralSliceInitialState } from "../../Types";

const initialState: GeneralSliceInitialState = {
  authUser: JSON.parse(localStorage.getItem("user-info") || "null") || null,
  isLoading: false,
  products: [],
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
    logout: (state) => {
      state.authUser = null;
    },
    setAllProducts: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
    },
  },
});

export const { startLoading, stopLoading, login, logout, setAllProducts } =
  generalSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default generalSlice.reducer;
