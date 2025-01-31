import { createSlice } from '@reduxjs/toolkit';

const storedToken = localStorage.getItem('accessToken');
const initialState = storedToken ? { isAuthenticated: true, accessToken: storedToken } : { isAuthenticated: false, token: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
