import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminReducer from './adminSlice';
import { decodeToken } from '../utils/jwtUtils';
const userloadState = () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    const decoded = decodeToken(token);
    const isExpired = decoded.exp && Date.now() >= decoded.exp * 1000;
    return isExpired ? null : decoded;
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
};

const adminloadState = () => {
  try {
    const serializedState = localStorage.getItem('admin');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch {
    return undefined;
  }
};

// ✅ Fix: wrap decoded user inside `auth` key
const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated: !!userloadState(),
      user: userloadState(),
      role: userloadState()?.role || '',
    },
    admin: adminloadState(),
  },
});

// ✅ Fix: persist `auth` instead of `user`
store.subscribe(() => {
  const state = store.getState();
  const authSerializedState = JSON.stringify(state.auth);
  const adminSerializedState = JSON.stringify(state.admin);

  localStorage.setItem('authUser', authSerializedState);
  localStorage.setItem('admin', adminSerializedState);
});

export default store;