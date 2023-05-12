import { useSelector } from "react-redux";

import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import themes from "./themes";
import Routes from "./routes";
import { Flipper } from "react-flip-toolkit";
import WithRouter from "./WithRouter";

const Nimadir = WithRouter(({ router }) => (
  <Flipper spring="veryGentle" flipKey={router.location.pathname}>
    <Routes />
  </Flipper>
));

function App() {
  const customization = useSelector((state) => state.customization);

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
