import Head from "next/head";
import * as React from "react";
import UpcomingEvent from "../components/upcomingEvent";
import CalendarIcon from "../components/calendarIcon";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bergen Family Center</title>
      </Head>
      <UpcomingEvent></UpcomingEvent>
      {/* <CalendarIcon month="December" day="31" style={{ width: '10%', height: '10%' }}></CalendarIcon> */}
    </div >
  );
}