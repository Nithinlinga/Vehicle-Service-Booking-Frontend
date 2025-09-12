import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: {
    role: '',
    username: '',
    email: '',
  },
  role:''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.role = action.payload.role;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = {
        role: '',
        username: '',
        email: '',
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
