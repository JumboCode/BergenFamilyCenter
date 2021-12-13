// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBRKzVLzZmp9doQRZ-FL93nhPYT5I7YBT8",
    authDomain: "bergenfamilycenter-e65d2.firebaseapp.com",
    projectId: "bergenfamilycenter-e65d2",
    storageBucket: "bergenfamilycenter-e65d2.appspot.com",
    messagingSenderId: "562060752960",
    appId: "1:562060752960:web:050736f1cc9ca86cbbc7a5",
    measurementId: "G-5NJ9VNL3V2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
