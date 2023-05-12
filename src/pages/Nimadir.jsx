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

  const ExpandedListItem = ({ index, value = daily[0] }) => {
    return (
      <Stack
        className="large-element"
        direction="row"
        alignItems="center"
        sx={{ transition: "all 0.3s ease-in-out" }}
      >
        <Box>
          <Flipped flipId={`listTemp-${index}`}>
            <Typography
              variant="subtitle1"
              // color="inherit"
              sx={{
                transition: "0ms",
                textTransform: "uppercase",
                fontSize: 50,
                lineHeight: "50px",
              }}
            >
              {Math.round(value?.temp?.day - 273.15)}°
            </Typography>
          </Flipped>
          <Typography variant="h3" textTransform="uppercase">
            {`${moment(value?.dt * 1000).format("ddd D")} ${moment(
              value?.dt * 1000,
            ).format("MMMM")}`}
          </Typography>
        </Box>
        <Flipped flipId={`avatar-${index}`} stagger="icon">
          <img
            style={{ width: "148px" }}
            src={`http://openweathermap.org/img/wn/${value?.weather[0]?.icon}@4x.png`}
          />
        </Flipped>
      </Stack>
    );
  };

  const ListItemTemp = ({ index, value }) => {
    return (
      <Flipped flipId={`listTemp-${index}`}>
        <Typography
          variant="subtitle1"
          color="inherit"
          sx={{ transition: "0ms" }}
        >
          {Math.round(value?.temp?.day - 273.15)}°
        </Typography>
      </Flipped>
    );
  };

  const ListItemIcon = ({ index, value }) => {
    return (
      <Flipped flipId={`avatar-${index}`} stagger="icon">
        <img
          style={{ width: "40px" }}
          src={`http://openweathermap.org/img/wn/${value?.weather[0]?.icon}@4x.png`}
        />
      </Flipped>
    );
  };

  return (
    <Flipper
      flipKey={[0, 1, 2, 3, 4, 5, 6, 7]}
      spring="veryGentle"
      decisionData={[0, 1, 2, 3, 4, 5, 6, 7]}
    >
      <Grid>
        <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              overflow: "auto",
              "&::-webkit-scrollbar": { width: 0 },
            }}
          >
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
                  <ListItemIcon index={i} key={i} value={e} />
                </Box>

                <ListItemTemp index={i} key={i} value={e} />
              </Stack>
            ))}
          </Stack>
          <ExpandedListItem
            index={focused}
            value={selected}
            onClick={onClicks}
          />
        </Box>
      </Grid>
    </Flipper>
  );
};

export default Daily;
