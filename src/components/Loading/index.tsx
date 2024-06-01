import { Box, CircularProgress } from "@mui/material";
import useStyles from "./styles";

export const Loading = () => {
  const styles = useStyles();
  return (
    <Box sx={styles.container}>
      <CircularProgress />
    </Box>
  );
};
