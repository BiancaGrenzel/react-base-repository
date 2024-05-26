import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

import { useAuth } from "../../hooks/useAuth";
import validateRegister from "./validate";
import { RegisterFormValues } from "./types";
import { toast } from "react-toastify";
import { useStore } from "zustand";
import { useTranslationStore } from "../../store/translationStore";
import useStyles from "./styles";

const Register = () => {
  const styles = useStyles();
  const { signUp } = useAuth();
  const { intl } = useStore(useTranslationStore);
  const navigate = useNavigate();

  const handleSubmitForm = async (
    values: RegisterFormValues,
    { setSubmitting, setErrors }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      const signUpPromise = () =>
        signUp(
          values.email,
          values.password,
          values.birthDate,
          values.phone,
          values.name
        );

      toast.promise(signUpPromise, {
        pending: "Carregando...",
        success: "Usuário criado com sucesso!",
        error: "Erro ao cadastrar usuário!",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrors({
        email: "Falha no cadastro",
        password: "Verifique suas credenciais",
      });
    }
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.container}>
        <Typography component="h1" variant="h5">
          {intl("register")}
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
            birthDate: "",
            phone: "",
            name: "",
          }}
          validationSchema={validateRegister}
          onSubmit={handleSubmitForm}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                id="name"
                label={intl("name")}
                name="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                id="email"
                label={intl("email")}
                name="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="email@gmail.com"
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="password"
                label={intl("password")}
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="birthDate"
                label={intl("birthDate")}
                type="date"
                id="birthDate"
                value={values.birthDate}
                onChange={handleChange}
                error={touched.birthDate && Boolean(errors.birthDate)}
                helperText={touched.birthDate && errors.birthDate}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="phone"
                label={intl("phone")}
                type="string"
                id="phone"
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {intl("save")}
              </Button>
              <Typography variant="body2" align="center">
                {intl("haveAnAccount")} <a href="/login">{intl("doSignIn")}</a>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Register;
