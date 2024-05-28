import { Theme, darken } from "@mui/material";

const taskList = (isDragginOver: boolean) => ({
  padding: (theme: Theme) => theme.spacing(1),
  transition: "background-color 0.2s ease",
  backgroundColor: (theme: Theme) =>
    isDragginOver
      ? darken(theme.palette.background.default, 0.1)
      : darken(theme.palette.background.default, 0.05),
  minHeight: "calc(100vh - 310px)",
  gap: (theme: Theme) => theme.spacing(1),
  display: "flex",
  flexDirection: "column",
});

const useStyles = () => ({
  container: {
    width: "100%",
    minWidth: "260px",
    overflowY: "scroll",
    "-ms-overflow-style": "none",
    scrollbarWidth: "none",
    minHeight: "100%",
    boxShadow: "none",
    border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
  },
  title: {
    padding: (theme: Theme) => theme.spacing(2),
    textAlign: "center",
  },
  taskList: taskList,
});

export default useStyles;
