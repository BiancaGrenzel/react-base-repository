import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { InCreateUser } from "./input/InCreateUser.types";
import { OutUser } from "./output/OutUser.types";
import { InGetUsers } from "./input/InGetUsers.types";
import { InUpdateUser } from "./input/InUpdateUser.types";
import { InDeleteUser } from "./input/InDeleteUser.types";
import { InGetUserById } from "./input/InGetUserById.types";

const refUsersCollection = collection(db, "users");

export const create_user = async (user: InCreateUser) => {
  await addDoc(refUsersCollection, user);
};

export const update_user = async ({
  uid,
  email,
  birthDate,
  phone,
  name,
}: InUpdateUser): Promise<void> => {
  const userDoc = doc(db, "users", uid);

  const updatedFields: Partial<{
    email: string;
    birthDate: string;
    phone: string;
    name: string;
  }> = {};
  if (email) updatedFields.email = email;
  if (birthDate) updatedFields.birthDate = birthDate;
  if (phone) updatedFields.phone = phone;
  if (name) updatedFields.name = name;

  await updateDoc(userDoc, updatedFields);
};

export const delete_user = async ({ uid }: InDeleteUser): Promise<void> => {
  const userDoc = doc(db, "users", uid);

  await deleteDoc(userDoc);
};

export const get_user_by_id = async ({
  uid,
}: InGetUserById): Promise<OutUser | null> => {
  const userDoc = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    return userSnapshot.data() as OutUser;
  } else {
    return null;
  }
};

export const get_users = async ({
  name,
  email,
  birthDate,
  phone,
}: InGetUsers): Promise<OutUser[] | []> => {
  let usersQuery = query(collection(db, "users"));

  if (name) usersQuery = query(usersQuery, where("name", "==", name));
  if (email) usersQuery = query(usersQuery, where("email", "==", email));
  if (birthDate)
    usersQuery = query(usersQuery, where("birthDate", "==", birthDate));
  if (phone) usersQuery = query(usersQuery, where("phone", "==", phone));

  const querySnapshot = await getDocs(usersQuery);
  return querySnapshot.docs.map((doc) => doc.data() as OutUser);
};
