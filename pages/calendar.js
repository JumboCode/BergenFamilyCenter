import { Typography, Grid, Box } from '@mui/material';
import NavBar from "../components/navBar.js";
import { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { MonthCalendar } from "../components/calendar";
import WeeklyCalendar from "../components/weeklyCalendar";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase";
import UpcomingEvent from "../components/upcomingEvent";

export default function Calendar() {
    const [selectedDay, setSelectedDay] = useState(new Date());
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (uid) {
            const userRef = doc(db, "users", uid);
            const userInfo = getDoc(userRef).then(value => {
                setUser({ ...value.data(), id: uid });
            });
        }
    }, []);

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
                    <WeeklyCalendar user={user} selectedDay={selectedDay} />
                </Grid>
            </Grid>
        </div>
    )
}
