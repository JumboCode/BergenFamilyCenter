import { getUpcomingUserEvents } from "../src/userFunctions";
import { useState, useEffect, useContext } from "react";
import { LanguageContext } from '../src/languageContext';
import { Typography, Grid, Box } from '@mui/material';
import UpcomingEvent from "./upcomingEvent";

// Designed for use in a width-3 grid
export default function MyUpcomingEvents({ user, gtDivisions }) {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { language, _ } = useContext(LanguageContext);
    const inEnglish = language === "English";

    useEffect(() => {
        const upcomingUserEvents = getUpcomingUserEvents(user.id);
        upcomingUserEvents.then((upcomingEvents) => { setUpcomingEvents(upcomingEvents); setLoading(false) });
    }, []);

    let upcomingEventsComponent = upcomingEvents.map(event => {
        return <Box key={event.id} sx={{ pb: 2 }}>
            <UpcomingEvent user={user} gtDivisions={gtDivisions} {...event}></UpcomingEvent>
        </Box>;
    });

    return (
        <div>
            {loading ?
                null
                : (
                    upcomingEvents.length == 0 ?
                        <Typography variant="h5">
                            {inEnglish ? "You have no upcoming events" : "No hay próximas eventos"}
                        </Typography> : (
                            <div>
                                <Typography sx={{ pb: 1 }} variant="h5">
                                    {inEnglish ? "My Upcoming Events" : "Mis Próximos Eventos"}
                                </Typography>
                                <Box sx={{
                                    p: 2, maxHeight: "30vh", overflow: "auto", '&::-webkit-scrollbar': { display: "none" }
                                }}>
                                    {upcomingEventsComponent}
                                </Box>
                            </div>
                        ))}
        </div>
    );
    ;
};