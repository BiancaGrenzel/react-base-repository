import { Theme } from "@mui/material";

const useStyles = () => ({
  select: {
    color: (theme: Theme) => theme.palette.primary.contrastText,
    backgroundColor: (theme: Theme) => theme.palette.primary.main,
    border: "none",
    textTransform: "capitalize",
    fontSize: (theme: Theme) => {
      const size = theme.typography.body2.fontSize;
      return size ? size : "16px";
    },

    ".MuiOutlinedInput-notchedOutline": {
      borderWidth: "0px !important",
    },
    ".MuiOutlinedInput-notchedOutline:focus": {
      ".MuiOutlinedInput-notchedOutline": {
        borderWidth: "0px !important",
      },
    },
    ".MuiSvgIcon-root": {
      color: (theme: Theme) => theme.palette.primary.contrastText,
    },
  },
  selectMobile: {
    color: (theme: Theme) => theme.palette.primary.contrastText,
    backgroundColor: (theme: Theme) => theme.palette.primary.main,
    border: "none",
    fontSize: (theme: Theme) => {
      const size = theme.typography.body1.fontSize;
      return size ? size : "16px";
    },
    ".MuiOutlinedInput-notchedOutline": {
      borderWidth: "0px !important",
    },
    ".MuiOutlinedInput-notchedOutline:focus": {
      ".MuiOutlinedInput-notchedOutline": {
        borderWidth: "0px !important",
      },
    },
    ".MuiSelect-select": {
      paddingY: "8px",
    },
    ".MuiSvgIcon-root": {
      color: (theme: Theme) => theme.palette.primary.contrastText,
    },
  },
});

export default useStyles;
