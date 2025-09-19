// src/store/mechanicSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    name: "Sarah Johnson",
    role: "System Administrator",
    email: "admin@example.com",
    phone: "+91 98765 43210",
    location: "Coimbatore, India",
    department: "IT & Infrastructure",
    joined: "March 2022",
    bio: "Oversees system operations, manages user access, and ensures platform security.",
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateProfile(state, action) {
      const { name, role , email, phone, location, department, joined, bio } = action.payload;
      state.name = name;
      state.role = role;
      state.email = email;
      state.phone = phone;
      state.location = location;
      state.department = department;
      state.joined = joined;
      state.bio = bio;
    }
  },
});

export const { updateProfile } = adminSlice.actions;
export default adminSlice.reducer;
