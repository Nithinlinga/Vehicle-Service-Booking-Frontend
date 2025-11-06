import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
//   user: {
//     role: '',
//     username: '',
//     email: '',
//     password: '',
//   },
//   role:''
// };
const initialState = {
  isAuthenticated: true,
  user: {
    id: 0,
    role: '',
    username: '',
    email: '',
    sub: '',
  },
  role: '',
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
        password: '',
      };
      state.role = '';
    },
  },
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
