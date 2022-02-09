import Head from "next/head";
import { Button } from "@mui/material";
import { firebaseRetrieveAttendees } from "../src/firebaseEvents";

export default function Home() {
  const id = "eventex";

  return (
    <div>
      <Head>
        <title>Bergen Family Center</title>
      </Head>
      <Button onClick={async () => {await firebaseRetrieveAttendees(id)}}>please please click me to retrieve event's attendees</Button>
    </div>
  );
}