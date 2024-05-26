import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#d65555",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
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
