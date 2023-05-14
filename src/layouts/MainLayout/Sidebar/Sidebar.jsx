import { Avatar, Stack, Typography, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CitySelect from "./CitySelect/CitySelect";
import { useSpring, animated, config } from "react-spring";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Flipped } from "react-flip-toolkit";
import { themeMode } from "../../../reducers/customization";
import sun from "../../../assets/sun.json";
import moon from "../../../assets/moon.json";
import Lottie from "react-lottie";
import { tempType } from "../../../reducers/tempTypeReducer";
import IconSelector from "../../../helper/IconSelector";

const Sidebar = () => {
  const { current, currentLocation, customization, tempTypeMode } = useSelector(
    (state) => state,
  );
  const dispatch = useDispatch();

  const eventHandler = () => {
    dispatch(themeMode(!customization.bool));
  };

  const tempEventHandler = () => {
    dispatch(tempType(!tempTypeMode.bool));
  };

  const { number } = useSpring({
    from: { number: 0 },
    number: current.temp ? current.temp : 0,
    delay: 900,
    config: config.molasses,
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
  };

  return (
    <Grid
      xs={12}
      sm={12}
      md={5}
      lg={4.5}
      sx={{
        display: "grid",
        width: "100%",
        height: { md: "inherit", sm: "100vh", xs: "100vh" },
        p: { md: 2, sm: 2, xs: 1 },
        background: "linear-gradient(330deg, #11998e 0%, #38ef7d 100%)",
      }}
    >
      <Grid className="tools_bar">
        <Stack direction="row" className="tools_bar_stack">
          <CitySelect />
          <Box display="flex" alignItems="center" onClick={tempEventHandler}>
            {tempTypeMode.bool ? (
              <IconButton disableRipple>°C</IconButton>
            ) : (
              <IconButton disableRipple>°F</IconButton>
            )}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={eventHandler}
            sx={{ height: "40px", width: "60px", overflow: "hidden" }}
          >
            {customization.bool ? (
              <IconButton disableRipple>
                <Lottie
                  options={{ ...defaultOptions, animationData: sun }}
                  height="70px"
                  width="70px"
                />
              </IconButton>
            ) : (
              <IconButton disableRipple sx={{ mt: "4px" }}>
                <Lottie
                  options={{ ...defaultOptions, animationData: moon }}
                  height="70px"
                  width="70px"
                />
              </IconButton>
            )}
          </Box>

          <Link to="profile">
            <Flipped flipId={"one"}>
              <Avatar
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                variant="square"
                sx={{ borderRadius: "10px", cursor: "pointer" }}
              />
            </Flipped>
          </Link>
        </Stack>
      </Grid>

      <Grid
        className="temperature"
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Box>
          <Typography className="temperature_value" variant="body">
            {current && current.temp && (
              <animated.div>{number.to((n) => n.toFixed())}</animated.div>
            )}
            <span className="temperature_round">°</span>
          </Typography>
          {currentLocation && (
            <Typography
              className="current_location_name"
              display="block"
              noWrap
              variant="body"
            >
              {currentLocation.loc.split(",")[0]}
            </Typography>
          )}
          <Typography className="temperature_description" variant="body">
            {current && current?.weather && current?.weather[0]?.description}
          </Typography>
        </Box>
        <Box>
          <IconSelector
            id={current?.weather && current.weather[0].id}
            size={10}
            alt={current?.weather && current.weather[0].main}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
