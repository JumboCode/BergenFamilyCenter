import react from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";

const userCollection = collection(db, "users");

export const addUser = async (email, phoneNumber) => {
  console.log("Here");
  const newUser = await addDoc(userCollection, {
    email: email,
    phoneNumber: phoneNumber,
    events: [],
  });
  console.log(`User was added! Path: ${newUser.path}`);
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
      events: arrayUnion(event),
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
