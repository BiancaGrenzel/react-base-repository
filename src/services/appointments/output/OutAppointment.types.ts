import { Timestamp } from "firebase/firestore";

export type OutAppointment = {
  id: string;
  uid: string;
  description: string;
  qtHours: number;
  createdDate: Timestamp;
  nmTask: number;
};
