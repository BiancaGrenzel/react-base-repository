import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { Task } from "../types/task.types";
import { auth } from "./firebase";

const refUsersCollection = collection(db, "tasks");

export const create_task = async (
  title: string,
  description: string,
  isFinished: boolean
) => {
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

export const update_task = async (task: Task) => {
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

export const get_task_by_creator_uid = async (uid: string) => {
  const q = query(refUsersCollection, where("creator_uid", "==", uid));

  const querySnapshot = await getDocs(q);
  const tasks: Task[] = [];
  querySnapshot.forEach((doc) => {
    const task = doc.data() as Task;
    task.id = doc.id;
    tasks.push(task);
  });

  return tasks;
};

export const delete_task = async (id: string) => {
  const taskDoc = doc(db, "tasks", id);
  await deleteDoc(taskDoc);
};
