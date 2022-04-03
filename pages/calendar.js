import { Typography, Grid } from '@mui/material';
import NavBar from "../components/navBar.js";
import { MonthCalendar } from "../components/calendar";
import WeeklyCalendar from "../components/weeklyCalendar";


export default function Calendar() {
    return (
        <div>
            <NavBar page={"calendar"}></NavBar>
            {/* <MonthCalendar /> */}
            <Grid sx={{ m: 2 }} container spacing={2}>
                <Grid item xs={7}>
                    <WeeklyCalendar />
                </Grid>
            </Grid>
        </div>
    )
}
