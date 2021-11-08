import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const passwordReset = (email) => {
    const auth = getAuth();
    console.log("Success!")
    sendPasswordResetEmail(auth, email)

        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
};

export default passwordReset;
