import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import appointmentsReducer from './appointmentSlice';
import VehicleReducer from './vehicleSlice';
import mechanicReducer from './mechanicSlice';
import userReducer from './userSlice';


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

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentsReducer,
    vehicles: VehicleReducer,
    mechanic : mechanicReducer,
    user : userReducer,
  },
  preloadedState: {
    mechanic: mechanicloadState(),
    user: userloadState(),
  },
});

store.subscribe(() => {
  const state = store.getState();
  const mechanicSerializedState = JSON.stringify(store.getState().mechanic);
  const userSerializedState = JSON.stringify(store.getState().user);

  localStorage.setItem("appointments", JSON.stringify(state.appointments));
  localStorage.setItem("vehicles", JSON.stringify(state.vehicles));
  localStorage.setItem('mechanic', mechanicSerializedState);
  localStorage.setItem('user', userSerializedState);
});

export default store;
