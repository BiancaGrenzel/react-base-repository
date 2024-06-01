import { createTheme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Components {
    MuiDataGrid?: {
      styleOverrides?: {
        root?: {
          "& .MuiDataGrid-cell"?: React.CSSProperties;
          "& .MuiDataGrid-columnHeader"?: React.CSSProperties;
          "& .MuiDataGrid-row"?: {
            "&:nth-of-type(odd)"?: React.CSSProperties;
          };
        };
      };
    };
  }
}

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

    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          boxShadow: "none",
        },
        sizeMedium: () => ({
          height: "40px",
        }),
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
    MuiDataGrid: {
      styleOverrides: {
        columnHeaderRow: {
          backgroundColor: "#f9fafb",
        },
        footerContainer: {
          backgroundColor: "#f9fafb",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        multiline: {
          minHeight: "100px",
          alignItems: "flex-start",
        },
      },
    },
  },
} as ThemeOptions);
