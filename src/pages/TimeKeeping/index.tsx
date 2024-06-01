import { Card, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useAppointments } from "../../hooks/useAppointments";
import { OutAppointment } from "../../services/appointments/output/OutAppointment.types";
import { useTranslationStore } from "../../store";
import { CreateAppointment } from "./CreateAppointment";
import { FilterFormAppointments } from "./FilterFormAppointments";
import { useAppointmentColumns } from "./hooks/useAppointmentColumns";

export const TimeKeeping = () => {
  const [appointments, setAppointments] = useState<OutAppointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    OutAppointment[]
  >([]);
  const totalHours = filteredAppointments.reduce(
    (total, appointment) => total + appointment.qtHours,
    0
  );
  const [isLoading, setIsLoading] = useState(false);
  const { getCurrentUserAppointments } = useAppointments();
  const columns = useAppointmentColumns();
  const { intl } = useStore(useTranslationStore);

  const getAppointments = async () => {
    setIsLoading(true);
    await getCurrentUserAppointments()
      .then((appointments) => {
        setAppointments(appointments);
        setFilteredAppointments(appointments);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Card>
      <Grid container columnSpacing={2} rowSpacing={4} padding={4}>
        <Grid item xs={12} md={9.5}>
          <Typography variant="h6">{intl("appointments")}</Typography>
        </Grid>
        <Grid item xs={12} md={2.5}>
          <CreateAppointment getAppointments={getAppointments} />
        </Grid>
        <Grid item xs={12}>
          <FilterFormAppointments
            appointments={appointments}
            setFilteredAppointments={setFilteredAppointments}
          />
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            columns={columns}
            rows={filteredAppointments}
            loading={isLoading}
            autoHeight
            sortModel={[
              {
                field: "createdDate",
                sort: "desc",
              },
            ]}
            localeText={{
              noRowsLabel: "Nenhum apontamento de horas encontrado.",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          Quantidade Total de Horas: {totalHours}
        </Grid>
      </Grid>
    </Card>
  );
};
