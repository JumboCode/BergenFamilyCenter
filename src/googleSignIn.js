import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { addUser } from "./userFunctions";

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            if (result._tokenResponse.isNewUser) {
                addUser(user.uid, user.email, user.phoneNumber, user.displayName);
            } // TODO some of these things may not exist
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

export default signInWithGoogle;
