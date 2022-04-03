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
  orderBy,
} from "firebase/firestore";


export const addUser = async (id, email, phoneNumber, name) => {
  const userDoc = doc(db, "users", id);
  const newUser = await setDoc(userDoc, {
    email: email,
    phoneNumber: phoneNumber,
    events: [],
    isManager: false,
    name: name,
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

export const addUserEvent = async (uid, event) => {
  const userRef = doc(db, "users", uid);
  try {
    await updateDoc(userRef, {
      events: arrayUnion(doc(db, "events", event)),
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getUpcomingUserEvents = async (uid) => {
  const userRef = doc(db, "users", uid);

  const userSnap = await getDoc(userRef);

  // TODO: continue debugging this! the events are all REFS!!
  const userEvents = userSnap.data().events;
  const data = doc(db, userEvents[0])
  console.log(data.data());

  // const events = collection(db, "events");

  // let upcoming_events = [];

  // let now = new Date();
  // now = new Date(now.setHours(0, 0, 0, 0));
  // const last_midnight_timestamp = Timestamp.fromDate(now);

  let q = query(
    userEvents,
    //   where("attendees", "array-contains", uid),
    //   orderBy("startTime"),
    // where("startTime", ">=", last_midnight_timestamp)
  );

  // const querySnapshot = await getDocs(q);

  // querySnapshot.forEach((doc) => {
  //   upcoming_events.push(doc.data());
  // });

  // console.log(upcoming_events);
  // return upcoming_events;
};

// OLD AND BAD!
// export const getUpcomingUserEvents = async (uid) => {
//   const userRef = doc(db, "users", uid);
//   const events = collection(db, "events");

//   let upcoming_events = [];

//   let now = new Date();
//   now = new Date(now.setHours(0, 0, 0, 0));
//   const last_midnight_timestamp = Timestamp.fromDate(now);

//   let q = query(
//     events,
//     where("attendees", "array-contains", uid),
//     orderBy("startTime"),
//     where("startTime", ">=", last_midnight_timestamp)
//   );

//   const querySnapshot = await getDocs(q);

//   querySnapshot.forEach((doc) => {
//     upcoming_events.push(doc.data());
//   });

//   console.log(upcoming_events);
//   return upcoming_events;
// };