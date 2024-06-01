import { Timestamp } from "firebase/firestore";

export type InCreateAppointment = {
  nmTask: number;
  description: string;
  qtHours: number;
  createdDate: Timestamp;
};
