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
      color: "#fff",
    },
    h5: {
      fontWeight: 600,
      color: "#fff",
    },
    h4: {
      fontWeight: 600,
      color: "#fff",
    },
    h3: {
      fontWeight: 600,
      color: "#fff",
    },
    h2: {
      fontWeight: 600,
      color: "#fff",
    },
    h1: {
      fontWeight: 600,
      color: "#fff",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px transparent inset",
            WebkitTextFillColor: "ffffff",
            WebkitBackgroundClip: "text",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "none",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
});
