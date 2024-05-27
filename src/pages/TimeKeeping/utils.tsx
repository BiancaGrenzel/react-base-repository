import { GridColDef } from "@mui/x-data-grid";
import { formatTimestampDate } from "../../utils/formatTimestampDate";

export const columns: GridColDef[] = [
  { field: "nmTask", headerName: "Task", width: 200 },
  { field: "description", headerName: "Description", width: 600 },
  {
    field: "qtHours",
    headerName: "Hours Quantity",
    type: "number",
    width: 110,
    align: "center",
  },
  {
    field: "createdDate",
    headerName: "Data",
    width: 280,
    valueFormatter: (params) => {
      return formatTimestampDate(params.value);
    },
  },
];
