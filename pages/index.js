import Head from "next/head";
import * as React from "react";
import MyUpcomingEvents from "../components/myUpcomingEvents";
import Grid from "@mui/material/Grid"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bergen Family Center</title>
      </Head>
      <Grid container>
        <Grid item xs={3}>
          <MyUpcomingEvents userID="Ap9SYtZOGdIFYKCJSs7e"></MyUpcomingEvents>
        </Grid>
        <Grid item xs={9}>
        </Grid>
      </Grid>
    </div >
  );
}