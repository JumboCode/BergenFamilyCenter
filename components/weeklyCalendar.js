import { useState, useEffect, useContext } from "react";
import { firebaseFilterEventsChronologicalWeek } from "../src/firebaseEvents";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import EventDialog from "./eventDialog";
import { LanguageContext } from '../src/languageContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "50vh",
    [theme.breakpoints.up("md")]: {
      height: "80vh",
    },
  },
}));

export default function WeeklyCalendar({
  selectedDay,
  user,
  setSelectedDay,
  divisions,
  setDivisions,
  gtDivisions,
}) {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const start = new Date();
  const options = { month: "long", day: "numeric" };
  const { language, _ } = useContext(LanguageContext);
  const inEnglish = language === "English";

  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  const [startOfWeek, setStartOfWeek] = useState(start);
  const [endOfWeek, setEndOfWeek] = useState(end);
  const currentWeek = startOfWeek.getTime() === start.getTime();

  useEffect(() => {
    if (selectedDay < startOfWeek || selectedDay > endOfWeek) {
      const start = new Date(selectedDay);
      start.setDate(start.getDate() - start.getDay());
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 7);
      setStartOfWeek(start);
      setEndOfWeek(end);
    }
  }, [selectedDay]);

  const roundToNearest15 = (date) => {
    const minutes = 15;
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
    if (e1.startTime >= e2.endTime) {
      return false;
    }
    if (e2.startTime >= e1.endTime) {
      return false;
    }
    if (e2.endTime <= e1.startTime) {
      return false;
    }
    if (e1.endTime <= e2.startTime) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (gtDivisions.length !== 0) {
      firebaseFilterEventsChronologicalWeek(
        startOfWeek,
        endOfWeek,
        gtDivisions
      ).then((v) => {
        setEventData(v);
      });
    }
  }, [startOfWeek, endOfWeek, gtDivisions]); // REMOVE DIVISOINS

  useEffect(() => {
    const v = eventData.filter(e => divisions.includes(e.division));
    const eventDays = [];
    const overlaps = [];
    for (let i = 0; i < 7; i++) {
      eventDays.push([]);
    }

    v.forEach((e) => {
      eventDays[e.startTime.toDate().getDay()].push(e);
      overlaps.push(0);
    });

    const eventComponents = v.map((event, i) => {
      const className = `session track-all session-${i} track-${gtDivisions.indexOf(event.division) + 1
        }`;
      const start = roundToNearest15(event.startTime.toDate());
      const hourStart = start.getHours();
      const minuteStart = start.getMinutes();
      const day = start.getDay();

      const end = roundToNearest15(event.endTime.toDate());
      const hourEnd = end.getHours();
      const minuteEnd = end.getMinutes();

      const startString = mapTime(hourStart, minuteStart);
      const endString = mapTime(hourEnd, minuteEnd);
      const gridRow = `time-${startString} / time-${endString}`;

      let overlap = false;
      let overlapAmount = 0;
      const overlapBeta = 1.5;
      const dayIndex = eventDays[day].indexOf(event);
      eventDays[day].forEach((e, z) => {
        if (e !== event) {
          if (eventsOverlap(e, event) && dayIndex > z) {
            if (
              start.getTime() >
              roundToNearest15(e.startTime.toDate()).getTime()
              && !overlap
            ) {
              overlap = true;
              overlapAmount += overlaps[i - 1] + 1;
            } else if (
              start.getTime() ===
              roundToNearest15(e.startTime.toDate()).getTime() &&
              end.getTime() !==
              roundToNearest15(e.endTime.toDate()).getTime() &&
              !overlap
            ) {
              overlapAmount += overlaps[i - 1] + 2;
              overlap = true;
            } else if (
              start.getTime() ===
              roundToNearest15(e.startTime.toDate()).getTime() &&
              end.getTime() ===
              roundToNearest15(e.endTime.toDate()).getTime() &&
              !overlap
            ) {
              overlapAmount += overlaps[i - 1] + 2;
              overlap = true;
            }
          }
        }
      });
      if (overlap) {
        overlaps[i] = overlapAmount;
      } else {
        overlaps[i] = 0;
      }
      return (
        <Grid
          onClick={() => {
            setSelectedEvent(event);
            setOpen(true);
          }}
          item
          key={i}
          className={className}
          style={{
            marginLeft: `${overlapAmount * overlapBeta}em`,
            gridColumn: `track-${day + 1}`,
            gridRow: gridRow,
          }}
        >
          <Typography variant="body2">{event.name}</Typography>
          {/* <Typography variant="subtitle2">{event.description}</Typography> */}
          {/* <span className="session-time">{event.description}</span> */}
          {/* <span className="session-track">Track: 1</span>
                      <span className="session-presenter">Presenter</span> */}
        </Grid>
      );
    });
    setEvents(eventComponents);
  }, [eventData, divisions])

  const times = [];
  let d = new Date(2022, 1, 1, 7);
  const endDate = new Date(2022, 1, 1, 19, 30);
  let i = 0;
  while (d < endDate) {
    times.push([d.getHours(), d.getMinutes()]);
    // times.push((d.getHours() % 12) + ':' + d.getMinutes() + (i++ % 2 != 0 ? "" : "0") + (d.getHours() > 12 ? " pm" : " am"));
    d = moment(d).add(30, "m").toDate();
  }
  return (
    <div>
      <div className="week">
        <Grid
          container
          direction="row"
          sx={{ height: "100%" }}
          alignItems="center"
        >
          {/* <Grid item
            xs={12}
            display={{ xs: "block", sm: "block" }}
          >
            <CheckboxLabels
              divisions={divisions}
              gtDivisions={gtDivisions}
              setDivisions={setDivisions}
            />
          </Grid> */}
          <Grid item>
            <IconButton
              onClick={() => {
                const d = new Date(startOfWeek);
                const d2 = new Date(endOfWeek);
                d.setDate(d.getDate() - 7);
                d2.setDate(d2.getDate() - 7);
                setStartOfWeek(d);
                setEndOfWeek(d2);
                const temp = new Date(selectedDay);
                temp.setDate(temp.getDate() - 7);
                setSelectedDay(temp); // TODO FIX
              }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                const d = new Date(startOfWeek);
                const d2 = new Date(endOfWeek);
                d.setDate(d.getDate() + 7);
                d2.setDate(d2.getDate() + 7);
                setStartOfWeek(d);
                setEndOfWeek(d2);
                const temp = new Date(selectedDay);
                temp.setDate(temp.getDate() + 7);
                setSelectedDay(temp); // TODO FIX
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography styles={{ float: "right" }} variant="h6">

              {startOfWeek.toLocaleDateString(inEnglish ? "en-US" : "es-ES", options)} -{" "}
              {endOfWeek.toLocaleDateString(inEnglish ? "en-US" : "es-ES", options)}
            </Typography>
          </Grid>
        </Grid>
      </div>

      <Box
        className={clsx("schedule-container", classes.root)}
        sx={{ display: "flex", flexDirection: "column", overflow: "auto" }}
      >
        {!open ? null : (
          <EventDialog
            open={open}
            setOpen={setOpen}
            description={selectedEvent?.description}
            title={selectedEvent?.name}
            image={selectedEvent?.image}
            className={""}
            startTime={selectedEvent?.startTime}
            endTime={selectedEvent?.endTime}
            manager={selectedEvent?.manager}
            event={selectedEvent?.id}
            attendees={selectedEvent?.attendeesRef}
            user={user}
            ageLow={selectedEvent?.ageLow}
            ageHigh={selectedEvent?.ageHigh}
            maxAttendees={selectedEvent?.maxAttendees}
          />
        )}

        <div className="schedule" aria-labelledby="schedule-heading">
          {currentWeek ? (
            <span
              className="current-day"
              aria-hidden="true"
              style={{
                gridColumn: `track-${new Date().getDay() + 1}`,
                gridRow: "tracks / time-7000",
              }}
            ></span>
          ) : null}

          {/* Time */}
          <span
            className="track-slot"
            aria-hidden="true"
            style={{ gridColumn: "times / track-8", gridRow: "tracks" }}
          ></span>
          <span
            className="track-slot"
            aria-hidden="true"
            style={{ gridColumn: "track-1", gridRow: "tracks" }}
          >
            {inEnglish ? "Sun" : "Dom"}
          </span>
          <span
            className="track-slot"
            aria-hidden="true"
            style={{ gridColumn: "track-2", gridRow: "tracks" }}
          >
            {inEnglish ? "Mon" : "Lun"}
          </span>
          <span
            className="track-slot"
            aria-hidden="true"
            style={{ gridColumn: "track-3", gridRow: "tracks" }}
          >
            {inEnglish ? "Tue" : "Mar"}
          </span>
          <span
            className="track-slot"
            aria-hidden="true"
            style={{ gridColumn: "track-4", gridRow: "tracks" }}
          >
            {inEnglish ? "Wed" : "Mié"}
          </span>
          <span
            className="track-slot"
            aria-hidden="true"
            style={{ gridColumn: "track-5", gridRow: "tracks" }}
          >
            {inEnglish ? "Thu" : "Jue"}
          </span>
          <span
            className="track-slot"
            aria-hidden="true"
            style={{ gridColumn: "track-6", gridRow: "tracks" }}
          >
            {inEnglish ? "Fri" : "Vie"}
          </span>
          <span
            className="track-slot"
            aria-hidden="true"
            style={{ gridColumn: "track-7", gridRow: "tracks" }}
          >
            {inEnglish ? "Sat" : "Sáb"}
          </span>
          {/* <span className="track-slot" aria-hidden="true" style={{ gridColumn: "track-8", gridRow: "tracks" }} ></span> */}

          {/* Day Breaks */}
          <span
            className="track-int"
            style={{ gridColumn: "track-0-int", gridRow: "tracks / time-7000" }}
          ></span>
          <span
            className="track-int"
            style={{ gridColumn: "track-1-int", gridRow: "tracks / time-7000" }}
          ></span>
          <span
            className="track-int"
            style={{ gridColumn: "track-2-int", gridRow: "tracks / time-7000" }}
          ></span>
          <span
            className="track-int"
            style={{ gridColumn: "track-3-int", gridRow: "tracks / time-7000" }}
          ></span>
          <span
            className="track-int"
            style={{ gridColumn: "track-4-int", gridRow: "tracks / time-7000" }}
          ></span>
          <span
            className="track-int"
            style={{ gridColumn: "track-5-int", gridRow: "tracks / time-7000" }}
          ></span>
          <span
            className="track-int"
            style={{ gridColumn: "track-6-int", gridRow: "tracks / time-7000" }}
          ></span>
          <span
            className="track-int"
            style={{ gridColumn: "track-7-int", gridRow: "tracks / time-7000" }}
          ></span>

          {/* <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-int" }} ></span> */}
          {/* <span className="time-int" style={{ gridColumn: "times / track-8", gridRow: "time-1-int" }}></span> */}
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-2-int" }}
          ></span>
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-3-int" }}
          ></span>
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-4-int" }}
          ></span>
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-5-int" }}
          ></span>
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-6-int" }}
          ></span>
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-7-int" }}
          ></span>
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-8-int" }}
          ></span>
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-9-int" }}
          ></span>
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-10-int" }}
          ></span>
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-11-int" }}
          ></span>
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-12-int" }}
          ></span>
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-13-int" }}
          ></span>
          <span
            className="time-int"
            style={{ gridColumn: "times / track-8", gridRow: "time-14-int" }}
          ></span>
          {/* ${t[0] > 12 ? "pm" : "am"} */}
          {/* :${t[1] == 0 ? "00" : t[1]} */}
          {events.map((e) => e)}
          {times.map((t, i) => (
            <Typography
              variant="inherit"
              key={i}
              className="time-slot"
              style={{ gridRow: `time-${mapTime(t[0], t[1])}` }}
            >{`${t[1] == 0 ? (t[0] > 12 ? t[0] % 12 : t[0]) : ""}`}</Typography>
          ))}
        </div>
      </Box>
    </div>
  );
}
