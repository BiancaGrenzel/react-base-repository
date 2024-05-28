import { Theme } from "@mui/material";

const useStyles = () => ({
  container: {
    borderRadius: (theme: Theme) => theme.spacing(1),
    backgroundColor:(theme: Theme) => theme.palette.background.paper,
    cursor: "pointer",
  },
});

export default useStyles;
