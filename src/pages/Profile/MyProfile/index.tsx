import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useStore } from "zustand";
import { useTranslationStore } from "../../../store/translationStore";
import { useUserStore } from "../../../store/userStore";
import validateEditUser from "./validate";
import { toast } from "react-toastify";
import { useUser } from "../../../hooks/useUser";
import { InUpdateUser } from "../../../services/users/input/InUpdateUser.types";

const MyProfile = () => {
  const { name, birthDate, email, phone, uid } = useUserStore();
  const { intl } = useStore(useTranslationStore);
  const { updateUser } = useUser();

  const initialValues: InUpdateUser = {
    name: name || "",
    birthDate: birthDate || "",
    email: email || "",
    phone: phone || "",
    uid: uid,
  };

  const handleSubmitForm = async (
    values: typeof initialValues,
    { setSubmitting, setErrors }: FormikHelpers<InUpdateUser>
  ) => {
    try {
      const updatePromise = () => updateUser(values);

      toast.promise(updatePromise, {
        pending: intl("loading"),
        success: intl("userEditedSuccess"),
        error: intl("userEditedError"),
      });
    } catch (error) {
      setErrors({
        email: intl("emailAlreadyInUse"),
        phone: intl("phoneAlreadyInUse"),
      });
    }
    setSubmitting(false);
  };
  return (
    <>
      <Typography variant="h6" mb={2}>
        {intl("profile")}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Formik
        initialValues={initialValues}
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
              </Grid>
              <Grid item xs={12} md={6}>
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
              </Grid>
              <Grid item xs={12} md={6}>
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
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
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

export default MyProfile;
