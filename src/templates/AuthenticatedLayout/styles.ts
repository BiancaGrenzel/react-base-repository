import { Theme } from "@mui/material";

const useStyles = () => ({
  container: {
    boxSizing: "border-box",
    padding: (theme: Theme) => theme.spacing(2),
    backgroundColor: (theme: Theme) => theme.palette.background.default,
    height: "calc(100vh - 64px)",
    maxHeight: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",

    "@media (max-width: 860px)": {
      height: "calc(100vh - 56px)",
      maxHeight: "calc(100vh - 56px)",
    },
  },
});

export default useStyles;
