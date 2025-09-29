import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    name: "Nithin Linga",
    role: "System Administrator",
    email: "admin@gmail.com",
    phone: "+91 87904 68868",
    location: "Coimbatore, India",
    department: "IT",
    joined: "Sept 2025",
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
