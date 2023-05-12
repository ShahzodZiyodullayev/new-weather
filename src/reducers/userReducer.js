import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "auth",
  initialState: { isLoading: false, loggedIn: false, user: null },
  reducers: {
    loginUserStart: (state) => {
      state.isLoading = true;
    },
    loginUserSuccess: (state) => {},
    loginUserFailure: (state) => {},
  },
});

export const { loginUserStart, loginUserSuccess, loginUserFailure } =
  authReducer.actions;
export default authReducer.reducer;
