// src/store/mechanicSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    name: "John Doe",
    username: "@johndoe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    location: "Coimbatore, India",
    bio: "Full Stack Developer | Tech Enthusiast | Coffee Lover",
    joined: "January 2023",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile(state, action) {
      const { name, username , email, phone , location , bio , joined } = action.payload;
      state.name = name;
      state.username = username;
      state.email = email;
      state.phone = phone;
      state.location = location;
      state.bio = bio;
      state.joined = joined;
    }
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;
