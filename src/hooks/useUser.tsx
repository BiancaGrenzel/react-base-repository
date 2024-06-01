import { useUserStore } from "../store";
import { update_user } from "../services/users";
import { InUpdateUser } from "../services/users/input/InUpdateUser.types";

export const useUser = () => {
  const { setUser } = useUserStore();

  const updateUser = async ({
    uid,
    email,
    birthDate,
    phone,
    name,
  }: InUpdateUser) => {
    await update_user({ uid, email, birthDate, phone, name });
    setUser({ email, birthDate, phone, name });
  };

  return { updateUser };
};
