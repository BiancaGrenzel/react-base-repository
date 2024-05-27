import { Theme } from "@mui/material";

const useStyles = () => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    background: (theme: Theme) => theme.palette.background.paper,
    padding: "32px",
    borderRadius: "8px",
  },
});

export default useStyles;
