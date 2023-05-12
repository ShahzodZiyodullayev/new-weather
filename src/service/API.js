import axios from "axios";

const userBaseURL = axios.create({
  baseURL: "",
});

const weatherBaseURL = axios.create({
  baseURL: "https://api.openweathermap.org/data/",
});

const locationBaseURL = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/",
});

export default { userBaseURL, weatherBaseURL, locationBaseURL };
