import * as React from "react";
import { Typography, Grid } from '@mui/material';
import NavBar from "../components/navBar.js";
import { MonthCalendar } from "../components/calendar";
import WeeklyCalendar from "../components/weeklyCalendar";
import UpcomingEvent from "../components/upcomingEvent";
import CheckboxLabels from '../components/calendarFilter.js';
import { useState } from 'react';

export default function Calendar() {
    const [divisions, setDivisions] = useState([]);

    // pull infor, set division to info when it arrives

    return (
        <div>
            <NavBar page={"calendar"}></NavBar>
            <Grid sx={{ m: 2 }} container spacing={2}>
                <Grid item xs={3}>
                    <Typography variant="h5">
                        My Upcoming Events
                    </Typography>
                    {/* <div styles={{ marginBottom: 50 }}>
                    </div> */}
                    <UpcomingEvent eventID={"fourth"}></UpcomingEvent>
                    <MonthCalendar />
                </Grid>
                <Grid item xs={7}>
                    <WeeklyCalendar divisions={divisions}/>
                </Grid>
                <Grid item xs={2}>
                    <CheckboxLabels divisions={divisions} setDivisions={setDivisions}/>
                </Grid>
            </Grid>
        </div>
    )
}
