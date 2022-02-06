import Head from "next/head";
import { Typography } from "@mui/material";

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