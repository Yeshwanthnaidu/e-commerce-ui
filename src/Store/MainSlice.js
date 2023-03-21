import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

//Accessing Storage Functions
const tokenVerification = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded) {
      return decoded;
    }
  }
  return false;
};

const mainSlice = createSlice({
  name: `mainSlice`,
  initialState: {
    loginStatus: !!tokenVerification() ? true : false,
    userData: !!tokenVerification() ? tokenVerification() : {},
    showSellingModal: false,
  },
  reducers: {
    loggedUserData(state, action) {
      state.userData = action.payload;
      state.loginStatus = true;
    },
    logoutUser(state) {
      localStorage.removeItem("token");
      state.showSellingModal = false;
      state.userData = {};
      state.loginStatus = false;
    },
    showsellingModal(state, action) {
      state.showSellingModal = action.payload;
    },
  },
});

export const mainSliceActions = mainSlice.actions;

export default mainSlice;
