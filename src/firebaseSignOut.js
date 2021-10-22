import { getAuth, signOut } from "firebase/auth";

const userSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error code " + errorCode + ": " + errorMessage);
    });
};

export default userSignOut;
