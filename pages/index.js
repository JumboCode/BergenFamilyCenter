import Head from "next/head";
import { Typography, Button } from "@mui/material";
import { firebaseNewEvent, firebaseFilterEvents } from '../src/firebaseEvents.js';
import userSignIn from '../src/firebaseSignIn';
import { Timestamp } from "@firebase/firestore";

export default function Home() {
  const data = {
    attendees: "H6zaRU1QWPMTX6P0Rg757Fy3dUX2",
    description: "Come eat pizza with us",
    manager: "Mr. Pizza Man",
    name: "Pizza party!",
    division: "Nonchild",
    startTime: Timestamp.fromDate(new Date("July 19, 2021")),
    endTime: Timestamp.fromDate(new Date("July 20, 2021")),
  };

  const divisions = new Array("Child", "Teen", "Nonchild");

  return (
    <div>
      <Head>
        <title>Bergen Family Center</title>
      </Head>
      <Typography>bergenfamilycenter</Typography>
      <Button onClick={async () => { userSignIn("test@test.com", "test1234") }}>Sign in</Button>
      <Button onClick={async () => { firebaseNewEvent(data) }}>New event</Button>
      <Button onClick={async () => { firebaseFilterEvents(6, divisions, true) }}>Filter events</Button>
    </div >
  );
}
