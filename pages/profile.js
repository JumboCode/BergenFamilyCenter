import * as React from "react";
import NavBar from "../components/navBar.js";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { db } from "../firebase/firebase";
import PhotoPopUp from "../components/photoPopUp";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    const [name, setName] = useState(auth.currentUser?.displayName ?? "you must be logged in");
    const [open, setOpen] = useState(true);
    useEffect(() => {
        if (uid) {
            const userRef = doc(db, "users", uid);
            const userInfo = getDoc(userRef).then(value => {
                setName(value.data().name);
            });
        }
    }, []);

    return (
        <div>
            <NavBar page={"profile"}></NavBar>
            <Typography variant="h4">
                Hello, {name}
            </Typography>
            <PhotoPopUp open={open} setOpen={setOpen} />
        </div>
    )
}
