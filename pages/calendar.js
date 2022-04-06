import { Typography, Grid, Box } from '@mui/material';
import NavBar from "../components/navBar.js";
import { useState } from 'react';
import { MonthCalendar } from "../components/calendar";
import WeeklyCalendar from "../components/weeklyCalendar";
import UpcomingEvent from "../components/upcomingEvent";

export default function Calendar() {
    const [selectedDay, setSelectedDay] = useState(new Date());
    return (
        <div>
            <NavBar page={"calendar"}></NavBar>
            <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={3}>
                    <Typography variant="h5">
                        My Upcoming Events
                    </Typography>
                    <UpcomingEvent eventID={"fourth"}></UpcomingEvent>
                    <Box sx={{ flex: "1 0" }}></Box>
                    <MonthCalendar date={selectedDay} onChangeDate={setSelectedDay} />
                </Grid>
                <Grid item xs={7}>
                    <WeeklyCalendar selectedDay={selectedDay} />
                </Grid>
            </Grid>
        </div>
    )
}
