import { Timestamp } from "firebase/firestore";

export type TAppointment = {
  id: string;
  uid: string;
  description: string;
  qtHours: number;
  createdDate: Timestamp;
  nmTask: number;
};

export type TAppoinmentCreate = {
  nmTask: number;
  description: string;
  qtHours: number;
  createdDate: Timestamp;
};
