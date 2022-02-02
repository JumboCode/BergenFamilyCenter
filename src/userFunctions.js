import react from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  doc,
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
