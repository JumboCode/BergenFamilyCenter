import React from "react";
import { app, db } from "../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addUser } from "./userFunctions";

const userSignUp = (email, password, phoneNumber, name) => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        /* Include optional actions */
        addUser(userCredential.user.uid, email, phoneNumber, name)
        resolve(`New user signed up!`);
      })
      .catch((error) => {
        reject(`Error ${error.code} signing user up: ${error.message}`);
      });
  });
};

export default userSignUp;
