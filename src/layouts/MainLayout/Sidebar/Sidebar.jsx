import {
  Avatar,
  Stack,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
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
      md={4}
      lg={4}
      sx={{
        display: "grid",
        width: "100%",
        height: { md: "inherit", sm: "auto", xs: "auto" },
        p: { md: 2, sm: 2, xs: 1 },
        background: {
          md: "linear-gradient(330deg, #11998e 0%, #38ef7d 100%)",
          xs: "linear-gradient(to bottom, #FF4858 10%, transparent 100%)",
        },
      }}
    >
      <Grid className="tools_bar">
        <Stack direction="row" className="tools_bar_stack">
          <CitySelect />
          <Box display="flex" alignItems="center" onClick={tempEventHandler}>
            {tempTypeMode.bool ? (
              <IconButton disableRipple>
                <Typography variant="h3">°C</Typography>
              </IconButton>
            ) : (
              <IconButton disableRipple>
                <Typography variant="h3">°F</Typography>
              </IconButton>
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
        <Stack
          direction={isSm ? "row" : "column"}
          sx={{
            width: "100%",
            alignItems: isSm ? "center" : "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Typography
            className="temperature_value"
            variant="body1"
            sx={{
              fontSize: { xs: "80px", md: "170px" },
              lineHeight: { xs: "80px", md: "170px" },
            }}
          >
            {current && current?.temp && (
              <animated.div>{number.to((n) => n.toFixed())}</animated.div>
            )}
            <span className="temperature_round">°</span>
          </Typography>
          <div>
            {currentLocation && (
              <Typography
                className="current_location_name"
                display="block"
                noWrap
                variant="body1"
              >
                {currentLocation.loc.split(",")[0]}
              </Typography>
            )}
            <Typography className="temperature_description" variant="body1">
              {current && current?.weather && current?.weather[0]?.description}
            </Typography>
          </div>
          {isSm && (
            <Box>
              <IconSelector
                id={current?.weather && current.weather[0].id}
                size={10}
                alt={current?.weather && current.weather[0].main}
              />
            </Box>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
