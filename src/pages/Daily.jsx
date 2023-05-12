import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import moment from "moment";
import { Flipped, Flipper } from "react-flip-toolkit";
import { useState } from "react";
import "./styles.css";

const Daily = () => {
  const { daily, customization } = useSelector((state) => state);
  const [focused, setFocused] = useState(null);
  const [selected, setSelected] = useState(daily[0]);
  const onClicks = (index) =>
    setFocused((prev) => (prev === index ? null : index));
  const createCardFlipId = (index) => `listItem-${index}`;

  const ListItem = ({ index, value }) => {
    return (
      <Flipped flipId={createCardFlipId(index)}>
        <div className="listItem">
          <Flipped flipId={`avatar-${index}`}>
            <img
              style={{ margin: "-15px", width: "40px" }}
              src={`http://openweathermap.org/img/wn/${value?.weather[0]?.icon}@4x.png`}
            />
          </Flipped>
        </div>
      </Flipped>
    );
  };

  const ExpandedListItem = ({ index, value = daily[0] }) => {
    return (
      <Flipped flipId={`avatar-${index}`}>
        <img
          style={{ margin: "-15px", width: "200px" }}
          src={`http://openweathermap.org/img/wn/${value?.weather[0]?.icon}@4x.png`}
        />
      </Flipped>
    );
  };

  return (
    <Flipper flipKey={focused} spring="gentle">
      <Grid>
        <Box>
          <Typography variant="h3" textTransform="uppercase">
            {moment(daily[0]?.dt * 1000).format("ddd D")}
          </Typography>
          <Typography variant="h3" textTransform="uppercase">
            {moment(daily[0]?.dt * 1000).format("MMMM")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
          <Stack spacing={1} direction="row" justifyContent="space-between">
            {daily.map((e, i) => (
              <Stack
                key={i}
                direction="column"
                spacing={2}
                sx={{
                  minWidth: "75px",
                  width: "100%",
                  alignItems: "center",
                  borderRadius: "10px",
                  transition: "all 400ms",
                  cursor: "pointer",
                  py: 2,
                  color: customization.styles.primaryTextColor,
                  "&:hover": {
                    background: customization.bool ? "#222" : "#fff",
                    color: customization.bool ? "#fff" : "#222",
                  },
                }}
                onClick={() => {
                  setSelected(e);
                  onClicks(i);
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  sx={{ transition: "0ms", textTransform: "uppercase" }}
                >
                  {moment(e.dt * 1000).format("ddd")}{" "}
                </Typography>

                <Box>
                  <ListItem index={i} key={i} value={e} />
                </Box>
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  sx={{ transition: "0ms", fontSize: "10px" }}
                >
                  {Math.round(e?.temp?.day - 273.15)}°
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Stack
            className="large-element"
            direction="row"
            alignItems="center"
            sx={{ transition: "all 0.3s ease-in-out" }}
          >
            <Typography variant="h1" fontSize={150} fontWeight={100}>
              23°
            </Typography>
            <ExpandedListItem
              index={focused}
              value={selected}
              onClick={onClicks}
            />
          </Stack>
        </Box>
      </Grid>
    </Flipper>
  );
};

export default Daily;
