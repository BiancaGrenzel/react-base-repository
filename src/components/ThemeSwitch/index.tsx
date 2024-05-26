import Switch from "@mui/material/Switch/Switch";
import React from "react";
import { useMuiTheme } from "../../hooks/useMuiTheme";

export function ThemeSwitch() {
  const { setMuiTheme } = useMuiTheme();
  const [isSwitchChecked, setIsSwitchChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwitchChecked(event.target.checked);
    setMuiTheme(event.target.checked ? "dark" : "light");
  };

  return (
    <Switch
      checked={isSwitchChecked}
      onChange={handleChange}
      name="checkedA"
      inputProps={{ "aria-label": "secondary checkbox" }}
    />
  );
}
