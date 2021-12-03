import Head from "next/head";
import { Typography, Button } from "@mui/material";
//import { firebaseNewEvent, firebaseFilterEvents } from '../src/firebaseEvents.js';
import userSignIn from '../src/firebaseSignIn';
//import { Timestamp } from "@firebase/firestore";

export default function Home() {
  const data = {
    attendees: "Real Person 1 (this should be a user ID)",
    description: "Come eat pizza with us",
    manager: "Mr. Pizza Man",
    name: "Pizza party!",
    division: "Child",
    //startTime: Timestamp.fromDate(new Date("July 19, 2021")),
    //endTime: Timestamp.fromDate(new Date("July 20, 2021")),
  };

  const divisions = new Array("Child", "Teen", "Nonchild");

  return (
    <div>
      <Head>
        <title>Bergen Family Center</title>
      </Head>
      <Typography>bergenfamilycenter</Typography>
      <Button onClick={async () => { userSignIn("test@test.com", "test123") }}>Sign in</Button>
      {/* <Button onClick={async () => { firebaseNewEvent(data) }}>New event</Button> */}
      {/* <Button onClick={async () => { firebaseFilterEvents(7, divisions, true) }}>Filter events</Button> */}
    </div >
  );
}
