import {
  create_task,
  delete_task,
  get_task_by_creator_uid,
  update_task,
} from "../services/tasks";
import { InCreateTask } from "../services/tasks/input/InCreateTask";
import { InDeleteTask } from "../services/tasks/input/InDeleteTask";
import { InGetTaskByCreatorUid } from "../services/tasks/input/InGetTaskByCreatorUid";
import { InUpdateTask } from "../services/tasks/input/InUpdateTask";
import { OutTask } from "../services/tasks/output/OutTask.types";

export const useTasks = () => {
  const createTask = async (task: InCreateTask) => {
    try {
      await create_task(task);
    } catch (error) {
      return error;
    }
  };

  const updateTask = async (task: InUpdateTask) => {
    try {
      await update_task(task);
    } catch (error) {
      return error;
    }
  };

  const getTasksByCreatorUid = async ({
    uid,
  }: InGetTaskByCreatorUid): Promise<OutTask[]> => {
    try {
      const tasks = await get_task_by_creator_uid({ uid });
      return tasks;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const deleteTask = async ({ id }: InDeleteTask) => {
    try {
      await delete_task({ id });
    } catch (error) {
      return error;
    }
  };

  return { createTask, updateTask, getTasksByCreatorUid, deleteTask };
};
