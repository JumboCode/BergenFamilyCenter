import React from "react";
import { app, db } from "../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const userSignUp = (email, password) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      /* Include optional actions */
      // e.g. console.log(userCredential.user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error code " + errorCode + ": " + errorMessage);
    });
};

export default userSignUp;
