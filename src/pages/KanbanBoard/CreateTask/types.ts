import { Timestamp } from "firebase/firestore";

export type CreateTaskFormValues = {
  assigntedTo?: string;
  description?: string;
  dtCompleted?: Timestamp;
  createdBy?: string;
  dtCreated?: Timestamp;
  status?: string;
  storyPoints?: number;
  title: string;
};
