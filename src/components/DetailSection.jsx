import { Grid, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Wind from "../assets/wind-2.png";
import Hot from "../assets/hot.png";
import Pressure from "../assets/pressure.png";
import Sun from "../assets/sunny.png";
import Moon from "../assets/moon.png";
import Drop from "../assets/drop.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";

const time = (t) => {
  moment.locale("uz");
  return moment(t * 1000).format("hh [:] mm");
};

const DetailItem = ({ icon, value, name, unit }) => {
  return (
    <Grid2 xs={6} sm={6} md={6} lg={4}>
      <Stack
        direction="column"
        sx={{
          background: "rgba(200, 200, 200, 0.1)",
          py: 2,
          borderRadius: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={icon} alt="" width="40px" />
        <Typography variant="h4" textTransform="capitalize" mt={1}>
          {name}
        </Typography>
        <Typography variant="h5">
          {value} {unit}
        </Typography>
      </Stack>
    </Grid2>
  );
};

const DetailSection = () => {
  const { current } = useSelector((state) => state);

  return (
    <Grid2 container spacing={1}>
      <DetailItem
        icon={Wind}
        name="Wind"
        value={current.wind_speed}
        unit="m/s"
      />
      <DetailItem icon={Hot} name="UVI" value={current.uvi} unit="" />
      <DetailItem
        icon={Pressure}
        name="Pressure"
        value={current.pressure}
        unit="hPa"
      />
      <DetailItem
        icon={Drop}
        name="Humidity"
        value={current.humidity}
        unit="%"
      />
      <DetailItem
        icon={Sun}
        name="Sunrise"
        value={time(current.sunrise)}
        unit=""
      />
      <DetailItem
        icon={Moon}
        name="Sunset"
        value={time(current.sunset)}
        unit=""
      />
    </Grid2>
  );
};

export default DetailSection;
