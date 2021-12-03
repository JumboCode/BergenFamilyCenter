import { collection, doc, setDoc, updateDoc, getDocs, arrayUnion, arrayRemove, query, where } from "firebase/firestore";
import { db, firebase } from "../firebase/firebase.js";
import { Timestamp } from "@firebase/firestore";
// import { getAuth } from "firebase/auth";

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
        division: data.division,
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

const firebaseFilterEvents = async (month, divisions, showEnrolled) => {
    const events = collection(db, "events");
    //Date.getMonth(Timestamp.toDate(startTime))
    //const q = query(events, where("division", "in", divisions), where("month", "==", month)); //need to do it for each division (in second parameter)
    //const q = query(events, where("division", "in", divisions), where("startTime", "==", month));    
    if (showEnrolled) {
        // var user_id = getAuth().currentUser.uid;
        // console.log(user_id);
        // const q = query(events, where("division", "in", divisions), where("enrolled", "array-contains", user_id));
    } else {
        const q = query(events, where("division", "in", divisions));
    }
    //create date object and extract the month?
    const querySnapshot = await getDocs(q);
    //if we want to do something with each doc, which maybe we don't? ...
    querySnapshot.forEach((doc) => {
        var timestamp = doc.data().startTime;
        console.log("Timestamp found =", timestamp);
        if (timestamp.toDate().getMonth()) {
            console.log("yay we found a match!!!!");
            console.log(doc.id, " => ", doc.data());
        }
        // console.log("we found a match!!!!");
    });

}

export { firebaseNewEvent, firebaseUpdateEvent, firebaseAppendUser, firebaseRemoveUser, firebaseFilterEvents };
