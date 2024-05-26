import { useAuthStore, useUserStore } from "../store";
import {
  changepassword,
  deleteCurrentUser,
  logout,
  reauthenticate,
  recoverpassword,
  signin,
  signup,
} from "../services/auth";
import { create_user, get_user_by_id } from "../services/users";
import { auth } from "../services/firebase";

export const useAuth = () => {
  const { uid, setUser, resetUser } = useUserStore();
  const { setRefreshToken } = useAuthStore();

  const signIn = async (email: string, password: string) => {
    const userCredential = await signin(email, password);

    let user;

    try {
      user = await get_user_by_id(userCredential.user.uid);
    } catch (error) {
      throw new Error("Erro ao buscar informações do usuário");
    }

    localStorage.setItem("uid", userCredential.user.uid);

    setUser({
      email: user?.email,
      uid: user?.uid,
      birthDate: user?.birthDate,
      phone: user?.phone,
      name: user?.name,
    });

    setRefreshToken(userCredential.user.refreshToken);
    return user;
  };

  const isAuthenticated = () => {
    const hasCurrentUser = auth.currentUser;
    const uuidLocalStorage = localStorage.getItem("uid");
    return !!uid && !!uuidLocalStorage && hasCurrentUser;
  };

  const signUp = async (
    email: string,
    password: string,
    birthDate: string,
    phone: string,
    name: string
  ) => {
    const userCredential = await signup(email, password);

    const user = userCredential.user;

    try {
      await create_user(email, birthDate, phone, name, user.uid);
    } catch (error) {
      await deleteCurrentUser();
      throw error;
    }

    setRefreshToken(user.refreshToken);
    setUser({ email, uid: user.uid, birthDate, phone, name });

    return user;
  };

  const logOut = async () => {
    await logout;
    localStorage.removeItem("uid");
    resetUser();
    setRefreshToken(null);
  };

  const recoverPassword = async (email: string) => {
    await recoverpassword(email);
  };

  const changePassword = async (
    email: string,
    password: string,
    newPassword: string
  ) => {
    try {
      await reauthenticate(email, password);
    } catch {
      throw new Error("Erro ao reautenticar usuário");
    }

    await changepassword(newPassword);
  };

  return {
    signIn,
    isAuthenticated,
    signUp,
    logOut,
    recoverPassword,
    changePassword,
  };
};
