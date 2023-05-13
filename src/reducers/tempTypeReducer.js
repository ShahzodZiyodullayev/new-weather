import { createSlice } from "@reduxjs/toolkit";

const whichUnit = localStorage.getItem("unit")
  ? JSON.parse(localStorage.getItem("unit"))
  : true;

const initialState = (bool = whichUnit) => {
  localStorage.setItem("unit", bool);
  switch (bool) {
    case true:
      return {
        unit: "celcius",
        bool,
      };
    case false:
      return {
        unit: "farhenheit",
        bool,
      };
  }
};

export const tempTypeReducer = createSlice({
  name: "tempType",
  initialState: { ...initialState() },
  reducers: {
    tempType: (state, { _, payload }) => {
      state = { ...initialState(payload) };
      return state;
    },
  },
});

export const { tempType } = tempTypeReducer.actions;
export default tempTypeReducer.reducer;
