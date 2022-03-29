// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


console.log(process.env)
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.ENV_AUTH_DOMAIN,
  projectId: process.env.ENV_PROJECT_ID,
  storageBucket: process.env.ENV_STORAGE_BUCKET,
  messagingSenderId: process.env.ENV_MESSAGING_SENDER_ID,
  appId: process.env.ENV_APP_ID,
  measurementId: process.env.ENV_MEASUREMENT_ID,
};
console.log(firebaseConfig)

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
//export const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
export const storage = getStorage(app);
