import { get_kanban_by_date, update_task_status } from "../services/kanban";
import { InUpdateTaskStatus } from "../services/kanban/input/InUpdateTaskStatus.types";
import { OutKanban } from "../services/kanban/output/OutKanban.types";

export const useKanban = () => {
  const getKanbanByDate = async (): Promise<OutKanban> => {
    try {
      const kanban = await get_kanban_by_date({});
      return kanban as OutKanban;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar consultas de apontamentos do usuário");
    }
  };

  const updateTaskStatusKanban = async ({
    kanbanId,
    taskId,
    status,
  }: InUpdateTaskStatus): Promise<void> => {
    try {
      if (!kanbanId || !taskId || !status) throw new Error("Dados inválidos");
      await update_task_status({ kanbanId, taskId, status });
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o status da tarefa");
    }
  };

  return { getKanbanByDate, updateTaskStatusKanban };
};
