import { Box, Grid, Typography } from "@mui/material";
import { useUserStore } from "../../store/userStore";
import { ActionCard } from "../../components/ActionCard";
import { useItemsCardAction } from "./hooks/useItemsCardAction";
import useStyles from "./styles";
import { useStore } from "zustand";
import { useTranslationStore } from "../../store/translationStore";

const Home = () => {
  const styles = useStyles();
  const { name } = useUserStore();
  const actions = useItemsCardAction();
  const { intl } = useStore(useTranslationStore);
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="h4" sx={styles.title}>
          &#128075; Hey {name}, {intl("whatWillYouDo")}
        </Typography>
        <Typography variant="body1" sx={styles.subtitle}>
          {intl("chooseWhatToDo")}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={12} md={4}>
            <ActionCard
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              onClick={action.onClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
