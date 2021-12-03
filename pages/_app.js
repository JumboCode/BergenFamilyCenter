import '../styles/globals.css';
import '../firebase/firebase';
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";

function MyApp({ Component, pageProps }) {
  const auth = getAuth();
  console.log(auth);
  setPersistence(auth, inMemoryPersistence)
    .then(() => {
      //
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });

  return <Component {...pageProps} />
}

export default MyApp
