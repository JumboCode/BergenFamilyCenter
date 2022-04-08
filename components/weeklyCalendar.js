import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { firebaseFilterEventsChronological } from '../src/firebaseEvents';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import EventDialog from "./eventDialog";

export default function WeeklyCalendar({ selectedDay, user }) {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const start = new Date();
    const options = { month: 'long', day: 'numeric' };

    start.setDate(start.getDate() - start.getDay());
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    const [startOfWeek, setStartOfWeek] = useState(start);
    const [endOfWeek, setEndOfWeek] = useState(end);
    const currentWeek = startOfWeek.getTime() === start.getTime();

    useEffect(() => {
        if (selectedDay < startOfWeek || selectedDay > endOfWeek) {
            const start = selectedDay;
            start.setDate(start.getDate() - start.getDay());
            start.setHours(0, 0, 0, 0);
            const end = new Date(start);
            end.setDate(end.getDate() + 7);
            setStartOfWeek(start);
            setEndOfWeek(end);
        }
    }, [selectedDay]);

    const divisions = ['Early Learning Center/Home', "Family Success Center", "HIV/Outreach Services", "Visiting Program", "Senior Services", "Adolescent Services", "Clinical Services"];
    const roundToNearest30 = date => {
        const minutes = 30;
        const ms = 1000 * 60 * minutes;
        return new Date(Math.round(date.getTime() / ms) * ms);
    };

    const mapTime = (hour, minutes) => {
        const minutesFormatted = minutes == 0 ? "00" : `${minutes}`;
        let formattedTime = "";
        if (hour > 9) {
            formattedTime = `${hour}${minutesFormatted}`;
        } else {
            formattedTime = `0${hour}${minutesFormatted}`;
        }
        return formattedTime;
    };

    const eventsOverlap = (e1, e2) => {
        if (e1.startTime > e2.endTime) {
            return false;
        }
        if (e2.startTime > e1.endTime) {
            return false;
        }
        if (e2.endTime < e1.startTime) {
            return false;
        }
        if (e1.endTime < e2.startTime) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        // TODO Optimize
        firebaseFilterEventsChronological(3, divisions).then(v => {
            v = v.filter(e => {
                return e.startTime.toDate() > startOfWeek && e.startTime.toDate() < endOfWeek;
            });
            v = v.sort((a, b) => a.startTime - b.startTime);

            // Separate into days
            const eventDays = [];
            const overlaps = [];
            for (let i = 0; i < 7; i++) {
                eventDays.push([]);
            }

            v.forEach(e => {
                eventDays[e.startTime.toDate().getDay()].push(e);
                overlaps.push(0);
            });

            const eventComponents = v.map((event, i) => {
                const className = `session track-all session-${i} track-${divisions.indexOf(event.division) + 1}`;
                const start = roundToNearest30(event.startTime.toDate());
                const hourStart = start.getHours();
                const minuteStart = start.getMinutes();
                const day = start.getDay();

                const end = roundToNearest30(event.endTime.toDate());
                const hourEnd = end.getHours();
                const minuteEnd = end.getMinutes();

                const startString = mapTime(hourStart, minuteStart);
                const endString = mapTime(hourEnd, minuteEnd);
                const gridRow = `time-${startString} / time-${endString}`;

                let overlap = false;
                let overlapAmount = 0;
                eventDays[day].forEach((e, i) => {
                    if (e !== event) {
                        if (eventsOverlap(e, event)) {
                            if (start > roundToNearest30(e.startTime.toDate())) {
                                overlap = true;
                                overlapAmount += (overlaps[i - 1] + 1);
                            } else if (start === roundToNearest30(e.startTime.toDate())) {
                                overlapAmount += (overlaps[i - 1] + 1);
                            }
                        }
                    }
                });
                if (overlap) {
                    overlaps[i] = overlapAmount;
                }
                return (
                    <Grid onClick={() => { setSelectedEvent(event); setOpen(true) }} item key={i} className={className} style={{ marginLeft: `${overlapAmount}em`, gridColumn: `track-${day + 1}`, gridRow: gridRow }
                    }>
                        <Typography variant="body2">{event.name}</Typography>
                        {/* <span className="session-time">{event.description}</span> */}
                        {/* <span className="session-track">Track: 1</span>
                        <span className="session-presenter">Presenter</span> */}
                    </Grid >
                )
            });
            setEvents(eventComponents);
        })
    }, [startOfWeek, endOfWeek]);

    const times = [];
    let d = new Date(2022, 1, 1, 7);
    const endDate = new Date(2022, 1, 1, 19, 30);
    let i = 0;
    while (d < endDate) {
        times.push([d.getHours(), d.getMinutes()])
        // times.push((d.getHours() % 12) + ':' + d.getMinutes() + (i++ % 2 != 0 ? "" : "0") + (d.getHours() > 12 ? " pm" : " am"));
        d = moment(d).add(30, 'm').toDate();
    }
    return (
        <div className="schedule-container" style={{ overflow: "auto", height: "80vh" }}>
            {!open ? null :
                <EventDialog
                    open={open}
                    setOpen={setOpen}
                    description={selectedEvent?.description}
                    title={selectedEvent?.name}
                    image={""}
                    className={""}
                    startTime={selectedEvent?.startTime.toDate()}
                    endTime={selectedEvent?.endTime.toDate()}
                    manager={selectedEvent?.manager}
                    event={selectedEvent?.id}
                    attendees={selectedEvent?.attendeesRef}
                    user={user}
                />
            }
            <div style={{ position: "sticky", display: "block", marginLeft: 20 }} >
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <IconButton onClick={() => {
                            const d = new Date(startOfWeek);
                            const d2 = new Date(endOfWeek);
                            d.setDate(d.getDate() - 7);
                            d2.setDate(d2.getDate() - 7);
                            setStartOfWeek(d);
                            setEndOfWeek(d2);
                        }}>
                            < KeyboardArrowLeftIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => {
                            const d = new Date(startOfWeek);
                            const d2 = new Date(endOfWeek);
                            d.setDate(d.getDate() + 7);
                            d2.setDate(d2.getDate() + 7);
                            setStartOfWeek(d);
                            setEndOfWeek(d2);
                        }}>
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography styles={{ float: "right" }} variant="h6">
                            {startOfWeek.toLocaleDateString("en-US", options)} - {endOfWeek.toLocaleDateString("en-US", options)}
                        </Typography>
                    </Grid>
                </Grid>

            </div>

            <div className="schedule" aria-labelledby="schedule-heading">

                {currentWeek ? <span className="current-day" aria-hidden="true" style={{ gridColumn: `track-${(new Date()).getDay() + 1}`, gridRow: "tracks / time-1930" }} ></span> : null}

                {/* Time */}
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "times", gridRow: "tracks" }} ></span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-1", gridRow: "tracks" }} >Sun</span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-2", gridRow: "tracks" }} >Mon</span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-3", gridRow: "tracks" }} >Tue</span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-4", gridRow: "tracks" }} >Wed</span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-5", gridRow: "tracks" }} >Thu</span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-6", gridRow: "tracks" }} >Fri</span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-7", gridRow: "tracks" }} >Sat</span>
                {/* <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-8", gridRow: "tracks" }} ></span> */}

                {/* Day Breaks */}
                <span className="track-int" style={{ gridColumn: "track-0-int", gridRow: "tracks / time-7000" }} ></span>
                <span className="track-int" style={{ gridColumn: "track-1-int", gridRow: "tracks / time-7000" }} ></span>
                <span className="track-int" style={{ gridColumn: "track-2-int", gridRow: "tracks / time-7000" }} ></span>
                <span className="track-int" style={{ gridColumn: "track-3-int", gridRow: "tracks / time-7000" }} ></span>
                <span className="track-int" style={{ gridColumn: "track-4-int", gridRow: "tracks / time-7000" }} ></span>
                <span className="track-int" style={{ gridColumn: "track-5-int", gridRow: "tracks / time-7000" }} ></span>
                <span className="track-int" style={{ gridColumn: "track-6-int", gridRow: "tracks / time-7000" }} ></span>
                <span className="track-int" style={{ gridColumn: "track-7-int", gridRow: "tracks / time-7000" }} ></span>

                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-int" }} ></span>
                {/* <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-1-int" }}></span> */}
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-2-int" }}></span>
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-3-int" }}></span>
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-4-int" }}></span>
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-5-int" }}></span>
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-6-int" }}></span>
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-7-int" }}></span>
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-8-int" }}></span>
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-9-int" }}></span>
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-10-int" }}></span>
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-11-int" }}></span>
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-12-int" }}></span>
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-13-int" }}></span>
                <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-14-int" }}></span>
                {/* ${t[0] > 12 ? "pm" : "am"} */}
                {/* :${t[1] == 0 ? "00" : t[1]} */}
                {events.map(e => e)}
                {times.map((t, i) => (
                    <Typography variant='h5' key={i} className="time-slot" style={{ gridRow: `time-${mapTime(t[0], t[1])}` }}>{`${t[1] == 0 ? (t[0] > 12 ? t[0] % 12 : t[0]) : ""}`}</Typography>
                ))}

            </div >
        </div >

    )
}