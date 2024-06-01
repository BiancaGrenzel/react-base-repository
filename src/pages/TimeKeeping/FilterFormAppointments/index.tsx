import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
} from "date-fns";
import { Field, Form, Formik } from "formik";
import { useStore } from "zustand";
import { OutAppointment } from "../../../services/appointments/output/OutAppointment.types";
import { useTranslationStore } from "../../../store/translationStore";
import { useOptionsPeriodSelect } from "./hooks/useOptionsPeriodSelect";
import { FilterAppointmentsFormValues } from "./types";

interface FilterFormAppointmentsProps {
  appointments: OutAppointment[];
  setFilteredAppointments: (appointments: OutAppointment[]) => void;
}

export const FilterFormAppointments = ({
  appointments,
  setFilteredAppointments,
}: FilterFormAppointmentsProps) => {
  const { intl } = useStore(useTranslationStore);
  const optionsPeriodSelect = useOptionsPeriodSelect();

  const filterAppointments = (
    formValues: FilterAppointmentsFormValues,
    appointments: OutAppointment[]
  ): OutAppointment[] => {
    if (!formValues.description && !formValues.nmTask && !formValues.period)
      return appointments;

    return appointments.filter((appointment) => {
      const isDescriptionMatch = formValues.description
        ? appointment.description
            .toLowerCase()
            .includes(formValues.description.toLowerCase())
        : true;

      const isNmTaskMatch = formValues.nmTask
        ? Number(appointment.nmTask) === Number(formValues.nmTask)
        : true;

      let isPeriodMatch = false;
      const today = new Date();
      const milliseconds =
        appointment.createdDate.seconds * 1000 +
        appointment.createdDate.nanoseconds / 1000000;
      const createdDate = new Date(milliseconds);

      switch (formValues.period) {
        case "today":
          isPeriodMatch = differenceInDays(today, createdDate) === 0;
          break;
        case "lastWeek":
          isPeriodMatch = differenceInWeeks(today, createdDate) === 0;
          break;
        case "lastMonth":
          isPeriodMatch = differenceInMonths(today, createdDate) <= 1;
          break;
        case "lastSemester":
          isPeriodMatch = differenceInMonths(today, createdDate) <= 6;
          break;
        case "all":
          isPeriodMatch = true;
          break;
      }

      return isDescriptionMatch && isNmTaskMatch && isPeriodMatch;
    });
  };

  const onSubmit = (formValues: FilterAppointmentsFormValues) => {
    const appoint = filterAppointments(formValues, appointments);
    setFilteredAppointments(appoint);
  };

  const clearForm = () => {
    setFilteredAppointments(appointments);
  };

  return (
    <Formik
      initialValues={{
        description: "",
        period: "all",
        nmTask: "",
      }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form onSubmit={handleSubmit}>
          <Grid item container xs={12} columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} md={3}>
              <Field
                id="nmTask"
                as={TextField}
                size="small"
                label={intl("taskNumber")}
                name="nmTask"
                fullWidth
                value={values.nmTask}
                onChange={handleChange}
                error={touched.nmTask && Boolean(errors.nmTask)}
                type="string"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Field
                id="description"
                as={TextField}
                size="small"
                label={intl("description")}
                name="description"
                fullWidth
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Field
                id="period"
                as={Select}
                size="small"
                name="period"
                fullWidth
                value={values.period || "all"}
                onChange={handleChange}
                error={touched.period && Boolean(errors.period)}
                type="date"
                children={optionsPeriodSelect.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              />
            </Grid>
            <Grid item xs={12} md={1.5}>
              <Button
                variant="outlined"
                fullWidth
                type="reset"
                onClick={clearForm}
              >
                <GridCloseIcon />
                {intl("clear")}
              </Button>
            </Grid>
            <Grid item xs={12} md={1.5}>
              <Button variant="outlined" fullWidth type="submit">
                <SearchIcon />
                {intl("search")}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
