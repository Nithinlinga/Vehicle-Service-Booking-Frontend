// src/store/mechanicSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  skills: [],
};

const mechanicSlice = createSlice({
  name: 'mechanic',
  initialState,
  reducers: {
    updateProfile(state, action) {
      const { name, email, phone, address } = action.payload;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
    },
    updateSkills(state, action) {
      state.skills = action.payload;
    },
  },
});

export const { updateProfile, updateSkills } = mechanicSlice.actions;
export default mechanicSlice.reducer;