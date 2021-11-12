import { collection, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { db } from "../firebase/firebase.js";

const firebaseNewEvent = async (data) => {
    // Add a new document with a generated id
    const newEventRef = doc(collection(db, "events"));

    await setDoc(newEventRef, data);
};

const firebaseUpdateEvent = async (data, id) => {
    // Find document with user-provided id
    const eventRef = doc(db, "events", id);
    
    // Update the document data
    await updateDoc(eventRef, {
        attendees: data.attendees,
        description: data.description,
        manager: data.manager,
        name: data.name,
        subgroup: data.subgroup,
        startTime: data.startTime,
        endTime: data.endTime
    });
};

const firebaseAppendUser = async (user, id) => {
    const eventRef = doc(db, "events", id);
    const userRef = doc(db, "users", id);

    await updateDoc(eventRef, {
        attendees: arrayUnion(userRef)
    });
}

const firebaseRemoveUser = async (user, id) => {
    const eventRef = doc(db, "events", id);
    const userRef = doc(db, "users", id);

    await updateDoc(eventRef, {
        attendees: arrayRemove(userRef)
    });
}

export {firebaseNewEvent, firebaseUpdateEvent, firebaseAppendUser, firebaseRemoveUser};
