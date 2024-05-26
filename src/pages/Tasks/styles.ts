import { Theme } from "@mui/material";

const useStyles = () => ({
  container: {
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
  tasksContainer: {
    maxHeight: "480px",
    height: "100%",
    overflowY: "scroll",
    marginTop: (theme: Theme) => theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    gap: (theme: Theme) => theme.spacing(2),
    paddingRight: (theme: Theme) => theme.spacing(2),
  },
});

export default useStyles;
