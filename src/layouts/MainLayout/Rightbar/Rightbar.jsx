import Grid from "@mui/material/Unstable_Grid2";
import HourlyChart from "../../../components/HourlyChart";

const Rightbar = ({ children }) => {
  return (
    <Grid
      xs={12}
      sm={12}
      md={7}
      lg={7.5}
      sx={{
        overflow: { md: "scroll" },
        overflowX: { md: "hidden" },
        height: { md: "inherit", sm: "auto" },
        position: "relative",
        p: { md: 2, sm: 2, xs: 1 },
      }}
    >
      <HourlyChart />
      {children}
    </Grid>
  );
};

export default Rightbar;
