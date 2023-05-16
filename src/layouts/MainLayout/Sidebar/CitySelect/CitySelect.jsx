import React, { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import {
  Box,
  List,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { X } from "react-feather";
import { UilSearch } from "@iconscout/react-unicons";
import "./style.css";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, config } from "react-spring";
import {
  getLocationsdata,
  getCurrentdata,
  getDailydata,
  getHourlydata,
  getCurrentLocation,
} from "../../../../reducers/weatherReducer";
import locationService from "../../../../service/location";
import weatherService from "../../../../service/weather";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const api = {
  // key: "b60784f97169c5d1da965fb3dcf63b17",
  key: "6aeb8af43b573a8b2646f3fdd4d343a7",
  baseUrl: "https://api.openweathermap.org/data/3.0/",
};

export default function CitySelect(props) {
  const dispatch = useDispatch();
  const { locations, currentLocation } = useSelector((state) => state);
  const [locationValue, setLocationValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inError, setInError] = useState(null);
  const [citiesNotFound, setCitiesNotFound] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const LAT_LON = (e) => [(e[1] + e[3]) / 2, (e[0] + e[2]) / 2];

  const select = (e) => {
    fetchData(...LAT_LON(e));
  };

  const fetchData = (
    lat = currentLocation?.coords[0],
    lon = currentLocation?.coords[1],
  ) => {
    if (lat === undefined && lon === undefined) {
      getCurrentLocationWithCoords(41.2981555, 69.2808155);
      getWeatherDataFromMapboxApi(41.2981555, 69.2808155);
    } else {
      getWeatherDataFromMapboxApi(lat, lon);
    }
  };

  const getCurrentLocationWithCoords = async (la, lo) => {
    await locationService
      .getLoacation(
        `mapbox.places/${lo},${la}.json?access_token=pk.eyJ1Ijoic3NoYWh6b2Q1IiwiYSI6ImNsMjRqb2V3NzBhMDIzY3F6N3p3c2MyZGsifQ.hhX6yDNbtjOrROsYkiue7g`,
      )
      .then((e) =>
        dispatch(
          getCurrentLocation([e.data.features[1].place_name, e.data.query]),
        ),
      );
  };

  const getLocationCoordsFromBrowser = () => {
    const watchPositionParams = [
      (pos) => {
        getCurrentLocationWithCoords(pos.coords.latitude, pos.coords.longitude);
        getWeatherDataFromMapboxApi(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        getCurrentLocationWithCoords(41.2981555, 69.2808155);
        getWeatherDataFromMapboxApi(41.2981555, 69.2808155);
      },
      {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: Infinity,
      },
    ];
    navigator.geolocation.watchPosition(...watchPositionParams);
  };

  const getWeatherDataFromMapboxApi = async (lat, lon) => {
    await weatherService
      // .getWeather(`2.5/onecall?lat=${lat}&lon=${lon}&exclude=&appid=${api.key}`)
      .getWeather(`3.0/onecall?lat=${lat}&lon=${lon}&exclude=&appid=${api.key}`)
      .then((e) => {
        dispatch(getCurrentdata(e.data.current));
        dispatch(getDailydata(e.data.daily));
        dispatch(getHourlydata(e.data.hourly));
      });
  };

  const click = (e) => {
    select(e.coor);
    setLocationValue(e.label);
    dispatch(getCurrentLocation([e.label, LAT_LON(e.coor)]));
  };

  const handleChangeLocationValue = (value) => {
    if (value) {
      setLocationValue(value);
      getLocationFromMapboxAPI(value);
    } else {
      setLocationValue("");
    }
  };

  const getLocationFromMapboxAPI = async (e) => {
    setLoading(true);
    try {
      setVisible(true);
      let res = await locationService.getLoacation(
        `mapbox.places/${e}.json?access_token=pk.eyJ1Ijoic3NoYWh6b2Q1IiwiYSI6ImNsMjRqb2V3NzBhMDIzY3F6N3p3c2MyZGsifQ.hhX6yDNbtjOrROsYkiue7g`,
      );
      if (res && res.data) {
        if (res.data.features && res.data.features.length > 0) {
          let tmp = res.data.features.map((item) => {
            return {
              label: `${item.place_name}`,
              coor: item.bbox,
            };
          });
          if (tmp) {
            dispatch(getLocationsdata(tmp));
          }
        } else {
          setCitiesNotFound(true);
          dispatch(getLocationsdata(null));
        }
      } else {
        dispatch(getLocationsdata(null));
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error") {
        setInError(err.message);
      }
    }
  };

  const prop = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    // reset: true,
    delay: 700,
    config: config.molasses,
  });

  return (
    <Box className="cont">
      <Box
        onClick={() => {
          setVisible(false);
          setLocationValue("");
        }}
        className={`searchIcon ${visible === true ? "visible" : "hidden"}`}
      ></Box>
      <Box className="input_container">
        <Box className="inputField">
          <DebounceInput
            placeholder="Search..."
            minLength={2}
            debounceTimeout={500}
            value={locationValue}
            onChange={(e) => handleChangeLocationValue(e.target.value)}
            className="input"
            // className={`input ${visible ? "visible" : "hidden"}`}
          />
          <Box
            className={`xContainer ${locationValue ? "visible" : "hidden"}`}
            onClick={(e) => handleChangeLocationValue("")}
          >
            <X size={20} onClick={() => setVisible(false)} color="#757575" />
          </Box>
          <Box className="UilSearch">
            <UilSearch
              size={23}
              onClick={() => {
                // setVisible(visible === true ? false : true);
                setLocationValue("");
              }}
            />
          </Box>
        </Box>
        <Box
          className={`autocomplateContainer ${
            locationValue === "" && visible === false
              ? "hidden"
              : locationValue === "" && visible === true
              ? "hidden"
              : "visible"
          }`}
        >
          <Grid2 sx={{ borderRadius: "12px" }}>
            <List className="list">
              {!loading ? (
                <>
                  {locations ? (
                    locations.length > 0 ? (
                      locations.map((item, i) => (
                        <ListItemButton key={i} sx={{ height: "35px" }}>
                          <ListItemText onClick={() => click(item)}>
                            <Typography noWrap>{item.label}</Typography>
                          </ListItemText>
                        </ListItemButton>
                      ))
                    ) : (
                      <Grid className="noResult">No results</Grid>
                    )
                  ) : (
                    <>
                      {citiesNotFound ? (
                        <Grid className="noResult">Data not Found</Grid>
                      ) : (
                        <Grid className="noResult">{inError}</Grid>
                      )}
                    </>
                  )}
                </>
              ) : (
                <Grid className="noResult">
                  <CircularProgress />
                </Grid>
              )}
            </List>
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
}
