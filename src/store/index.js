import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../reducers/weatherReducer";
import authReducer from "../reducers/userReducer";
import customization from "../reducers/customization";
import tempTypeMode from "../reducers/tempTypeReducer";

export default configureStore({
  reducer: {
    hourly: weatherReducer.hourly,
    daily: weatherReducer.daily,
    current: weatherReducer.current,
    locations: weatherReducer.locations,
    currentLocation: weatherReducer.currentLocation,
    user: authReducer,
    customization,
    tempTypeMode,
  },
  devTools: process.env.NODE_ENV !== "production",
});
