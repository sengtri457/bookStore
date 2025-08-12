// // auth.js or authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isloggedIn: false,
//     role: "user",
//     user: null,  // Add user object here
//   },
//   reducers: {
//     login(state) {
//       state.isloggedIn = true;
//     },
//     logout(state) {
//       state.isloggedIn = false;
//       state.user = null;  // Clear user info on logout
//       state.role = "user";
//     },
//     changeRole(state, action) {
//       state.role = action.payload;
//     },
//     setUser(state, action) {
//       state.user = action.payload;  // Set user info here
//     },
//   },
// });

// export const authAction = authSlice.actions;
// export default authSlice.reducer;
// auth.js or authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isloggedIn: false, // Keep consistent with your existing usage
    role: "user",
    user: null,
  },
  reducers: {
    login(state) {
      state.isloggedIn = true;
    },
    logout(state) {
      state.isloggedIn = false;
      state.user = null;
      state.role = "user";
    },
    changeRole(state, action) {
      state.role = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
