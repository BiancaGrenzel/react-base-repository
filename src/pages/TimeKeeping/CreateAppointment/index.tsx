import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useStore } from "zustand";
import { useAppointments } from "../../../hooks/useAppointments";
import { useTranslationStore } from "../../../store/translationStore";
import { CreateAppointmentFormValues } from "./types";
import { Timestamp } from "@firebase/firestore";
import { toast } from "react-toastify";

interface CreateAppointmentProps {
  getAppointments: () => void;
}

export const CreateAppointment = ({
  getAppointments,
}: CreateAppointmentProps) => {
  const [open, setOpen] = useState(false);
  const { intl } = useStore(useTranslationStore);
  const { createCurrentUserAppointment } = useAppointments();

  const handleTriggerModal = () => {
    setOpen(!open);
  };

  const handleSubmitForm = (values: CreateAppointmentFormValues) => {
    console.log(values.createdDate);
    const timeStampDate = Timestamp.fromDate(new Date(values.createdDate));
    const createAppointmentPromise = () =>
      createCurrentUserAppointment({
        ...values,
        createdDate: timeStampDate,
      });

    toast.promise(createAppointmentPromise, {
      pending: intl("loading"),
      success: intl("createAppointmentSuccess"),
      error: intl("createAppointmentError"),
    });
    getAppointments();
    handleTriggerModal();
  };

  return (
    <>
      <Button variant="contained" fullWidth onClick={handleTriggerModal}>
        <AddIcon /> {intl("addAppointent")}
      </Button>
      <Dialog open={open} onClose={handleTriggerModal}>
        <DialogTitle>{intl("createAppointment")}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              createdDate: new Date(),
              description: "",
              nmTask: 0,
              qtHours: 0,
            }}
            onSubmit={handleSubmitForm}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  as={TextField}
                  margin="normal"
                  type="date"
                  fullWidth
                  id="createdDate"
                  label={intl("date")}
                  name="createdDate"
                  autoFocus
                  value={values.createdDate}
                  onChange={handleChange}
                  error={touched.createdDate && Boolean(errors.createdDate)}
                  helperText={touched.createdDate && errors.createdDate}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="description"
                  label={intl("description")}
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="nmTask"
                  type="number"
                  label={intl("taskNumber")}
                  id="nmTask"
                  value={values.nmTask}
                  onChange={handleChange}
                  error={touched.nmTask && Boolean(errors.nmTask)}
                  helperText={touched.nmTask && errors.nmTask}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="qtHours"
                  type="number"
                  label={intl("hoursQuantity")}
                  id="qtHours"
                  value={values.qtHours}
                  onChange={handleChange}
                  error={touched.qtHours && Boolean(errors.qtHours)}
                  helperText={touched.qtHours && errors.qtHours}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {intl("save")}
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};
