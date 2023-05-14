import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import IconSelector from "../helper/IconSelector";

const DailySection = () => {
  const { daily } = useSelector((state) => state);

  return (
    <Grid>
      <List>
        {daily?.map((e, i) => (
          <ListItemButton
            key={i}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 3fr 2fr 2fr",
            }}
          >
            <ListItemIcon sx={{ alignSelf: "center" }}>
              <IconSelector
                id={e?.weather[0].id}
                width={30}
                alt={e?.weather[0].main}
              />
            </ListItemIcon>
            <Box display="flex" alignItems="center">
              <Typography variant="h4">{`${e.temp.max > 0 && "+"}${
                e.temp.max
              }°`}</Typography>
              <Typography variant="h3"> / </Typography>
              <Typography variant="h5">{`${e.temp.min > 0 && "+"}${
                e.temp.min
              }`}</Typography>
            </Box>
            <Typography variant="h5">
              {moment(e?.dt * 1000).format("D MMMM")}
            </Typography>
            <Typography variant="h5" textAlign="end">
              {moment(e?.dt * 1000).format("dddd")}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Grid>
  );
};

export default DailySection;
