// src/store/mechanicSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  name: "John Doe",
  phone: "+91 98765 43210",
  email: "johndoe@email.com",
  address: "Kolkata, India",
  skills: ["Engine Repair", "Brake & Suspension", "Car AC Service", "Electrical Diagnostics"],
};

const mechanicSlice = createSlice({
  name: 'mechanic',
  initialState,
  reducers: {
    updateProfile(state, action) {
      const { name, phone, email, address } = action.payload;
      state.name = name;
      state.phone = phone;
      state.email = email;
      state.address = address;
    },
    updateSkills(state, action) {
      state.skills = action.payload;
    },
  },
});

export const { updateProfile, updateSkills } = mechanicSlice.actions;
export default mechanicSlice.reducer;
