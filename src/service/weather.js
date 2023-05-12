import axios from "./API";

const weatherService = {
  async getWeather(coordinates) {
    // return;
    const data = await axios.weatherBaseURL.get(coordinates);

    return data;
  },
};

export default weatherService;
