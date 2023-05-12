import Grid from "@mui/material/Unstable_Grid2";
import { Avatar } from "@mui/material";
import React from "react";
import { Flipped } from "react-flip-toolkit";

const Profile = () => {
  return (
    <Grid sx={{ width: "100%", height: "100vh" }}>
      <Flipped flipId={"one"}>
        <Avatar
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
          variant="square"
          sx={{
            borderRadius: "10px",
            cursor: "pointer",
            width: "200px",
            height: "200px",
          }}
        />
      </Flipped>
    </Grid>
  );
};

export default Profile;
