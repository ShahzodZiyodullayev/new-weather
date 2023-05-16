import Grid from "@mui/material/Unstable_Grid2";
import HourlyChart from "../../../components/HourlyChart";
import Daily from "../../../pages/Daily";
import DailySection from "../../../components/DailySection";
import DetailSection from "../../../components/DetailSection";

const Rightbar = ({ children }) => {
  return (
    <Grid
      xs={12}
      sm={12}
      md={8}
      lg={8}
      sx={{
        overflow: { md: "scroll" },
        overflowX: { md: "hidden" },
        height: { md: "inherit", sm: "auto" },
        position: "relative",
        p: { md: 2, sm: 2, xs: 1 },
      }}
    >
      <HourlyChart />
      <DailySection />
      <DetailSection />
      {children}
    </Grid>
  );
};

export default Rightbar;
