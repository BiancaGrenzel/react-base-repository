import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { auth } from "./firebase";
import { TAppoinmentCreate, TAppointment } from "../types/appointment.types";

const refAppointmentsCollection = collection(db, "appointments");

export const get_current_user_appointments = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const appointmentsQuery = query(
    refAppointmentsCollection,
    where("uid", "==", user.uid)
  );

  const querySnapshot = await getDocs(appointmentsQuery);
  const appointments: TAppointment[] = [];

  querySnapshot.forEach((doc) => {
    const appointment = doc.data() as TAppointment;
    appointment.id = doc.id;
    appointments.push(appointment);
  });

  return appointments;
};

export const create_current_user_appointment = async (
  props: TAppoinmentCreate
) => {
  const user = auth.currentUser;
  if (!user) return;

  const { nmTask, description, qtHours, createdDate } = props;

  const appointment = {
    uid: user.uid,
    nmTask,
    description,
    qtHours,
    createdDate,
  };

  await addDoc(refAppointmentsCollection, appointment);
};
