// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true' || false,
  },
  reducers: {
    login: state => {
      state.isLoggedIn = true;
      sessionStorage.setItem('isLoggedIn', 'true');
      console.log("Estado de autenticación después de login:", state.isLoggedIn);

    },
    logout: state => {
      state.isLoggedIn = false;
      sessionStorage.setItem('isLoggedIn', 'false');
      console.log("Estado de autenticación después de logout:", state.isLoggedIn);

    },
    loginSuccess: state => {
      state.isLoggedIn = true;
      sessionStorage.setItem('isLoggedIn', 'true');
      console.log("Estado de autenticación después de login:", state.isLoggedIn);

    },
  },
});


export const { login, logout, loginSuccess } = authSlice.actions;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
