import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const userSignIn = (email, password) => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        /* Include optional actions */
        resolve(`Successfully logged in!`);
      })
      .catch((error) => {
        reject(`Error logging in. Error ${error.code}: ${error.message}`);
      });
  });
};

export default userSignIn;
