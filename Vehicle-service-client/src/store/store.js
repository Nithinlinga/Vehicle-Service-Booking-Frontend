// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminReducer from './adminSlice';

const userloadState = () => {
  try {
    const serializedState = localStorage.getItem('user');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch {
    return undefined;
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

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
  preloadedState: {
    user: userloadState(),
    admin: adminloadState(),
  },
});

store.subscribe(() => {
  const state = store.getState();
  const userSerializedState = JSON.stringify(state.user);
  const adminSerializedState = JSON.stringify(state.admin);
  
  localStorage.setItem('user', userSerializedState);
  localStorage.setItem('admin', adminSerializedState);
});

export default store;