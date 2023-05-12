import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Rightbar from "./Rightbar/Rightbar";
import Grid from "@mui/material/Unstable_Grid2";

const MainLayout = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { md: "100vh", xs: "auto" },
        overflow: "hidden",
      }}
    >
      <CssBaseline />
      <Grid
        container
        sx={{
          height: { md: "100%", xs: "auto" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Sidebar />
        <Rightbar>
          <Outlet />
        </Rightbar>
      </Grid>
    </Box>
  );
};

export default MainLayout;
