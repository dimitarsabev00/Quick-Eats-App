import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import store from "..";
import { GeneralSliceInitialState, Product, User } from "../../Types";

const initialState: GeneralSliceInitialState = {
  authUser: JSON.parse(localStorage.getItem("user-info") || "null") || null,
  isLoading: false,
  products: [],
  allUsers: [],
  shoppingCart: [],
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
    setAllProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.allUsers = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.shoppingCart.push(action.payload);
    },
  },
});

export const {
  startLoading,
  stopLoading,
  login,
  logout,
  setAllProducts,
  setAllUsers,
  addProduct,
} = generalSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default generalSlice.reducer;
