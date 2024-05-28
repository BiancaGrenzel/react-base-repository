import { createTheme, lighten, ThemeOptions } from "@mui/material/styles";

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
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#303030",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px transparent inset",
            WebkitTextFillColor: "ffffff",
            WebkitBackgroundClip: "text",
          },
        },
        notchedOutline: {
          borderColor: "#d3d3d3",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#d3d3d3",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: () => ({
          borderColor: lighten(darkTheme.palette.primary.main, 0.5),
          color: lighten(darkTheme.palette.primary.main, 0.5),
        }),
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
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#424242",
          borderColor: "#303030",
        },
        header: {
          backgroundColor: "#424242",
          borderColor: "#303030",
        },
        cell: {
          borderColor: "#303030",
          color: "#fff",
        },
        withBorderColor: {
          borderColor: "#303030",
        },
        columnHeaderRow: {
          backgroundColor: "#383838",
        },
        footerContainer: {
          backgroundColor: "#383838",
        },
      },
    },
  },
} as ThemeOptions);
