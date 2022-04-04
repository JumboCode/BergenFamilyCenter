import { Typography, Grid } from '@mui/material';
import NavBar from "../components/navBar.js";
import { MonthCalendar } from "../components/calendar";
import WeeklyCalendar from "../components/weeklyCalendar";
import UpcomingEvent from "../components/upcomingEvent";

export default function Calendar() {
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
                    <WeeklyCalendar />
                </Grid>
            </Grid>
        </div>
    )
}
