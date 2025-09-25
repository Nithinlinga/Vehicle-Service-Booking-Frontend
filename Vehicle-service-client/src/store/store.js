// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import VehicleReducer from './vehicleSlice';
import mechanicReducer from './mechanicSlice';
import userReducer from './userSlice';
import adminReducer from './adminSlice';

const mechanicloadState = () => {
  try {
    const serializedState = localStorage.getItem('mechanic');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch {
    return undefined;
  }
};
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
const authLoadState = () => {
  try {
    const serializedState = localStorage.getItem('auth');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch {
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicles: VehicleReducer,
    mechanic: mechanicReducer,
    user: userReducer,
    admin: adminReducer,
  },
  preloadedState: {
    mechanic: mechanicloadState(),
    user: userloadState(),
    admin: adminloadState(),
    auth: authLoadState()
  },
});

store.subscribe(() => {
  const state = store.getState();
  const mechanicSerializedState = JSON.stringify(state.mechanic);
  const userSerializedState = JSON.stringify(state.user);
  const adminSerializedState = JSON.stringify(state.admin);

  localStorage.setItem("vehicles", JSON.stringify(state.vehicles));
  localStorage.setItem('mechanic', mechanicSerializedState);
  localStorage.setItem('user', userSerializedState);
  localStorage.setItem('admin', adminSerializedState);
  localStorage.setItem('auth', JSON.stringify(state.auth));
});

export default store;