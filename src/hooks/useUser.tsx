import { useUserStore } from "../store";
import { update_user } from "../services/users";

export const useUser = () => {
  const { uid, setUser } = useUserStore();

  const updateUser = async (
    email?: string,
    birthDate?: string,
    phone?: string,
    name?: string
  ) => {
    await update_user(uid, email, birthDate, phone, name);
    setUser({ email, birthDate, phone, name });
  };

  return { updateUser };
};
