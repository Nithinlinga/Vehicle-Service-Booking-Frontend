import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import appointmentsReducer from './appointmentSlice';
import VehicleReducer from './VehicleSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentsReducer,
    vehicles: VehicleReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("appointments", JSON.stringify(state.appointments));
  localStorage.setItem("vehicles", JSON.stringify(state.vehicles));
});

export default store;
