import { useThemeStore } from "../store/themeStore";
import { darkTheme } from "../theme/darkTheme";
import { lightTheme } from "../theme/lightTheme";

export const useMuiTheme = () => {
  const { setTheme, theme } = useThemeStore();

  const getMuiTheme = () => {
    const themeLocalStorage = localStorage.getItem("theme");
    if (themeLocalStorage) {
      if (themeLocalStorage === "dark") {
        return darkTheme;
      } else {
        return lightTheme;
      }
    }

    if (theme === "dark") {
      return darkTheme;
    } else {
      return lightTheme;
    }
  };

  const setMuiTheme = (theme: "dark" | "light") => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  return { getMuiTheme, setMuiTheme };
};
