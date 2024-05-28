import { useStore } from "zustand";
import { useTranslationStore } from "../../../store/translationStore";
import { GridColDef } from "@mui/x-data-grid";
import { formatTimestampDate } from "../../../utils/formatTimestampDate";

export const useAppointmentColumns = () => {
  const { intl } = useStore(useTranslationStore);

  const columns: GridColDef[] = [
    { field: "nmTask", headerName: intl("task"), minWidth: 200, flex: 1 },
    {
      field: "description",
      headerName: intl("description"),
      minWidth: 600,
      flex: 1,
    },
    {
      field: "qtHours",
      headerName: intl("hoursQuantity"),
      type: "number",
      minWidth: 110,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdDate",
      headerName: intl("date"),
      width: 120,
      align: "center",
      headerAlign: "center",
      valueFormatter: (params) => {
        return formatTimestampDate(params.value);
      },
    },
  ];

  return columns;
};
