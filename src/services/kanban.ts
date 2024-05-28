import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  TKanban,
  TKanbanColumn,
  TKanbanStatus,
  TKanbanTask,
} from "../types/kanban.types";

const refKanbanCollection = collection(db, "kanban");

export const get_kanban_by_date = async (date?: Timestamp) => {
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
    const kanban = doc.data() as TKanban;
    kanban.id = doc.id;

    const columnsSnapshot = await getDocs(collection(doc.ref, "columns"));
    const statusSnapshot = await getDocs(collection(doc.ref, "status"));
    const tasksSnapshot = await getDocs(collection(doc.ref, "tasks"));

    kanban.columns = columnsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as TKanbanColumn
    );
    kanban.status = statusSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as TKanbanStatus
    );
    kanban.tasks = tasksSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as TKanbanTask
    );

    return kanban;
  } else {
    throw new Error("No kanban found for the current date");
  }
};
