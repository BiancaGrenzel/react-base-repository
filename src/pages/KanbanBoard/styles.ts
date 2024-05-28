import { Theme } from "@mui/material";

const useStyles = () => ({
  container: {
    padding: (theme: Theme) => theme.spacing(4),
    height: "100%",
    maxHeight: "100%",
  },
  columnsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    margin: "0 auto",
    gap: "10px",
    "@media (max-width: 1200px)": {
      overflowX: "scroll",
    },
  },
});

export default useStyles;
