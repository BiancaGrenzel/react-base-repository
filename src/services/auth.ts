import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

export const signin = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential;
};

export const signup = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential;
};

export const logout = async () => {
  await auth.signOut();
};

export const recoverpassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const reauthenticate = async (email: string, password: string) => {
  const user = auth.currentUser;

  if (!user) throw new Error("Nenhum usuário está atualmente autenticado");

  const credential = EmailAuthProvider.credential(email, password);
  await reauthenticateWithCredential(user, credential);

  return credential;
};

export const changepassword = async (
  newPassword: string
) => {
  if (auth.currentUser) await updatePassword(auth?.currentUser, newPassword);
};

export const deleteCurrentUser = async () => {
  if (auth.currentUser) {
    await deleteUser(auth.currentUser);
  } else {
    throw new Error("Nenhum usuário está atualmente autenticado");
  }
};
