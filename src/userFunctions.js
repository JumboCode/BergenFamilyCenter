import react from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase";
import { Timestamp } from "@firebase/firestore";
import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  query,
  where,
} from "firebase/firestore";


export const addUser = async (id, email, phoneNumber, name) => {
  const userDoc = doc(db, "users", id);
  const newUser = await setDoc(userDoc, {
    email: email,
    phoneNumber: phoneNumber,
    events: [],
    isManager: false,
    address: "",
    name: name,
    consent: {},
  });
};

export const updateUser = async (uid, fieldToUpdate) => {
  const userRef = doc(db, "users", uid);
  try {
    await updateDoc(userRef, fieldToUpdate);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const addUserEvent = async (uid, eventRef, attendeesRef) => {
  const userRef = doc(db, "users", uid);
  const events = collection(db, "events");
  let now = new Date();
  now = new Date(now.setHours(0, 0, 0, 0));
  const last_midnight_timestamp = Timestamp.fromDate(now);

  const q = query(
    events,
    where("attendeesRef", "==", attendeesRef),
    where("startTime", ">=", last_midnight_timestamp)
  );

  const querySnapshot = await getDocs(q);
  const userSnap = await (getDoc(userRef));
  const oldEvents = userSnap.data().events;
  const es = querySnapshot.docs.map(d => doc(db, "events", d.id))
  oldEvents.push(...es);
  try {
    await updateDoc(userRef, {
      events: oldEvents,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getUpcomingUserEvents = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  const userEventRefs = userSnap.data().events;

  let userEvents = userEventRefs.map(async element => {
    const data = await getDoc(element);
    return { ...data.data(), id: data.id };
  });

  const values = await Promise.all(userEvents);

  let now = new Date();
  now = new Date(now.setHours(0, 0, 0, 0));
  const last_midnight_timestamp = Timestamp.fromDate(now);

  const upcomingEvents = values.filter(value => {
    return value.startTime >= last_midnight_timestamp;
  }
  );

  upcomingEvents.sort((a, b) => a.startTime - b.startTime);

  return upcomingEvents;
};
