import * as React from "react";
import { Typography, Grid, Box, Popover, IconButton } from "@mui/material";
import NavBar from "../components/navBar.js";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { MonthCalendar } from "../components/calendar";
import WeeklyCalendar from "../components/weeklyCalendar";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase";
import MyUpcomingEvent from "../components/myUpcomingEvents";
import EventDialog from "../components/eventDialog";
import { makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import CheckboxLabels from "../components/calendarFilter";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useSearchParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  events: {
    // overflow: "hidden",
    // '&:hover': {
    //     overflowY: "scroll",
    // }
  },
}));

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const [user, setUser] = useState(null);
  const classes = useStyles();
  const [searchParams, _] = useSearchParams();
  const [divisions, setDivisions] = useState([]);

  const [openEvent, setOpenEvent] = useState(false);
  const [eventDoc, setEventDoc] = useState({});

  const myEvents = (
    <div>{user ? <MyUpcomingEvent user={user}></MyUpcomingEvent> : null}</div>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if (uid) {
      const userRef = doc(db, "users", uid);
      const userInfo = getDoc(userRef).then((value) => {
        setUser({ ...value.data(), id: uid });
      });
      const eid = searchParams.get("event");
      if (eid !== undefined && eid !== null) {
        const eDoc = doc(db, "events", eid);
        getDoc(eDoc).then(v => {
          if (v.data() !== undefined) {
            setOpenEvent(true);
            setEventDoc({ ...v.data(), attendees: v.data().attendeesRef, event: v.id })
          }
        })
      }
    }
  }, []);

  const gtDivisions = [
    "Early Learning Center/Home",
    "Family Success Center",
    "HIV/Outreach Services",
    "Visiting Program",
    "Senior Services",
    "Adolescent Services",
    "Clinical Services",
  ];

  return (
    <Box>
      <NavBar page={"calendar"}></NavBar>
      {
        openEvent ?
          <EventDialog open={openEvent} setOpen={setOpenEvent} {...eventDoc} user={user} /> : null
      }
      {/* <Grid
        sx={{ p: 2, display: "flex" }}
        container
        spacing={2}
        alignItems="stretch"
      >
        <Grid
          sx={{ display: "flex", flexDirection: "column", minWidth: 320 }}
          item
          xs={false}
          sm={3}
          md={3}
        > */}
      <Box sx={{
        display: 'flex',
        mx: 1,
        mt: 1,
        height: "calc(100vh - 90px)",
        // overflowY: 'hidden'
      }}
      >
        <Box display={{
          display: "flex",
          xs: "none",
          sm: "block",
          width: 320,
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': { display: "none" }
        }}>
          {myEvents}
          <Divider />
          <Box sx={{ flex: "1 0" }}></Box>
          <Box sx={{ mt: 1 }}>
            <CheckboxLabels
              divisions={divisions}
              gtDivisions={gtDivisions}
              setDivisions={setDivisions}
            />
          </Box>
          <Divider />
          <MonthCalendar date={selectedDay} onChangeDate={setSelectedDay} />

        </Box>
        {/* </Grid> */}
        {/* <Grid
        // item
        // sx={{ display: "flex", flexDirection: "column" }}
        // xs={12}
        // sm={9}
        // md={9}
        > */}
        {/* </Grid> */}
        {/* <Grid item display={{ xs: "block", sm: "none" }}> */}
        {/* {myEvents} */}
        {/* </Grid> */}
        {/* </Grid> */}
        <Box sx={{ width: "100%", flex: "1 0" }}>
          <Box display={{ xs: "block", sm: "none" }}>
            <IconButton
              aria-describedby={id}
              // color="secondary"
              onClick={handleClick}
            >
              <CalendarMonthIcon />
              <Typography> Filter Division </Typography>
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <CheckboxLabels
                divisions={divisions}
                gtDivisions={gtDivisions}
                setDivisions={setDivisions}
              />
            </Popover>
          </Box>
          <WeeklyCalendar
            user={user}
            divisions={divisions.length == 0 ? gtDivisions : divisions}
            setDivisions={setDivisions}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            gtDivisions={gtDivisions}
          />

          <Box display={{ display: "flex", xs: "block", sm: "none", width: 350 }}>
            {myEvents}
          </Box>
        </Box>
        {/* <Box display={{ display: "flex", xs: "none", sm: "block", width: 300 }}>
        </Box> */}
      </Box>
    </Box >
  );
}
