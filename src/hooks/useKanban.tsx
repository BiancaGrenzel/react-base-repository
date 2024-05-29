import { get_kanban_by_date, update_task_status } from "../services/kanban";
import { TKanban } from "../types/kanban.types";

export const useKanban = () => {
  const getKanbanByDate = async (): Promise<TKanban> => {
    try {
      const kanban = await get_kanban_by_date();
      return kanban as TKanban;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar consultas de apontamentos do usuário");
    }
  };

  const updateTaskStatusKanban = async (
    kanbanId: string,
    taskId: string,
    status: string
  ): Promise<void> => {
    try {
      console.log(kanbanId, taskId, status)
      if (!kanbanId || !taskId || !status) throw new Error("Dados inválidos");
      await update_task_status(kanbanId, taskId, status);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o status da tarefa");
    }
  };

  return { getKanbanByDate, updateTaskStatusKanban };
};
