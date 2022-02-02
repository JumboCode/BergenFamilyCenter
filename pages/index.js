import Head from "next/head";
import { Typography, Button } from "@mui/material";
import { firebaseFilterEventsPaginate } from "../src/firebaseEvents"

export default function Home() {
  const divisions = ["Child"];
  
  return (
    <div>
      <Head>
        <title>Bergen Family Center</title>
      </Head>
      <Typography>bergenfamilycenter</Typography>
      <Button onClick={async () => {await firebaseFilterEventsPaginate(divisions, 5, 0)}}>This is a button</Button>
    </div>
  );
}