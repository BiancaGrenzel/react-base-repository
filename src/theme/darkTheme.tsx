import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#303030",
      paper: "#424242",
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "none",
        },
      },
    },
  },
});
