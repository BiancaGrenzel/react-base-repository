import { Theme, lighten } from "@mui/material";

const useStyles = () => ({
  profileContainer: {
    margin: "0 auto",
    marginTop: "3vw",
    width: "1280px",
    height: "720px",
    borderRadius: (theme: Theme) => theme.spacing(2),
    boxSizing: "border-box",
    padding: (theme: Theme) => theme.spacing(6),

    "@media (max-width: 1340px)": {
      width: "100%",
      height: "576px",
    },
    "@media (max-width: 860px)": {
      height: "100%",
    },
  },
  tabs: {
    marginBottom: (theme: Theme) => theme.spacing(4),
    ".MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
    ".Mui-selected": {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === "light"
          ? lighten(theme.palette.primary.main, 0.9)
          : lighten(theme.palette.primary.main, 0.6),
    },
  },
  tab: {
    borderRadius: (theme: Theme) => theme.spacing(1),
    alignItems: "flex-start",
    fontSize: (theme: Theme) => theme.typography.body1,
    fontWeight: "bold",
    textTransform: "none",
  },
});

export default useStyles;
