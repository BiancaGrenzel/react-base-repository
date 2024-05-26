export const createMenuItems = (
  intl: (key: string) => string,
  navigate: (path: string) => void,
  setDrawerOpen: (open: boolean) => void,
  handleLogout: () => void
) => [
  {
    text: intl("home"),
    onClick: () => {
      navigate("/");
      setDrawerOpen(false);
    },
  },
  {
    text: intl("profile"),
    onClick: () => {
      navigate("/profile");
      setDrawerOpen(false);
    },
  },
  { text: intl('exit'), onClick: handleLogout },
];
