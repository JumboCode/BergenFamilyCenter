import {
    collection, getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase.js";


const firebaseGetDivisions = async () => {
    const querySnapshot = await getDocs(collection(db, "divisions"));
    let the_divisions = []

    querySnapshot.forEach((doc) => {
        the_divisions.push(doc.data());
    });
    console.log(the_divisions);
    return the_divisions;
};

export {
    firebaseGetDivisions,
};
