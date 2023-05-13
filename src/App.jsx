import { useDispatch, useSelector } from "react-redux";

import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import themes from "./themes";
import Routes from "./routes";
import { Flipper } from "react-flip-toolkit";
import WithRouter from "./WithRouter";
import { useEffect } from "react";
import { getCurrentdata, getHourlydata } from "./reducers/weatherReducer";

const Nimadir = WithRouter(({ router }) => (
  <Flipper spring="veryGentle" flipKey={router.location.pathname}>
    <Routes />
  </Flipper>
));

function App() {
  const dispatch = useDispatch();
  const { customization, tempTypeMode } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getHourlydata());
    dispatch(getCurrentdata());
  }, [tempTypeMode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <Nimadir />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
