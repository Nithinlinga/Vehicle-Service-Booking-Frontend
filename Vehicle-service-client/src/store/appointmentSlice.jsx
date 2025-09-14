import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const loadAppointments = () => {
  try {
    const data = localStorage.getItem("appointments");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: loadAppointments(),
  reducers: {
    addAppointment: (state, action) => {
      state.push({ ...action.payload, id: Date.now(), status: "upcoming" });
    },
    markCompleted: (state, action) => {
      const appt = state.find(a => a.id === action.payload);
      if (appt) appt.status = "completed";
    },
    deleteAppointment: (state, action) => {
      return state.filter(a => a.id !== action.payload);
    },
  },
});

export const { addAppointment, markCompleted, deleteAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
