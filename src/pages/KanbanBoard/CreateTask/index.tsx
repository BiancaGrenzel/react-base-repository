import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Button from "@mui/material/Button/Button";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useStore } from "zustand";
import { useAppointments } from "../../../hooks/useAppointments";
import { useTranslationStore } from "../../../store/translationStore";
import { CreateTaskFormValues } from "./types";
import { useUserStore } from "../../../store";
import { format } from "date-fns";

interface CreateTaskProps {
  idKanban?: string;
  getKanban: () => void;
}

export const CreateTask = ({ getKanban, idKanban }: CreateTaskProps) => {
  const [open, setOpen] = useState(false);
  const { name } = useUserStore();
  const { intl } = useStore(useTranslationStore);
  const { createCurrentUserAppointment } = useAppointments();

  const handleTriggerModal = () => {
    setOpen(!open);
  };

  const handleSubmitForm = (values: CreateTaskFormValues) => {
    // const timeStampDate = Timestamp.fromDate(new Date(values.createdDate));
    // const CreateTaskPromise = () =>
    //   createCurrentUserAppointment({
    //     ...values,
    //     createdDate: timeStampDate,
    //   });
    // toast.promise(CreateTaskPromise, {
    //   pending: intl("loading"),
    //   success: intl("createAppointmentSuccess"),
    //   error: intl("createAppointmentError"),
    // });
    getKanban();
    handleTriggerModal();
  };

  return (
    <>
      <Button variant="contained" fullWidth onClick={handleTriggerModal}>
        <AddIcon /> {intl("createTask")}
      </Button>
      <Dialog open={open} onClose={handleTriggerModal} maxWidth={"lg"}>
        <DialogTitle>{intl("createTask")}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              title: "",
              status: "todo",
              storyPoints: 0,
            }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      {intl("createdBy")}
                      <Tooltip
                        title={intl("fieldAutomaticallyFilledWithYourUsername")}
                      >
                        <InfoOutlinedIcon fontSize="inherit" />
                      </Tooltip>
                    </Box>
                  }
                  value={name}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={true}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  type="date"
                  fullWidth
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      {intl("createdDate")}
                      <Tooltip
                        title={intl("fieldAutomaticallyFilledWithTheCurrentDate")}
                      >
                        <InfoOutlinedIcon fontSize="inherit" />
                      </Tooltip>
                    </Box>
                  }
                  value={format(new Date(), "yyyy-MM-dd")}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={true}
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
                  multiline
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      {intl("status")}
                      <Tooltip
                        title={`${intl("aCreatedTaskAlwaysStartsWithTheStatus")} "${intl("todo")}"`}
                      >
                        <InfoOutlinedIcon fontSize="inherit" />
                      </Tooltip>
                    </Box>
                  }
                  value={intl("todo")}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={true}
                />
                <Field
                  as={TextField}
                  type="number"
                  margin="normal"
                  fullWidth
                  name="storyPoints"
                  label={intl("storyPoints")}
                  id="storyPoints"
                  value={values.storyPoints}
                  onChange={handleChange}
                  error={touched.storyPoints && Boolean(errors.storyPoints)}
                  helperText={touched.storyPoints && errors.storyPoints}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <DialogActions>
                  <Button
                    onClick={handleTriggerModal}
                    color="primary"
                    variant="outlined"
                  >
                    {intl("close")}
                  </Button>

                  <Tooltip
                    placement="top"
                    title={
                      !idKanban
                        ? intl(
                            "toCreateATaskFirstSelectOrCreateASprintInKanbanBoard"
                          )
                        : ""
                    }
                  >
                    <Box>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={!idKanban}
                      >
                        {intl("save")}
                      </Button>
                    </Box>
                  </Tooltip>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};
