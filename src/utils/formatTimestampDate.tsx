import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

export const formatTimestampDate = (timestamp: Timestamp) => {
  const milliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  const date = new Date(milliseconds);
  const formattedDate = format(date, "dd/MM/yyyy");
  return formattedDate;
};
