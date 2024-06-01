import { Timestamp } from "firebase/firestore";

export type TaskKanbanCategory =
  | "Design"
  | "Front-end"
  | "Back-end"
  | "DevOps"
  | "QA"
  | "Management"
  | "Other";

export type TaskKanbanSprint =
  | "Sprint 1"
  | "Sprint 2"
  | "Sprint 3"
  | "Sprint 4";

export type Task = {
  assignedTo?: string;
  createdBy: string;
  id: string;
  title: string;
  status: string;
  dtCreated?: Timestamp;
  dtCompleted?: Timestamp;
  description?: string;
  priority?: string;
  sprint?: string;
  storyPoints?: number;
  category?: TaskKanbanCategory;
};
