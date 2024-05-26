import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import { useAuth } from "../../hooks/useAuth";
import { useTranslationStore } from "../../store/translationStore";
import { SelectLanguage } from "../SelectLanguage";
import { createMenuItems } from "./utils";
import useStyles from "./styles";
import { ThemeSwitch } from "../ThemeSwitch";

export const Menu: React.FC = () => {
  const styles = useStyles();
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { intl } = useStore(useTranslationStore);

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const menuItems = createMenuItems(
    intl,
    navigate,
    setDrawerOpen,
    handleLogout
  );

  return (
    <>
      <AppBar position="static" color="inherit" sx={styles.container}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" style={{ flexGrow: 1, display: "flex" }}>
            project.bia
          </Typography>
          <Hidden smDown>
            <ThemeSwitch />
            {menuItems.map((item, index) => (
              <Button
                color="inherit"
                key={index}
                onClick={item.onClick}
                sx={styles.itemMenu}
              >
                {item.text}
              </Button>
            ))}
            <SelectLanguage />
          </Hidden>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={styles.drawer}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItemButton key={index} onClick={item.onClick}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
            <SelectLanguage isMobile />
          </List>
        </Drawer>
      </Hidden>
    </>
  );
};
