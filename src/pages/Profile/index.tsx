import { Card, Grid, Tab, Tabs } from "@mui/material";
import useStyles from "./styles";
import MyProfile from "./MyProfile";
import ChangePassword from "./ChangePassword";
import { SyntheticEvent, useState } from "react";
import { useStore } from "zustand";
import { useTranslationStore } from "../../store";
import useMediaQuery from "@mui/material/useMediaQuery";

const Profile = () => {
  const styles = useStyles();
  const [value, setValue] = useState(0);
  const { intl } = useStore(useTranslationStore);
  const matches = useMediaQuery("(min-width:400px) and (max-width:900px)");

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card sx={styles.profileContainer}>
      <Grid container columnSpacing={4}>
        <Grid item xs={12} md={3}>
          <Tabs
            value={value}
            onChange={handleChange}
            orientation={matches ? "horizontal" : "vertical"}
            sx={styles.tabs}
          >
            <Tab label={intl("myProfile")} sx={styles.tab} />
            <Tab label={intl("changePassword")} sx={styles.tab} />
          </Tabs>
        </Grid>
        <Grid item xs={12} md={9}>
          {value === 0 && <MyProfile />}
          {value === 1 && <ChangePassword />}
        </Grid>
      </Grid>
    </Card>
  );
};

export default Profile;
