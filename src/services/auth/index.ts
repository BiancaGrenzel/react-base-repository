import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  UserCredential,
  EmailAuthCredential,
} from "firebase/auth";
import { auth } from "../firebase";
import { InSignIn } from "./input/InSignIn.types";
import { InSignUp } from "./input/InSignUp.types";
import { InRecoverPassword } from "./input/InRecoverPassword.types";
import { InReauthenticate } from "./input/InReauthenticate.types";
import { InChangePassword } from "./input/InChangePassword.types";

export const signin = async ({
  email,
  password,
}: InSignIn): Promise<UserCredential> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential;
};

export const signup = async ({
  email,
  password,
}: InSignUp): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential;
};

export const logout = async (): Promise<void> => {
  await auth.signOut();
};

export const recoverpassword = async ({
  email,
}: InRecoverPassword): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

export const reauthenticate = async ({
  email,
  password,
}: InReauthenticate): Promise<EmailAuthCredential> => {
  const user = auth.currentUser;

  if (!user) throw new Error("Nenhum usuário está atualmente autenticado");

  const credential = EmailAuthProvider.credential(email, password);
  await reauthenticateWithCredential(user, credential);

  return credential;
};

export const changepassword = async ({
  newPassword,
}: InChangePassword): Promise<void> => {
  if (auth.currentUser) await updatePassword(auth?.currentUser, newPassword);
};

export const deleteCurrentUser = async (): Promise<void> => {
  if (auth.currentUser) {
    await deleteUser(auth.currentUser);
  } else {
    throw new Error("Nenhum usuário está atualmente autenticado");
  }
};
