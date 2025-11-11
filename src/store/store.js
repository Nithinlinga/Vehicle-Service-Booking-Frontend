import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { decodeToken } from '../utils/jwtUtils';
const userloadState = () => {
  try {
    const token = sessionStorage.getItem("authToken");
    if (!token) return null;

    const decoded = decodeToken(token);
    const isExpired = decoded.exp && Date.now() >= decoded.exp * 1000;
    if(isExpired){
      sessionStorage.removeItem("authToken");
      return null;
    }
    return decoded;
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState: {
    auth: {
      isAuthenticated: !!userloadState(),
      user: userloadState(),
      role: userloadState()?.role || '',
    }
  },
});

// persist `auth` instead of `user`
store.subscribe(() => {
  const state = store.getState();
  const { user } = state.auth;


  // Store only the user object
  sessionStorage.setItem('authUser', JSON.stringify(user));
});

export default store;