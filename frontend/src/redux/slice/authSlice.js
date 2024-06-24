import { createSlice } from "@reduxjs/toolkit";

//! initial state

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem('userInfo')) || null,
  },
  //1reducers
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
      //save the user into localstorage

    
    },
    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;

//generate the reducer
const authReducer = authSlice.reducer;
export default authReducer;
