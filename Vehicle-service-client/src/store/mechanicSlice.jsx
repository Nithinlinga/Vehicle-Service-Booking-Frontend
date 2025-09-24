// src/store/mechanicSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  phone: "",
  address: "",
  skills: [],
};

const mechanicSlice = createSlice({
  name: 'mechanic',
  initialState,
  reducers: {
    updateProfile(state, action) {
      const { phone , address } = action.payload;
      state.address = address;
      state.phone = phone;
    },
    updateSkills(state, action) {
      state.skills = action.payload;
    },
  },
});

export const { updateProfile, updateSkills } = mechanicSlice.actions;
export default mechanicSlice.reducer;
