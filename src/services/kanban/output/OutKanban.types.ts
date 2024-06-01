import { Timestamp } from "firebase/firestore";
import { OutKanbanStatus } from "./OutKanbanStatus.types";
import { OutKanbanColumn } from "./OutKanbanColumn.types";
import { OutKanbanTask } from "./OutKanbanTask.types";

export type OutKanban = {
  id: string;
  startDate: Timestamp;
  finalDate: Timestamp;
  status: OutKanbanStatus[];
  columns: OutKanbanColumn[];
  tasks: OutKanbanTask[];
};
