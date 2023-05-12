import axios from "./API";

const locationService = {
  async getLoacation(coordinates) {
    // return;
    const data = await axios.locationBaseURL.get(coordinates);

    return data;
  },
};

export default locationService;
