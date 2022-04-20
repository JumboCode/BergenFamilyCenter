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

    const [name, setName] = useState(auth.currentUser?.displayName ?? "you must be logged in");
    const [email, setEmail] = useState(auth.currentUser?.email ?? "you must be logged in");
    const [phoneNumber, setPhoneNumber] = useState("you must be logged in");
    const [address, setAddress] = useState("you must be logged in");

    const [open, setOpen] = useState(true);
    const [editing, setEditing] = useState(false);

    const [previousEvents, setPreviousEvents] = useState([]);

    useEffect(() => {
        if (uid) {
            const userRef = doc(db, "users", uid);
            const currentTime = Timestamp.now()

            const userInfo = getDoc(userRef).then(value => {
                setName(value.data().name);
                setEmail(value.data().email);
                setPhoneNumber(value.data().phoneNumber);
                setAddress(value.data().address);
                firebaseUserPreviousEvents(currentTime).then(value => setPreviousEvents(value));
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
                                <Box key={event}>
                                    <UpcomingEvent style={{ width: "100%", height: "100%" }} eventID={event.id} key={event}></UpcomingEvent>
                                </Box>
                            );
                        }) :
                        null
                    }
                </Box>
            </Box >
        </div >
    )
}
