import {
  Timestamp,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { InUpdateTaskStatus } from "./input/InUpdateTaskStatus.types";
import { InGetKanbanByDate } from "./input/InGetKanbanByDate.types";
import { OutKanban } from "./output/OutKanban.types";
import { OutKanbanColumn } from "./output/OutKanbanColumn.types";
import { OutKanbanStatus } from "./output/OutKanbanStatus.types";
import { OutKanbanTask } from "./output/OutKanbanTask.types";

const refKanbanCollection = collection(db, "kanban");

export const get_kanban_by_date = async ({ date }: InGetKanbanByDate) => {
  const currentTimestamp = date || Timestamp.now();

  const kanbanQuery = query(
    refKanbanCollection,
    where("startDate", "<=", currentTimestamp),
    where("finalDate", ">=", currentTimestamp),
    orderBy("startDate")
  );

  const querySnapshot = await getDocs(kanbanQuery);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const kanban = doc.data() as OutKanban;
    kanban.id = doc.id;

    const columnsSnapshot = await getDocs(collection(doc.ref, "columns"));
    const statusSnapshot = await getDocs(collection(doc.ref, "status"));
    const tasksSnapshot = await getDocs(collection(doc.ref, "tasks"));

    kanban.columns = columnsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as OutKanbanColumn
    );
    kanban.status = statusSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as OutKanbanStatus
    );
    kanban.tasks = tasksSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as OutKanbanTask
    );

    return kanban;
  } else {
    throw new Error("No kanban found for the current date");
  }
};

export const update_task_status = async ({
  kanbanId,
  taskId,
  status,
}: InUpdateTaskStatus): Promise<void> => {
  const kanbanRef = doc(refKanbanCollection, kanbanId);
  const taskRef = doc(collection(kanbanRef, "tasks"), taskId);

  await updateDoc(taskRef, { status: status });
};
