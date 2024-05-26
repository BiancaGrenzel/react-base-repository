import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";

import { useStore } from "zustand";
import { useTranslationStore } from "../../store/translationStore";
import validateRecoverPassword from "./validate";
import useStyles from "./styles";
import { RecoverPasswordFormValues } from "./types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RecoverPassword = () => {
  const styles = useStyles();
  const { intl } = useStore(useTranslationStore);
  const navigate = useNavigate();
  const { recoverPassword } = useAuth();

  const handleSubmitForm = async (
    values: RecoverPasswordFormValues,
    { setSubmitting, setErrors }: FormikHelpers<RecoverPasswordFormValues>
  ) => {
    try {
      const recoverPasswordPromise = () => recoverPassword(values.email);
      toast.promise(recoverPasswordPromise, {
        pending: intl("loading"),
        success: intl("recoverPasswordEmailSentSuccess"),
        error: intl("recoverPasswordEmailSentError"),
      });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setErrors({
        email: intl("emailInputError"),
      });
    }
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.container}>
        <Typography component="h1" variant="h5">
          {intl("recoverPassword")}
        </Typography>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validateRecoverPassword}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {intl("send")}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default RecoverPassword;
