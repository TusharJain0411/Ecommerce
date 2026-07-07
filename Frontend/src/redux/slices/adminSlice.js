import { createSlice } from "@reduxjs/toolkit";

const getCurrentAdminFromLocalStorage = () => {
  const data = localStorage.getItem("currentAdmin");

  if (!data || data === "undefined") {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch (err) {
    localStorage.removeItem("currentAdmin");
    return null;
  }
};
const initialState = {
  currentAdmin: getCurrentAdminFromLocalStorage(),
  isLoggedIn: getCurrentAdminFromLocalStorage() ? true : false,
  error: null,
  success: null,
  MainAdmin: getCurrentAdminFromLocalStorage()?.isAdmin || false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {
    signupSuccess: (state, action) => {
      state.success = action.payload;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.currentAdmin = action.payload.admin;
      state.isLoggedIn = true;
      state.MainAdmin = action.payload.admin.isAdmin;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("currentAdmin", JSON.stringify(action.payload.admin));

      state.success = "Login Successful";
      state.error = null;
    },

    logout: (state) => {
      state.currentAdmin = null;
      state.isLoggedIn = false;
      state.error = null;
      state.success = null;
      state.MainAdmin = false;

      localStorage.removeItem("token");
      localStorage.removeItem("currentAdmin");
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});

export const { signupSuccess, loginSuccess, logout, setError, clearMessages } =
  adminSlice.actions;

export default adminSlice.reducer;
