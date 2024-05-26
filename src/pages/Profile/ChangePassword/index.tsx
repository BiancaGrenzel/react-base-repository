import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useStore } from "zustand";
import { useTranslationStore } from "../../../store/translationStore";
import validateEditUser from "./validate";
import { ChangePasswordFormValues } from "./types";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useUserStore } from "../../../store/userStore";

const ChangePassword = () => {
  const { intl } = useStore(useTranslationStore);
  const { changePassword } = useAuth();
  const { email } = useUserStore();

  const handleSubmitForm = async (
    values: ChangePasswordFormValues,
    { setSubmitting, setErrors }: FormikHelpers<ChangePasswordFormValues>
  ) => {
    try {
      if (!email) return;
      const updatePromise = () =>
        changePassword(email, values.password, values.newPassword);

      toast.promise(updatePromise, {
        pending: intl("loading"),
        success: intl("userEditedSuccess"),
        error: intl("userEditedError"),
      });
    } catch (error) {
      setErrors({
        password: intl("emailAlreadyInUse"),
        newPassword: intl("phoneAlreadyInUse"),
      });
    }
    setSubmitting(false);
  };

  return (
    <>
      <Typography variant="h6" mb={2}>
        {intl("password")}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Formik
        initialValues={{
          password: "",
          newPassword: "",
        }}
        validationSchema={validateEditUser}
        onSubmit={handleSubmitForm}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  id="password"
                  label={intl("oldPassword")}
                  type="password"
                  name="password"
                  autoFocus
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="newPassword"
                  label={intl("newPassword")}
                  type="password"
                  id="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button type="submit" fullWidth variant="contained">
                  {intl("save")}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePassword;
