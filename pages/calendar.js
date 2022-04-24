import { Typography, Grid, Box } from '@mui/material';
import NavBar from "../components/navBar.js";
import { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { MonthCalendar } from "../components/calendar";
import WeeklyCalendar from "../components/weeklyCalendar";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase";
import MyUpcomingEvent from "../components/myUpcomingEvents";
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles(() => ({
    events: {
        // overflow: "hidden",
        // '&:hover': {
        //     overflowY: "scroll",
        // }
    }
}));

export default function Calendar() {
    const [selectedDay, setSelectedDay] = useState(new Date());
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    const [user, setUser] = useState(null);
    const classes = useStyles();

    const myEvents =
        <div>
            {user ?
                <MyUpcomingEvent user={user}></MyUpcomingEvent>
                : null
            }
        </div>;

    useEffect(() => {
        if (uid) {
            const userRef = doc(db, "users", uid);
            const userInfo = getDoc(userRef).then(value => {
                setUser({ ...value.data(), id: uid });
            });
        }
    }, []);

    return (
        <Box >
            <NavBar page={"calendar"}></NavBar>
            <Grid sx={{ p: 2, display: "flex" }} container spacing={2} alignItems="stretch">
                <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={false} sm={3} md={3}>
                    <Box display={{ xs: 'none', sm: 'block' }} >
                        {myEvents}
                        <Divider />
                        {/* LIKE THIS? */}
                        <Box sx={{ flex: "1 0" }}></Box>
                        <MonthCalendar date={selectedDay} onChangeDate={setSelectedDay} />
                    </Box>
                </Grid>
                <Grid item sx={{ display: "flex", flexDirection: "column" }} xs={12} sm={9} md={9}>
                    <WeeklyCalendar user={user} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
                </Grid>
                <Grid item display={{ xs: 'block', sm: 'none' }} >
                    {myEvents}
                </Grid>
            </Grid>
        </Box>
    )
}
