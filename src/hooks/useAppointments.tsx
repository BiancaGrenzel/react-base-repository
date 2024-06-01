import {
  create_current_user_appointment,
  get_current_user_appointments,
} from "../services/appointments";
import { InCreateAppointment } from "../services/appointments/input/InCreateAppointment.types";
import { OutAppointment } from "../services/appointments/output/OutAppointment.types";

export const useAppointments = () => {
  const getCurrentUserAppointments = async (): Promise<OutAppointment[]> => {
    try {
      const appointments = await get_current_user_appointments();
      return appointments as OutAppointment[];
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar consultas de apontamentos do usuário");
    }
  };

  const createCurrentUserAppointment = async (
    values: InCreateAppointment
  ): Promise<void> => {
    try {
      await create_current_user_appointment(values);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar consulta de apontamento do usuário");
    }
  };

  return { getCurrentUserAppointments, createCurrentUserAppointment };
};
