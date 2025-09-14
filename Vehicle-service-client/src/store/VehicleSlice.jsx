import { createSlice } from "@reduxjs/toolkit";

// Load vehicles from localStorage
const loadVehicles = () => {
  try {
    const data = localStorage.getItem("vehicles");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: loadVehicles(),
  reducers: {
    addVehicle: (state, action) => {
      state.push({ ...action.payload, id: Date.now() });
    },
    deleteVehicle: (state, action) => {
      return state.filter(v => v.id !== action.payload);
    },
  },
});

export const { addVehicle, deleteVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
