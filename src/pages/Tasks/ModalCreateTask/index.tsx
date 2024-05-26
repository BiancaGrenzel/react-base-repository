import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { useStore } from "zustand";
import { ModalCreateTaskProps, TaskFormValues } from "./types";
import { useTranslationStore } from "../../../store/translationStore";
import { useTasks } from "../../../hooks/useTasks";

const ModalCreateTask = ({
  open,
  handleClose,
  refetchTasks,
}: ModalCreateTaskProps) => {
  const { intl } = useStore(useTranslationStore);
  const { createTask } = useTasks();

  const handleSubmitForm = async (
    values: TaskFormValues,
    { setSubmitting, setErrors }: FormikHelpers<TaskFormValues>
  ) => {
    try {
      await createTask(values.title, values.description, false);
      handleClose();
      refetchTasks();
    } catch (error) {
      toast.error(intl("createTaskError"));
      setErrors({
        title: intl("titleInputError"),
        description: intl("descriptionInputError"),
      });
    }
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{intl("createTask")}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ title: "", description: "" }}
          onSubmit={handleSubmitForm}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                id="title"
                label={intl("title")}
                name="title"
                autoFocus
                value={values.title}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                size="small"
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {intl("createTask")}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateTask;
