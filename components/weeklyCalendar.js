import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { firebaseFilterEventsChronilogical } from '../src/firebaseEvents';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import moment from 'moment';

export default function WeeklyCalendar() {
    const [events, setEvents] = useState([]);
    const start = new Date();
    const options = { month: 'long', day: 'numeric' };

    start.setDate(start.getDate() - start.getDay());
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    const [startOfWeek, setStartOfWeek] = useState(start);
    const [endOfWeek, setEndOfWeek] = useState(end);

    const divisions = ['Early Learning Center/Home', "Family Success Center"];
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

    useEffect(() => {
        firebaseFilterEventsChronilogical(3, divisions).then(v => {
            v = v.filter(e => {
                return e.startTime.toDate() > startOfWeek && e.startTime.toDate() < endOfWeek;
            });
            console.log(v)

            const eventComponents = v.map((event, i) => {
                const className = `session session-${i} track-${divisions.indexOf(event.division) + 1}`;
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
                return (
                    <div key={i} className={className} style={{ gridColumn: `track-${day + 1}`, gridRow: gridRow }
                    }>
                        <Typography variant="body2">{event.name}</Typography>
                        {/* <span className="session-time">{event.description}</span> */}
                        {/* <span className="session-track">Track: 1</span>
                        <span className="session-presenter">Presenter</span> */}
                    </div >
                )
            });
            setEvents(eventComponents);
        })
    }, [startOfWeek, endOfWeek]);

    const times = [];
    let d = new Date(2022, 1, 1, 6);
    const endDate = new Date(2022, 1, 1, 19, 30);
    let i = 0;
    while (d < endDate) {
        times.push([d.getHours(), d.getMinutes()])
        // times.push((d.getHours() % 12) + ':' + d.getMinutes() + (i++ % 2 != 0 ? "" : "0") + (d.getHours() > 12 ? " pm" : " am"));
        d = moment(d).add(30, 'm').toDate();
    }
    return (
        <div >
            <div styles={{ marginLeft: 100 }} >
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

            {/* <div className="text">
                <h1>Conference Schedule with CSS Grid</h1>

                <p>Demo for article <a href="https://css-tricks.com/building-a-conference-schedule-with-css-grid/">"Building a Conference Schedule with CSS Grid"</a> on CSS Tricks.</p>

                <p><i><small>By <a href="https://MRWweb.com">Mark Root-Wiley</a>.</small></i></p>

            </div> */}

            {/* <h2 id="schedule-heading">MONTH</h2> */}
            <div className="schedule" aria-labelledby="schedule-heading">

                {/* Time */}
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-1", gridRow: "tracks" }} >Sun</span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-2", gridRow: "tracks" }} >Mon</span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-3", gridRow: "tracks" }} >Tue</span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-4", gridRow: "tracks" }} >Wed</span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-5", gridRow: "tracks" }} >Thu</span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-6", gridRow: "tracks" }} >Fri</span>
                <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-7", gridRow: "tracks" }} >Sat</span>

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