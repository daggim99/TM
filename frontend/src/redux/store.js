import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import licenseReducer from "../redux/features/license/licenseSlice";
import filterReducer from "../redux/features/license/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    license: licenseReducer,
    filter: filterReducer,
  },
});
