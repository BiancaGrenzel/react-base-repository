import { ThemeProvider } from "@emotion/react";
import Routes from "./routes/Router";
import { useMuiTheme } from "./hooks/useMuiTheme";

function App() {
  const { getMuiTheme } = useMuiTheme();

  return (
    <ThemeProvider theme={getMuiTheme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
