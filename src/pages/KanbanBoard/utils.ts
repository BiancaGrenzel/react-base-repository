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

export const mockData: Task[] = [
  {
    createdBy: "1",
    id: "1",
    title: "delectus aut autem",
    status: "todo",
  },
  {
    createdBy: "1",
    id: "2",
    title: "quis ut nam facilis et officia qui",
    status: "done",
  },
  {
    createdBy: "1",
    id: "3",
    title: "fugiat veniam minus",
    status: "inReview",
  },
  {
    createdBy: "1",
    id: "4",
    title: "et porro tempora",
    status: "backlog",
  },
];
