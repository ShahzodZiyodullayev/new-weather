import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../reducers/weatherReducer";
import authReducer from "../reducers/userReducer";
import customization from "../reducers/customization";

export default configureStore({
  reducer: {
    hourly: weatherReducer.hourly,
    daily: weatherReducer.daily,
    current: weatherReducer.current,
    locations: weatherReducer.locations,
    currentLocation: weatherReducer.currentLocation,
    user: authReducer,
    customization,
  },
  devTools: process.env.NODE_ENV !== "production",
});
