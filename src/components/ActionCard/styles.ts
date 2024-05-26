import { Theme } from "@mui/material";

const useStyles = () => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: (theme: Theme) => theme.spacing(2),
    background: (theme: Theme) => theme.palette.background.paper,
    borderRadius: (theme: Theme) => theme.spacing(1),
    padding: (theme: Theme) => theme.spacing(4),
    border: (theme: Theme) =>
      `1px solid ${theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[700]}`,
    cursor: "pointer",
    "&:hover": {
      border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
      transition: "border 0.3s",
    },
    minHeight: "200px",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: (theme: Theme) => theme.spacing(2),
    borderRadius: (theme: Theme) => theme.spacing(1),
    color: (theme: Theme) => theme.palette.primary.main,
    border: (theme: Theme) =>
      `1px solid ${theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[700]}`,
    width: "28px",
  },
});

export default useStyles;
