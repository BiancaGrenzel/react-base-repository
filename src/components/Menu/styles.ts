import { Theme } from "@mui/material";

const useStyles = () => ({
  container: {
    boxSizing: "border-box",
    backgroundColor: (theme: Theme) => theme.palette.background.paper,
    boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.1)",
  },
  itemMenu: {
    textTransform: "capitalize",
  },
  drawer: {
    ".MuiDrawer-paperAnchorLeft": {
      padding: (theme: Theme) => theme.spacing(4, 2),
    },
  },
});

export default useStyles;
