import { Theme } from "@mui/material";

const useStyles = () => ({
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    marginTop: (theme: Theme) => theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    gap: (theme: Theme) => theme.spacing(6),
  },
  title: {
    fontWeight: "bold",
    color: (theme: Theme) => theme.palette.text.primary,
  },
  subtitle: {
    color: (theme: Theme) => theme.palette.text.primary,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: (theme: Theme) => theme.spacing(2),
    textAlign: "center",
  },
});

export default useStyles;
