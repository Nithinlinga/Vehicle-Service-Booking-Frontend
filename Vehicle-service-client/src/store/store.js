import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import appointmentsReducer from './appointmentSlice';
import VehicleReducer from './vehicleSlice';
import mechanicReducer from './mechanicSlice';


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('mechanic');
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
    mechanic : mechanicReducer
  },
  preloadedState: {
    mechanic: loadState(),
  },
});

store.subscribe(() => {
  const state = store.getState();
  const serializedState = JSON.stringify(store.getState().mechanic);
  localStorage.setItem("appointments", JSON.stringify(state.appointments));
  localStorage.setItem("vehicles", JSON.stringify(state.vehicles));
  localStorage.setItem('mechanic', serializedState);
});

export default store;
