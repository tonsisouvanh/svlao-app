import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/AuthSlice";
export const store = configureStore({
  reducer: {
    user: authReducer,
  },
});

export default store;
