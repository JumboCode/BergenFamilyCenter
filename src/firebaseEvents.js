import { collection, doc, setDoc, updateDoc, getDocs, arrayUnion, arrayRemove, query, where, orderBy, startAt } from "firebase/firestore";
import { db, firebase } from "../firebase/firebase.js";
import { Timestamp } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

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

// Example usage: firebaseFilterEvents(6, ["Nonchild"]).then(values => console.log(values))
const firebaseFilterEvents = async (theMonth, divisions, showEnrolled) => {
    const events = collection(db, "events");
    let filtered_events = [];

    let q = query(events, where("division", "in", divisions));

    if (showEnrolled) {
        let user_id = getAuth().currentUser.uid;
        q = query(events, where("division", "in", divisions), where("attendees", "array-contains", user_id));
    }

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        var timestamp = doc.data().startTime;
        if (timestamp.toDate().getMonth() == theMonth) {
            filtered_events.push(doc.data());
        }
    });
    return filtered_events;
}

const firebaseFilterEventsPaginate = async (divisions, pageSize, pageOffset) => {
    let toReturn = [];

    const events = collection(db, "events");
    const startAtNum = pageSize * pageOffset;
    const current_time = Timestamp.now();

    let now = new Date();
    now = new Date(now.setHours(0,0,0,0));
    const last_midnight_timestamp = Timestamp.fromDate(now);

    let q = query(events, where("division", "in", divisions), orderBy("startTime"), where("startTime", ">=", last_midnight_timestamp));
    const querySnapshot = await getDocs(q);

    for (var i = 0; i < pageSize; i++) {
        if (i < querySnapshot.size - startAtNum) {
            toReturn[i] = querySnapshot.docs[i + startAtNum];
            console.log(toReturn[i].data());
        }
    }
    return toReturn;
}

export { firebaseNewEvent, firebaseUpdateEvent, firebaseAppendUser, firebaseRemoveUser, firebaseFilterEvents, firebaseFilterEventsPaginate };
