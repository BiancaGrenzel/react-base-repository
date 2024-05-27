import {
  create_current_user_appointment,
  get_current_user_appointments,
} from "../services/appointments";
import { TAppoinmentCreate, TAppointment } from "../types/appointment.types";

export const useAppointments = () => {
  const getCurrentUserAppointments = async (): Promise<TAppointment[]> => {
    try {
      const appointments = await get_current_user_appointments();
      return appointments as TAppointment[];
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar consultas de apontamentos do usuário");
    }
  };

  const createCurrentUserAppointment = async (
    values: TAppoinmentCreate
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
