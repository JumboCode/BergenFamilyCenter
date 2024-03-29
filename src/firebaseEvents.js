import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  arrayUnion,
  arrayRemove,
  query,
  where,
  orderBy,
  startAt,
  limit,
} from "firebase/firestore";
import { db, firebase } from "../firebase/firebase.js";
import { Timestamp } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { addUserEvent } from "./userFunctions";

const firebaseNewEvent = async (data) => {
  // Add a new document with a generated id
  const newEventRef = doc(collection(db, "events"));

  await setDoc(newEventRef, data);
};

const firebaseGetEvent = async (id) => {
  // Add a new document with a generated id
  const eventRef = doc(db, "events", id);
  const docSnap = await getDoc(eventRef);
  return docSnap.data();
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
    endTime: data.endTime,
  });
};

const firebaseAppendUser = async (user, id) => {
  const eventRef = doc(db, "events", id);
  const userRef = doc(db, "users", id);

  await updateDoc(eventRef, {
    attendees: arrayUnion(userRef),
  });
};

const firebaseRemoveUser = async (user, id) => {
  const eventRef = doc(db, "events", id);
  const userRef = doc(db, "users", id);

  await updateDoc(eventRef, {
    attendees: arrayRemove(userRef),
  });
};

// Example usage: firebaseFilterEvents(6, ["Nonchild"]).then(values => console.log(values))
const firebaseFilterEvents = async (theMonth, divisions, showEnrolled) => {
  const events = collection(db, "events");
  let filtered_events = [];

  let q = query(events, where("division", "in", divisions));

  if (showEnrolled) {
    let user_id = getAuth().currentUser.uid;
    q = query(
      events,
      where("division", "in", divisions),
      where("attendees", "array-contains", user_id)
    );
  }

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    var timestamp = doc.data().startTime;
    if (timestamp.toDate().getMonth() == theMonth) {
      filtered_events.push(doc.data());
    }
  });
  return filtered_events;
};

// TODO GLITCH WITH UPCOMING EVENT
const generateQuery = async (attendeesRef) => {
  const events = collection(db, "events");
  let now = new Date();
  now = new Date(now.setHours(0, 0, 0, 0));
  const last_midnight_timestamp = Timestamp.fromDate(now);
  const q = query(
    events,
    where("attendeesRef", "==", attendeesRef),
    where("startTime", ">=", last_midnight_timestamp),
    orderBy("startTime"),
    limit(1)
  );

  const querySnapshot = await getDocs(q);


  return ("event=" + querySnapshot.docs[0]?.id)
}

const firebaseFilterEventsPaginate = async (
  divisions,
  pageSize,
  pageOffset
) => {
  let toReturn = [];

  const events = collection(db, "events");
  const startAtNum = pageSize * pageOffset;
  const current_time = Timestamp.now();

  let now = new Date();
  now = new Date(now.setHours(0, 0, 0, 0));
  const last_midnight_timestamp = Timestamp.fromDate(now);

  let q = query(
    events,
    where("division", "in", divisions),
    orderBy("startTime"),
    where("startTime", ">=", last_midnight_timestamp)
  );

  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const programs = {};
  getDocs(collection(db, "programs")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      programs[doc.data().name] = doc.data().users;
    });
  });

  const querySnapshot = await getDocs(q);

  for (var i = 0; i < pageSize; i++) {
    if (i < querySnapshot.size - startAtNum) {
      toReturn[i] = querySnapshot.docs[i + startAtNum];
    }
  }

  // Filter by program
  toReturn = toReturn.filter(doc => doc.data().program === "" || programs[doc.data().program].some(u => u.id === uid))

  // Removes double events
  const dict = new Object();
  return toReturn.filter(doc => {
    if (dict[doc.data().attendeesRef?.id]) {
      return false;
    }
    dict[doc.data().attendeesRef?.id] = true;
    return true;
  });
};

