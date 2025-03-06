import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import formReducer from './slice/customerList'
const store = configureStore({
  reducer: {
        auth: authReducer,
      customerList: formReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;