import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const userSignIn = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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

export default userSignIn;