const firebaseAppendPerson = async (
  userID,
  eventID,
  attendeesRef,
  names,
  ages,
  photoConsent
) => {
  const eventRef = doc(db, "events", eventID);
  const userRef = doc(db, "users", userID);

  const nameAndAge = {};
  names.forEach((name, i) => (nameAndAge[name] = ages[i]));

  const userToAdd = {
    parent: userRef,
    attendees: nameAndAge,
    consent: photoConsent,
  };

  // TODO
  // if (docSnap.data().events.includes(eventRef)) {
  //   console.log("CONTAINS");
  // }
  await updateDoc(attendeesRef, {
    attendees: arrayUnion(userToAdd),
  });

  addUserEvent(userID, eventRef, attendeesRef);
};

const firebaseFilterEventsChronological = async (
  theMonth,
  divisions,
  showEnrolled
) => {
  const events = collection(db, "events");
  let filtered_events = [];

  let now = new Date(2022, 3, 4); // TODO
  now = new Date(now.setHours(0, 0, 0, 0));
  const last_midnight_timestamp = Timestamp.fromDate(now);

  let q = query(
    events,
    where("division", "in", divisions),
    orderBy("startTime"),
    where("startTime", ">=", last_midnight_timestamp)
  );

  if (showEnrolled) {
    try {
      let user_id = getAuth().currentUser.uid;
      q = query(
        events,
        where("division", "in", divisions),
        where("attendees", "array-contains", user_id),
        orderBy("startTime"),
        where("startTime", ">=", last_midnight_timestamp)
      );
    } catch (error) {
      console.log(`Error: You probably weren't signed in. Full error: ${error}`);
    }
  }

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    var timestamp = doc.data().startTime;
    if (timestamp.toDate().getMonth() == theMonth) {
      filtered_events.push({ ...doc.data(), id: doc.id });
    }
  });

  return filtered_events;
};

const firebaseFilterEventsChronologicalWeek = async (
  startOfWeek,
  endOfWeek,
  divisions,
  showEnrolled
) => {
  const events = collection(db, "events");
  let filtered_events = [];

  let q = query(
    events,
    where("division", "in", divisions),
    orderBy("startTime"),
    where("startTime", ">=", startOfWeek),
    where("startTime", "<=", endOfWeek)
  );

  if (showEnrolled) {
    try {
      let user_id = getAuth().currentUser.uid;
      q = query(
        events,
        where("division", "in", divisions),
        where("attendees", "array-contains", user_id),
        orderBy("startTime"),
        where("startTime", ">=", startOfWeek),
        where("startTime", "<=", endOfWeek)
      );
    } catch (error) {
      console.log(`Error: You probably weren't signed in. Full error: ${error}`);
    }
  }

  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const programs = {};
  getDocs(collection(db, "programs")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      programs[doc.data().name] = doc.data().users;
    });
  });
  const querySnapshotEvents = await getDocs(q);
  querySnapshotEvents.forEach((doc) => {
    let found = false;
    if (doc.data().program === "") {
      found = true;
    } else {
      programs[doc.data().program].forEach(u => {
        if (u.id == uid) {
          found = true;
        }
      })
    }
    if (found) {
      filtered_events.push({ ...doc.data(), id: doc.id });
    }
  });

  return filtered_events;
}

const firebaseUserPreviousEvents = async (
  theTimestamp
) => {
  let user_id = getAuth().currentUser.uid;
  const userRef = doc(db, "users", user_id);
  return getDoc(userRef).then(value => {
    const user_events = value.data().events;
    return user_events.map((doc_id) =>
      getDoc(doc_id).then(value => {
        if (value.data()?.startTime != undefined) {
          if (value.data()?.startTime <= theTimestamp) {
            return { ...value.data(), id: value.id };
          }
        }
      }))
  });
};

export {
  firebaseNewEvent,
  firebaseGetEvent,
  firebaseUpdateEvent,
  firebaseAppendUser,
  firebaseRemoveUser,
  firebaseFilterEvents,
  firebaseAppendPerson,
  firebaseFilterEventsChronological,
  firebaseFilterEventsPaginate,
  firebaseFilterEventsChronologicalWeek,
  generateQuery,
  firebaseUserPreviousEvents,
};
