import { createSlice } from "@reduxjs/toolkit";
import { TempUnit } from "../helper/TempUnit";

const whichUnit = () =>
  localStorage.getItem("unit")
    ? JSON.parse(localStorage.getItem("unit"))
    : true;

export const hourlyWeatherSlice = createSlice({
  name: "hourly",
  initialState: [],
  reducers: {
    getHourlydata: (state, { _, payload }) => {
      state = [
        ...(payload ? payload : state).map((item) => ({
          ...item,
          temp: TempUnit(whichUnit(), item.temp, payload ? true : null),
        })),
      ];
      return state;
    },
  },
});

export const dailyWeatherSlice = createSlice({
  name: "daily",
  initialState: [],
  reducers: {
    getDailydata: (state, { _, payload }) => {
      console.log(payload);
      state = [
        ...(payload ? payload : state).map((item) => ({
          ...item,
          temp: {
            max: TempUnit(whichUnit(), item.temp.max, payload ? true : null),
            min: TempUnit(whichUnit(), item.temp.min, payload ? true : null),
          },
        })),
      ];
      return state;
    },
  },
});

export const currentWeatherSlice = createSlice({
  name: "current",
  initialState: {},
  reducers: {
    getCurrentdata: (state, { _, payload }) => {
      state = {
        ...(payload ? payload : state),
        temp: TempUnit(
          whichUnit(),
          (payload ? payload : state).temp,
          payload ? true : null,
        ),
      };
      return state;
    },
  },
});

export const locationsSlice = createSlice({
  name: "locations",
  initialState: null,
  reducers: {
    getLocationsdata: (state, { _, payload }) => {
      state = payload;
      return state;
    },
  },
});

export const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState: null,
  reducers: {
    getCurrentLocation: (state, { _, payload }) => {
      state = { loc: payload[0], coords: payload[1] };
      return state;
    },
  },
});

export const { getHourlydata } = hourlyWeatherSlice.actions;
export const { getDailydata } = dailyWeatherSlice.actions;
export const { getCurrentdata } = currentWeatherSlice.actions;
export const { getLocationsdata } = locationsSlice.actions;
export const { getCurrentLocation } = currentLocationSlice.actions;

export default {
  hourly: hourlyWeatherSlice.reducer,
  daily: dailyWeatherSlice.reducer,
  current: currentWeatherSlice.reducer,
  locations: locationsSlice.reducer,
  currentLocation: currentLocationSlice.reducer,
};
