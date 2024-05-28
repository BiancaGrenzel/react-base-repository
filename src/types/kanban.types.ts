import { Timestamp } from "firebase/firestore";

export type TKanban = {
  id: string;
  startDate: Timestamp;
  finalDate: Timestamp;
  status: TKanbanStatus[];
  columns: TKanbanColumn[];
  tasks: TKanbanTask[];
};

export type TKanbanStatus = {
  id: string;
  name: string;
};

export type TKanbanColumn = {
  id: string;
  name: string;
};

export type TKanbanTask = {
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
