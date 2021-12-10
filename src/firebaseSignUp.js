import React from "react";
import { app, db } from "../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const userSignUp = (email, password) => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        /* Include optional actions */
        resolve(`New user signed up!`);
      })
      .catch((error) => {
        reject(`Error ${error.code} signing user up: ${error.message}`);
      });
  });
};

export default userSignUp;
