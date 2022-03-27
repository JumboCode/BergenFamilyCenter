import Head from "next/head";
import * as React from "react";
import UpcomingEvent from "../components/upcomingEvent";
import CalendarIcon from "../components/calendarIcon";
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bergen Family Center</title>
      </Head>
      <Grid container>
        <Grid item xs={3}>
          <UpcomingEvent eventID={"fourth"}></UpcomingEvent>
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={9} sx={{ height: '100%', width: "100%" }}></Paper>
        </Grid>
      </Grid>
    </div >
  );
}