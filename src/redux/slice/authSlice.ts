import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
          state.isAuthenticated = true;
          localStorage.setItem('user', state.toString())
    },
    logout: (state) => {
      state.user = null;
        state.isAuthenticated = false;
        localStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
