import { Theme } from "@mui/material";

const useStyles = (isChecked: boolean) => ({
  container: {
    minHeight: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: (theme: Theme) =>
      `1px solid ${theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[700]}`,
    padding: (theme: Theme) => theme.spacing(2),
    backgroundColor: (theme: Theme) =>
      isChecked
        ? theme.palette.background.default
        : theme.palette.background.paper,
    color: (theme: Theme) => (isChecked ? theme.palette.grey[500] : "inherit"),
  },
  checkboxContainer: {
    display: "flex",
    gap: (theme: Theme) => theme.spacing(2),
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    textDecoration: isChecked ? "line-through" : "none",
  },
  descriptionContainer: {
    marginLeft: (theme: Theme) => theme.spacing(1.5),
  },
});

export default useStyles;
