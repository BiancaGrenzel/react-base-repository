import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { InCreateTask } from "./input/InCreateTask";
import { InDeleteTask } from "./input/InDeleteTask";
import { InGetTaskByCreatorUid } from "./input/InGetTaskByCreatorUid";
import { InUpdateTask } from "./input/InUpdateTask";
import { OutTask } from "./output/OutTask.types";

const refUsersCollection = collection(db, "tasks");

export const create_task = async ({
  title,
  description,
  isFinished,
}: InCreateTask): Promise<void> => {
  const user = auth.currentUser;
  const date = serverTimestamp();
  await addDoc(refUsersCollection, {
    title,
    description,
    isFinished,
    createdDate: date,
    finishedDate: null,
    creator_uid: user?.uid,
  });
};

export const update_task = async (task: InUpdateTask): Promise<void> => {
  const { id, title, description, isFinished } = task;
  const taskDoc = doc(db, "tasks", id);

  const updatedFields: Partial<{
    title: string;
    description: string;
    isFinished: boolean;
  }> = {};
  if (title) updatedFields.title = title;
  if (description) updatedFields.description = description;
  if (isFinished !== null) updatedFields.isFinished = isFinished;

  await updateDoc(taskDoc, updatedFields);
};

export const get_task_by_creator_uid = async ({
  uid,
}: InGetTaskByCreatorUid): Promise<OutTask[]> => {
  const q = query(refUsersCollection, where("creator_uid", "==", uid));

  const querySnapshot = await getDocs(q);
  const tasks: OutTask[] = [];
  querySnapshot.forEach((doc) => {
    const task = doc.data() as OutTask;
    task.id = doc.id;
    tasks.push(task);
  });

  return tasks;
};

export const delete_task = async ({ id }: InDeleteTask): Promise<void> => {
  const taskDoc = doc(db, "tasks", id);
  await deleteDoc(taskDoc);
};
