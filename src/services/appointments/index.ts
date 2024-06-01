import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { OutAppointment } from "./output/OutAppointment.types";
import { InCreateAppointment } from "./input/InCreateAppointment.types";

const refAppointmentsCollection = collection(db, "appointments");

export const get_current_user_appointments = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const appointmentsQuery = query(
    refAppointmentsCollection,
    where("uid", "==", user.uid)
  );

  const querySnapshot = await getDocs(appointmentsQuery);
  const appointments: OutAppointment[] = [];

  querySnapshot.forEach((doc) => {
    const appointment = doc.data() as OutAppointment;
    appointment.id = doc.id;
    appointments.push(appointment);
  });

  return appointments;
};

export const create_current_user_appointment = async (
  props: InCreateAppointment
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
