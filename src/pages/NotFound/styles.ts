import { Theme } from "@mui/material";

const useStyles = () => ({
  container: {
    backgroundColor: (theme: Theme) => theme.palette.background.default,
  }
});

export default useStyles;
