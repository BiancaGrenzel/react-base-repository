import React from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu";
import { Box } from "@mui/material";
import useStyles from "./styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthenticatedLayout: React.FC = () => {
  const styles = useStyles();

  return (
    <Box>
      <Menu />
      <Box sx={styles.container}>
        <Outlet />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Box>
    </Box>
  );
};

export default AuthenticatedLayout;
