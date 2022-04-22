import { getUpcomingUserEvents } from "../src/userFunctions";
import { useState, useEffect } from "react";
import { Typography, Grid, Box } from '@mui/material';
import UpcomingEvent from "./upcomingEvent";

// Designed for use in a width-3 grid
export default function MyUpcomingEvents({ user }) {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const upcomingUserEvents = getUpcomingUserEvents(user.id);
        upcomingUserEvents.then((upcomingEvents) => { setUpcomingEvents(upcomingEvents); setLoading(false) });
    }, []);

    let upcomingEventsComponent = upcomingEvents.map(event => {
        return <Box key={event.id} sx={{ pb: 2 }}>
            <UpcomingEvent user={user} {...event}></UpcomingEvent>
        </Box>;
    });

    return (
        <div>
            {loading ? null : (
                upcomingEvents.length == 0 ?
                    <Typography variant="h5">
                        You have no upcoming events
                    </Typography> : (
                        <div>
                            <Typography sx={{ pb: 1 }} variant="h5">
                                My Upcoming Events
                            </Typography>
                            <Box sx={{ p: 2, maxHeight: "30vh", overflow: "auto" }}>
                                {upcomingEventsComponent}
                            </Box>
                        </div>
                    ))}
        </div>
    );
    ;
};