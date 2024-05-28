import { get_kanban_by_date } from "../services/kanban";
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

  return { getKanbanByDate };
};
