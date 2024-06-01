import { Timestamp } from "firebase/firestore";

export type OutKanbanTask = {
  id: string;
  assignedTo?: string;
  createdBy: string;
  description?: string;
  dtCompleted?: Timestamp;
  dtCreated?: Timestamp;
  status: string;
  storyPoints?: number;
  title: string;
};
