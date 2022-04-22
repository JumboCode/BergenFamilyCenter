import * as React from "react";
import NavBar from "../components/navBar.js";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { db } from "../firebase/firebase";
import * as yup from 'yup';
import PhotoPopUp from "../components/photoPopUp";
import { updateUser } from "../src/userFunctions";
import { firebaseUserPreviousEvents } from "../src/firebaseEvents";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import UpcomingEvent from "../components/upcomingEvent.js";
import Alert from '@mui/material/Alert';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import EmailIcon from '@mui/icons-material/Email';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';




const validationSchema = yup.object({
    name: yup
        .string('Enter your name'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email'),
    phoneNumber: yup
        .string('Enter your phone number'),
    address: yup
        .string('Enter your address')
});

export default function Profile() {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    const [user, setUser] = useState(null);
    const [isManager, setIsManager] = useState(false)

    const [name, setName] = useState(auth.currentUser?.displayName ?? "you must be logged in");
    const [email, setEmail] = useState(auth.currentUser?.email ?? "you must be logged in");
    const [phoneNumber, setPhoneNumber] = useState("you must be logged in");
    const [address, setAddress] = useState("you must be logged in");

    const [open, setOpen] = useState(true);
    const [editing, setEditing] = useState(false);

    const [previousEvents, setPreviousEvents] = useState([]);
    const [managerEvents, setManagerEvents] = useState([]);

    const [copiedAlertVisible, setCopiedAlertVisible] = useState(false);

    // TODO CREATE USER TO PASS TO OTHER THING
    useEffect(() => {
        if (uid) {
            const userRef = doc(db, "users", uid);
            const currentTime = Timestamp.now()

            const userInfo = getDoc(userRef).then(value => {
                setUser({ ...value.data(), id: uid });
                setIsManager(value.data().isManager);
                setName(value.data().name);
                setEmail(value.data().email);
                setPhoneNumber(value.data().phoneNumber);
                setAddress(value.data().address);
                firebaseUserPreviousEvents(currentTime).then(value => setPreviousEvents(value));

                if (value.data().isManager) {

                    const userRef = doc(db, "users", uid);

                    getDoc(userRef).then(value => {
                        const manager_events_run = value.data().eventsRun;
                        const all_events = []
                        manager_events_run.map((event) => {
                            const all_attendees = []
                            const all_emails = []
                            getDoc(event.attendeesRef).then(attendeesDoc => {
                                attendeesDoc.data().attendees.map(attendees => {
                                    all_attendees.push(attendees.attendees);
                                    getDoc(attendees.parent).then(parent => {
                                        all_emails.push(parent.data().email)
                                    })
                                })
                            });
                            all_events.push({ name: event.name, eventAttendees: all_attendees, email: all_emails })
                        });
                        setManagerEvents(all_events)
                    })
                }
            });
        }
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            address: address
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateUser(uid, { name: values.name })
            updateUser(uid, { email: values.email })
            updateUser(uid, { phoneNumber: values.phoneNumber })
            updateUser(uid, { address: values.address })
        },
    });



    function NestedList() {
        const [open, setOpen] = useState({});
        const [emails, setEmails] = useState({});
        useEffect(() => {
            const listOpen = {}
            const allEmails = {}
            managerEvents.map((event) => {
                listOpen[event.name] = false
                allEmails[event.name] = event.email
            })
            setOpen(listOpen)
            setEmails(allEmails)

        }, []);

        const handleClickList = (event) => {
            const tempListOpen = { ...open }
            tempListOpen[event.name] = !tempListOpen[event.name]
            setOpen(tempListOpen);
        };

        const getEmails = (event) => {
            navigator.clipboard.writeText(emails[event.name]);
            setCopiedAlertVisible(true);
        };

        return (
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Event Being Managed:
                    </ListSubheader>
                }
            >
                {managerEvents.map((event) => {
                    return <List key={event} >
                        <ListItem>
                            <ListItemButton onClick={async () => { await handleClickList(event) }}>
                                <ListItemText primary={event.name} />
                                {open[event.name] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <IconButton edge="end" aria-label="email" onClick={async () => { await getEmails(event) }}>
                                <EmailIcon />
                            </IconButton>
                        </ListItem>
                        <Collapse in={open[event.name]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {event.eventAttendees.map((attendees) => {
                                    return Object.entries(attendees).map((person) => {
                                        return <ListItemButton key={person} sx={{ pl: 4 }}>
                                            <ListItemText primary={person[0] + ", " + person[1]} />
                                        </ListItemButton>
                                    })
                                })
                                }
                            </List>
                        </Collapse>
                    </List>
                })
                }
            </List>
        );
    }

    return (
        <div>
            <NavBar page={"profile"}></NavBar>
            <PhotoPopUp open={open} setOpen={setOpen} />
            <Box style={{ display: "flex", alignItems: "left", flexDirection: "row" }}>
                <Box style={{ width: "30%", margin: "2%" }}>
                    <Typography component="h1" variant="h6">
                        {"Information:"}
                    </Typography>
                    <form style={{ display: "flex", alignItems: "left", flexDirection: "column" }} onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{ width: "100%" }}
                            disabled={!editing}
                            margin="normal"
                            id="name"
                            label="Name: "
                            autoFocus
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                        />
                        <TextField
                            style={{ width: "100%" }}
                            disabled={!editing}
                            margin="normal"
                            id="email"
                            label="Email: "
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                        />
                        <TextField
                            style={{ width: "100%" }}
                            disabled={!editing}
                            margin="normal"
                            id="phoneNumber"
                            label="Phone Number: "
                            autoFocus
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        />
                        <TextField
                            style={{ width: "100%" }}
                            disabled={!editing}
                            margin="normal"
                            id="address"
                            label="Address: "
                            autoFocus
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                        />
                        <div hidden={editing}>
                            <Button onClick={() => { setEditing(!editing) }}> Edit </Button>
                        </div>
                        <div hidden={!editing}>
                            <Box style={{ display: "flex", alignItems: "left", flexDirection: "row" }}>
                                <Button
                                    style={{ width: "100%", margin: "1%" }}
                                    type="submit"
                                    color="primary"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => { setEditing(!editing) }}
                                >
                                    Save
                                </Button>
                                <Button
                                    hidden
                                    style={{ width: "100%", margin: "1%" }}
                                    variant="outlined"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => { setEditing(!editing) }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </div>
                    </form>
                </Box >
                <Box component="div" sx={{ overflow: 'auto', width: "20%", margin: "2%", height: "80vh" }}>
                    < Typography component="h1" variant="h6" >
                        {"Past Events:"}
                    </Typography>
                    {Object.keys(previousEvents).length >= 0 ?
                        previousEvents.sort((a, b) => (b.startTime - a.startTime)).map((event) => {
                            return (
                                <Box key={event.id} sx={{ p: 2 }}>
                                    <UpcomingEvent user={user} {...event}></UpcomingEvent>
                                </Box>
                            );
                        }) :
                        null
                    }
                </Box>
                {isManager ?
                    <Box style={{ width: "30%", margin: "2%" }}>
                        < Typography component="h1" variant="h6" >
                            {"Manager Functions:"}
                        </Typography>

                        <NestedList></NestedList>
                        {copiedAlertVisible ?
                            <Alert severity="success" action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setCopiedAlertVisible(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }>Copied Emails!</Alert>
                            : null}
                    </Box>
                    : null}
            </Box >
        </div >
    )
}
