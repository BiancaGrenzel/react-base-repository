import { Theme } from "@mui/material";

const useStyles = () => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    height: "100vh",
    maxHeight: "100vh",
    padding: (theme: Theme) => theme.spacing(2),
    backgroundColor: (theme: Theme) => theme.palette.background.default,
  },
});

export default useStyles;
