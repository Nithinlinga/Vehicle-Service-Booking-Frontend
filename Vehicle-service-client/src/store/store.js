// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import appointmentsReducer from './appointmentSlice';
import VehicleReducer from './vehicleSlice';
import userReducer from './userSlice';
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
    appointments: appointmentsReducer,
    vehicles: VehicleReducer,
    user: userReducer,
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

  localStorage.setItem("appointments", JSON.stringify(state.appointments));
  localStorage.setItem("vehicles", JSON.stringify(state.vehicles));
  localStorage.setItem('user', userSerializedState);
  localStorage.setItem('admin', adminSerializedState);
});

export default store;