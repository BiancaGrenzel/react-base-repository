import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h1" component="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="subtitle1">Página não encontrada!</Typography>
      <Button variant="text" onClick={handleBack}>
        Voltar
      </Button>
    </Box>
  );
};

export default NotFound;
