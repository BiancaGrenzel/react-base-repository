import { useNavigate } from "react-router-dom";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";

import { toast } from "react-toastify";
import { useStore } from "zustand";
import { useAuth } from "../../hooks/useAuth";
import { useTranslationStore } from "../../store/translationStore";
import { LoginFormValues } from "./types";
import validateLogin from "./validate";
import useStyles from "./styles";

const Login = () => {
  const styles = useStyles();
  const { intl } = useStore(useTranslationStore);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmitForm = async (
    values: LoginFormValues,
    { setSubmitting, setErrors }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const signInPromise = () => signIn(values.email, values.password);
      toast.promise(signInPromise, {
        pending: intl("loading"),
        success: intl("loginSuccess"),
        error: intl("loginError"),
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrors({
        email: intl("emailInputError"),
        password: intl("passwordInputError"),
      });
    }
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.container}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validateLogin}
          onSubmit={handleSubmitForm}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                id="email"
                label={intl("email")}
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                size="small"
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="password"
                label={intl("password")}
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                size="small"
              />

              <Typography variant="body2" align="left">
                <a href="/recover-password">{intl("forgotYourPassword")}</a>
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {intl("signIn")}
              </Button>
              <Typography variant="body2" align="center">
                {intl("dontHaveAnAccount")}{" "}
                <a href="/register">{intl("signUp")}</a>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
