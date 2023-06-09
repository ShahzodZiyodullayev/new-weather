import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import IconSelector from "../helper/IconSelector";
import ResponsiveDialog from "./ResponsiveDialog";
import { Flipped, Flipper } from "react-flip-toolkit";

const DailySection = () => {
  const { daily } = useSelector((state) => state);
  const [focused, setFocused] = useState(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const onClicks = (index) =>
    setFocused((prev) => (prev === index ? null : index));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    if (e.target?.attributes?.data_label?.value !== "no") setOpen(false);
  };

  return (
    <Flipper
      flipKey={[0, 1, 2, 3, 4, 5, 6, 7]}
      spring="veryGentle"
      decisionData={[0, 1, 2, 3, 4, 5, 6, 7]}
    >
      <Grid
        sx={{
          background: "rgba(200, 200, 200, 0.1)",
          borderRadius: "20px",
          mb: 1,
        }}
      >
        <List>
          {daily?.map((e, i) => (
            <Box
              onClick={() => {
                handleClickOpen();
                onClicks(i);
                setSelected(e);
              }}
              key={i}
            >
              <Flipped flipId={`list-${i}`} stagger="icon">
                <ListItemButton
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
              </Flipped>
            </Box>
          ))}
        </List>
        <ResponsiveDialog
          open={open}
          handleClose={handleClose}
          focused={focused}
          selected={selected}
        />
      </Grid>
    </Flipper>
  );
};

export default DailySection;
