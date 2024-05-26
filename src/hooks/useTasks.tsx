import {
  create_task,
  delete_task,
  get_task_by_creator_uid,
  update_task,
} from "../services/tasks";
import { Task } from "../types/task.types";

export const useTasks = () => {
  const createTask = async (
    title: string,
    description: string,
    isFinished: boolean
  ) => {
    try {
      await create_task(title, description, isFinished);
    } catch (error) {
      return error;
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await update_task(task);
    } catch (error) {
      return error;
    }
  };

  const getTasksByCreatorUid = async (uid: string): Promise<Task[]> => {
    try {
      const tasks = await get_task_by_creator_uid(uid);
      return tasks;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await delete_task(id);
    } catch (error) {
      return error;
    }
  };

  return { createTask, updateTask, getTasksByCreatorUid, deleteTask };
};
