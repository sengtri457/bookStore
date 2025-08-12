// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth'; // path should match actual location

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
