import { Grid, Typography, Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase";
import NavBar from "../components/navBar.js";
import ScrollingCard from "../components/scrollingCards";

export default function Events() {
    const divisions = ['Early Learning Center/Home', "Family Success Center", "HIV/Outreach Services", "Visiting Program", "Senior Services", "Adolescent Services", "Clinical Services"];
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (uid) {
            const userRef = doc(db, "users", uid);
            const userInfo = getDoc(userRef).then(value => {
                setUser({ ...value.data(), id: uid });
            });
        }
    }, []);

    return (
        (
            <div>
                <NavBar page={"events"}></NavBar>
                <Box sx={{ px: 2 }}>
                    {divisions.map((d, i) =>
                        <Box key={i} sx={{ pb: 2 }}>
                            <Typography variant="h5">{d}</Typography>
                            {user ?
                                <ScrollingCard user={user} division={[d]}></ScrollingCard> :
                                null
                            }
                        </Box>
                    )}
                </Box>
            </div>
        )
    )
}
