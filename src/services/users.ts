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
import { db } from "./firebase";

const refUsersCollection = collection(db, "users");

export const create_user = async (
  email: string,
  birthDate: string,
  phone: string,
  name: string,
  uid: string
) => {
  await addDoc(refUsersCollection, {
    email,
    birthDate,
    phone,
    name,
    uid,
  });
};

export const update_user = async (
  uid: string,
  email?: string,
  birthDate?: string,
  phone?: string,
  name?: string
) => {
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

export const delete_user = async (uid: string) => {
  const userDoc = doc(db, "users", uid);

  await deleteDoc(userDoc);
};

export const get_user_by_id = async (uid: string) => {
  const userDoc = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    return null;
  }
};

export const get_users = async (
  name?: string,
  email?: string,
  birthDate?: string,
  phone?: string
) => {
  let usersQuery = query(collection(db, "users"));

  if (name) usersQuery = query(usersQuery, where("name", "==", name));
  if (email) usersQuery = query(usersQuery, where("email", "==", email));
  if (birthDate)
    usersQuery = query(usersQuery, where("birthDate", "==", birthDate));
  if (phone) usersQuery = query(usersQuery, where("phone", "==", phone));

  const querySnapshot = await getDocs(usersQuery);
  return querySnapshot.docs.map((doc) => doc.data());
};
