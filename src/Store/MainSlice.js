import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

//Accessing Storage Functions
const tokenVerification = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded) {
      return decoded
    }
  }
  return false
}

const mainSlice = createSlice({
  name: `mainSlice`,
  initialState: {
    showLoginTab: false,
    showRegisterTab: false,
    showForgotPasswordTab: false,
    loginStatus: !!tokenVerification() ? true : false,
    userData: !!tokenVerification() ? tokenVerification() : {},
    showSellingModal: false,
    showForgotUsernameTab: false
  },
  reducers: {
    showLogin(state, action) {
      state.showLoginTab = action.payload;
      state.showRegisterTab = false;
      state.showForgotPasswordTab = false;
    },
    showRegister(state, action) {
      state.showRegisterTab = action.payload;
      state.showLoginTab = false;
      state.showForgotPasswordTab = false;
      // window.location.reload(false);
    },
    showForgotPasswordTab(state, action) {
      state.showForgotPasswordTab = action.payload;
      state.showLoginTab = false;
      state.showRegisterTab = false;
    },
    loggedUserData(state, action) {
      state.userData = action.payload;
      state.loginStatus = true;
    },
    logoutUser(state, action) {
      localStorage.removeItem('token')
      state.showSellingModal = false
      state.userData = {};
      state.loginStatus = false
    },
    showsellingModal(state, action) {
      state.showSellingModal = action.payload
    },
    showForgotsUsernameModal(state, action) {
      state.showForgotUsernameTab = action.payload
      state.showLoginTab = false;
      state.showRegisterTab = false;
    }
  },
});

export const mainSliceActions = mainSlice.actions;

export default mainSlice;