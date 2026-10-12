import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // পরে ডার্ক মোডের জন্য themeReducer এখানে যোগ করব
  },
});