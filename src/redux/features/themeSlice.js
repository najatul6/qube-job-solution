import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // অ্যাপ লোড হওয়ার সময় লোকাল স্টোরেজ চেক করে ইনিশিয়াল স্টেট সেট করবে
  isDarkMode: localStorage.getItem('theme') === 'dark' || false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Redux স্টেট চেঞ্জ হওয়ার সাথে সাথে লোকাল স্টোরেজেও সেভ করে দিবে
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;