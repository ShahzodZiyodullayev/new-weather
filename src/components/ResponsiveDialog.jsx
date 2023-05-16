import * as React from "react";
import { Flipped } from "react-flip-toolkit";
import IconSelector from "../helper/IconSelector";
import {
  Box,
  Grid,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import moment from "moment";

export default function ResponsiveDialog({
  open,
  handleClose,
  focused,
  selected,
}) {
  return (
    <Grid
      sx={{
        transition: "opacity 400ms",
        visibility: open ? "visible" : "hidden",
        opacity: open ? 1 : 0,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(100, 100, 100, 0.5)",
        zIndex: 1000000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleClose}
    >
      <Grid2 sx={{ p: 5, borderRadius: "10px" }} data_label="no">
        <Flipped flipId={`list-${focused}`} stagger="icon">
          <ListItemButton
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 3fr 2fr 2fr",
            }}
          >
            <ListItemIcon sx={{ alignSelf: "center" }}>
              <IconSelector
                id={selected?.weather[0].id}
                width={30}
                alt={selected?.weather[0].main}
              />
            </ListItemIcon>
            <Box display="flex" alignItems="center">
              <Typography variant="h4">{`${selected?.temp.max > 0 && "+"}${
                selected?.temp.max
              }°`}</Typography>
              <Typography variant="h3"> / </Typography>
              <Typography variant="h5">{`${selected?.temp.min > 0 && "+"}${
                selected?.temp.min
              }`}</Typography>
            </Box>
            <Typography variant="h5">
              {moment(selected?.dt * 1000).format("D MMMM")}
            </Typography>
            <Typography variant="h5" textAlign="end">
              {moment(selected?.dt * 1000).format("dddd")}
            </Typography>
          </ListItemButton>
        </Flipped>
      </Grid2>
    </Grid>
  );
}
