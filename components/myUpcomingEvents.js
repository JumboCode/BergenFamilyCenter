import { getUpcomingUserEvents } from "../src/userFunctions";
import { useState, useEffect } from "react";
import UpcomingEvent from "./upcomingEvent";

// Designed for use in a width-3 grid
export default function MyUpcomingEvents({ userID }) {
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        const upcomingUserEvents = getUpcomingUserEvents(userID);
        upcomingUserEvents.then((upcomingEvents) => setUpcomingEvents(upcomingEvents));
    }, []);

    let upcomingEventsComponent = upcomingEvents.map(event => {
        return <UpcomingEvent eventID={event.id} key={event.id}></UpcomingEvent>;
    });

    return upcomingEventsComponent;
};