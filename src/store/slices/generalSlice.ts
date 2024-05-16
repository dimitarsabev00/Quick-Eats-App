import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import store from "..";
import {
  GeneralSliceInitialState,
  Product,
  ShoppingCartProduct,
  User,
} from "../../Types";

const initialState: GeneralSliceInitialState = {
  authUser: JSON.parse(localStorage.getItem("user-info") || "null") || null,
  isLoading: false,
  products: [],
  allUsers: [],
  shoppingCart: [],
  isShoppingCartVisible: false,
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
    addProduct: (state, action: PayloadAction<ShoppingCartProduct>) => {
      const productIndex = state.shoppingCart.findIndex(p => p.productId === action.payload.productId);
      if (productIndex >= 0) {
        state.shoppingCart[productIndex].quantity += action.payload.quantity;
      } else {
        state.shoppingCart.push(action.payload);
      }
    },
    showShoppingCart: (state) => {
      state.isShoppingCartVisible = true;
    },
    hideShoppingCart: (state) => {
      state.isShoppingCartVisible = false;
    },
    incrementProductQuantity: (state, action: PayloadAction<string>) => {
      const product = state.shoppingCart.find(
        (p) => p.productId === action.payload
      );
      if (product) {
        product.quantity += 1;
      }
    },
    decrementProductQuantity: (state, action: PayloadAction<string>) => {
      const product = state.shoppingCart.find(
        (p) => p.productId === action.payload
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.shoppingCart = state.shoppingCart.filter(
          (p) => p.productId !== action.payload
        );
      }
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
  showShoppingCart,
  hideShoppingCart,
  incrementProductQuantity,
  decrementProductQuantity,
} = generalSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default generalSlice.reducer;
