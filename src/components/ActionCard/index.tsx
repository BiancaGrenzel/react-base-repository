import { Box, Card, Typography } from "@mui/material";
import useStyles from "./styles";
import { ActionCardProps } from "./types";

export const ActionCard = ({
  description,
  icon,
  title,
  onClick,
}: ActionCardProps) => {
  const styles = useStyles();
  return (
    <Card sx={styles.container} onClick={onClick}>
      <Box sx={styles.iconContainer}>{icon}</Box>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Card>
  );
};
