import Head from "next/head";
import { Typography, Button } from "@mui/material";
import userSignUp from "../src/firebaseSignUp";
import userSignIn from "../src/firebaseSignIn";
import userSignOut from "../src/firebaseSignOut";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Bergen Family Center</title>
      </Head>
      <Typography>bergenfamilycenter</Typography>
    </div>
  );
}
