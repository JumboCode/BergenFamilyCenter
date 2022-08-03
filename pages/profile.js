import { useState, useEffect, useContext } from "react";
import NavBar from "../components/navBar.js";
import { getAuth } from "firebase/auth";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { db } from "../firebase/firebase";
import * as yup from 'yup';
import PhotoPopUp from "../components/photoPopUp";
import { updateUser } from "../src/userFunctions";
import { firebaseUserPreviousEvents, generateQuery } from "../src/firebaseEvents";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import UpcomingEvent from "../components/upcomingEvent.js";
import Alert from '@mui/material/Alert';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import EmailIcon from '@mui/icons-material/Email';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import LinkIcon from '@mui/icons-material/Link';
import { LanguageContext } from '../src/languageContext';
import { firebaseGetDivisions } from "../src/firebaseDivisions"


export default function Profile() {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    const [user, setUser] = useState(null);
    const [isManager, setIsManager] = useState(false)

    const [name, setName] = useState(auth.currentUser?.displayName ?? "you must be logged in");
    const [email, setEmail] = useState(auth.currentUser?.email ?? "you must be logged in");
    // const [name, setName] = useState(auth.currentUser?.displayName ?? "you must be logged in");
    // const [email, setEmail] = useState(auth.currentUser?.email ?? "you must be logged in");
    const [phoneNumber, setPhoneNumber] = useState("Enter Phone Number");
    const [address, setAddress] = useState("Enter Address");

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);

    const [previousEvents, setPreviousEvents] = useState([]);
    const [managerEvents, setManagerEvents] = useState([]);

    const [copiedSingularVisible, setCopiedSingularVisible] = useState(false);
    const [copiedAlertVisible, setCopiedAlertVisible] = useState(false);
    const [copiedLinkAlertVisible, setCopiedLinkAlertVisible] = useState(false);

    const { language, _ } = useContext(LanguageContext);
    const inEnglish = language === "English";

    const validationSchema = yup.object({
        name: yup
            .string('Enter your name'),
        email: yup
            .string('Enter your email')
            .email(inEnglish ? 'Enter a valid email' : "Entrar un correo"),
        phoneNumber: yup
            .string('Enter your phone number'),
        address: yup
            .string('Enter your address')
    });

    // TODO CREATE USER TO PASS TO OTHER THING
    useEffect(() => {
        if (uid) {
            const userRef = doc(db, "users", uid);
            const currentTime = Timestamp.now()
            firebaseGetDivisions().then(divisions => setGTDivisions(divisions.map(d => d.name)))
            firebaseUserPreviousEvents(currentTime).then(v => Promise.all(v).then(v => { console.log(v); setPreviousEvents(v.filter(e => e !== undefined)) }))


            // value => { console.log("GOT IT"); setPreviousEvents(value) });
            const userInfo = getDoc(userRef).then(value => {
                setUser({ ...value.data(), id: uid });
                setIsManager(value.data().isManager);
                setName(value.data().name);
                setEmail(value.data().email);
                setPhoneNumber(value.data().phoneNumber);
                setAddress(value.data().address);

                if (value.data().isManager) {
                    // const userRef = doc(db, "users", uid);
                    // getDoc(userRef).then(value => {
                    const manager_events_run = value.data().eventsRun;
                    const all_events = []
                    manager_events_run.map((event) => {
                        const parentChild = []
                        getDoc(event.attendeesRef).then(attendeesDoc => { // gets attendees document
                            console.log(event)
                            attendeesDoc.data().attendees.map(attendees => { //maps through attendees corresponding to each parent
                                getDoc(attendees.parent).then(parent => { //grab that set of attendees' parent 
                                    if (attendees) {

                                        if (parent.data().consent) {
                                            parentChild.push({ email: parent.data().email, children: attendees, consent: parent.data().consent.overallConsent })
                                        }
                                        else {
                                            parentChild.push({ email: parent.data().email, children: attendees, consent: "no consent form filled out" })

                                        }
                                    }
                                })
                            })
                        });
                        console.log(event.attendeesRef)
                        generateQuery(event.attendeesRef).then(v => {
                            all_events.push({ name: event.name, eventAttendees: parentChild, id: v })
                        })
                    });
                    setManagerEvents(all_events)
                    // })
                }
            });
        }

    }, []);
    const [gtDivisions, setGTDivisions] = useState([]);

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
                const emailsForEvent = []
                event.eventAttendees.map((attendees) => {
                    emailsForEvent.push(attendees.email)
                })
                listOpen[event.name] = false
                allEmails[event.name] = emailsForEvent
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

        const getEmail = (attendees, event) => {
            navigator.clipboard.writeText(attendees.email);
            setCopiedSingularVisible(true);
            const tempListOpen = { ...open }
            tempListOpen[event.name] = false
            setOpen(tempListOpen);
        }

        return (
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        {inEnglish ? "Events Managing" : "Eventos"}
                    </ListSubheader>
                }
            >
                {managerEvents.map((event, index) => {
                    return <List key={index} >
                        <ListItem>
                            <ListItemButton onClick={() => { handleClickList(event) }}>
                                <ListItemText primary={event.name} />
                                {open[event.name] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <IconButton edge="end" aria-label="email" onClick={() => { getEmails(event) }}>
                                <EmailIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="Link" onClick={() => {
                                navigator.clipboard.writeText(window.location.href.replace('profile', 'calendar') + "?" + event.id);
                                setCopiedLinkAlertVisible(true);
                            }}>
                                <LinkIcon />
                            </IconButton>
                        </ListItem>
                        <Collapse in={open[event.name]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {event.eventAttendees.map((attendees) => {
                                    let text = ""
                                    Object.entries(attendees.children.attendees).map((person) => {
                                        { text += person[0] + "," + "\xa0" + person[1] + ";\xa0\xa0\xa0" }
                                    })
                                    return (
                                        <ListItemButton key={attendees} sx={{ pl: 6 }}>
                                            <ListItemText primary={text} secondary={"Photo Consent: " + attendees.consent} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="email" onClick={e => { getEmail(attendees, event); e.stopPropagation(); }}>
                                                    <EmailIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                    )
                                })
                                }
                            </List>
                        </Collapse>
                        {index < Object.keys(managerEvents).length - 1 &&
                            <Divider />}
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
                <Grid container spacing={2} sx={{ m: 2 }}>
                    <Grid item xs={4}>
                        <Box style={{ width: "100%" }}>
                            <Typography component="h1" variant="h6">
                                {inEnglish ? "Information:" : "Información:"}
                            </Typography>
                            <form style={{ display: "flex", alignItems: "left", flexDirection: "column" }} onSubmit={formik.handleSubmit}>
                                <TextField
                                    style={{ width: "100%" }}
                                    disabled={!editing}
                                    margin="normal"
                                    id="name"
                                    label={inEnglish ? "Name: " : "Nombre: "}
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
                                    label={inEnglish ? "Email: " : "Correo: "}
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
                                    label={inEnglish ? "Phone Number: " : "Número de Teléfono "}
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
                                    label={inEnglish ? "Address: " : "Dirección: "}
                                    autoFocus
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                />
                                <div hidden={editing}>
                                    <Button onClick={() => { setEditing(!editing) }}> {inEnglish ? "Edit" : "Editar"} </Button>
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
                                            {inEnglish ? "Save" : "Guardar"}
                                        </Button>
                                        <Button
                                            hidden
                                            style={{ width: "100%", margin: "1%" }}
                                            variant="outlined"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={() => { setEditing(!editing) }}
                                        >
                                            {inEnglish ? "Cancel" : "Cancelar"}
                                        </Button>
                                    </Box>
                                </div>
                                <div>
                                    <Button onClick={() => setOpen(true)}>{(inEnglish ? "Edit" : "Editar") + " 'Photo Consent'"}</Button>
                                </div>
                            </form>
                        </Box >
                    </Grid>
                    <Grid item xs={isManager ? 5 : 8}>
                        <Box component="div" sx={{ overflow: 'auto', width: "100%", height: "80vh" }}>
                            < Typography component="h1" variant="h6" >
                                {inEnglish ? "Past Events:" : "Eventos Pasados:"}
                            </Typography>
                            <Grid container spacing={2} sx={{ p: 1 }} alignItems="center"
                                justifyContent="center"
                            >
                                {Object.keys(previousEvents).length >= 0 ?
                                    previousEvents.sort((a, b) => (b.startTime - a.startTime)).map((event) => {
                                        return (
                                            <Grid key={event.id} item xs={isManager ? 6 : 4}>
                                                <UpcomingEvent gtDivisions={gtDivisions} user={user} {...event}></UpcomingEvent>
                                            </Grid>
                                        );
                                    }) :
                                    null
                                }
                            </Grid>
                        </Box>
                    </Grid>

                    {isManager ?
                        <Grid item xs={3}>
                            <Box style={{ width: "100%" }}>
                                < Typography component="h1" variant="h6" >
                                    {inEnglish ? "Manager Information:" : "Información para el Gerente:"}
                                </Typography>

                                <NestedList></NestedList>
                                <Snackbar open={copiedAlertVisible} autoHideDuration={3000} onClose={() => { setCopiedAlertVisible(false) }}>
                                    <Alert severity="success" >
                                        Copied Emails!</Alert>
                                </Snackbar>
                                <Snackbar open={copiedSingularVisible} autoHideDuration={3000} onClose={() => { setCopiedSingularVisible(false) }}>
                                    <Alert severity="success" >
                                        Copied Email!</Alert>
                                </Snackbar>
                                <Snackbar open={copiedLinkAlertVisible} autoHideDuration={3000} onClose={() => { setCopiedLinkAlertVisible(false) }}>
                                    <Alert severity="success" >
                                        Copied Link!</Alert>
                                </Snackbar>
                            </Box>
                        </Grid>
                        : null}
                </Grid>
            </Box >
        </div >
    )
}
