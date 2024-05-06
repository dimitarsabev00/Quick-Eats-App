import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice";

export * from "./slices/generalSlice";

export const store = configureStore({
  reducer: {
    generalSlice,
  },
});

export default store;
