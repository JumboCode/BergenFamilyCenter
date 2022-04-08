import { Grid, Typography, Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase";
import NavBar from "../components/navBar.js";
import ScrollingCard from "../components/scrollingCards";
import { firebaseGetDivisions } from "../src/firebaseDivisions"
import { PrecisionManufacturingTwoTone } from '@mui/icons-material';

// import { Grid, Typography, Box, Button } from '@mui/material';
// import { useState, useEffect } from 'react';
// import { doc, getDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { db } from "../firebase/firebase";
// import NavBar from "../components/navBar.js";
// import ScrollingCard from "../components/scrollingCards";


export default function Events() {
    const [divisions, setDivisions] = useState([]);
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    const [user, setUser] = useState(null);

    // const divisionLabels = () => {
    //     firebaseGetDivisions().then((divisions) => {
    //         setDivisions(

    //         );
    //     });
    // };

    useEffect(() => {
        if (uid) {
            const userRef = doc(db, "users", uid);
            const userInfo = getDoc(userRef).then(value => {
                setUser({ ...value.data(), id: uid });
            });
            firebaseGetDivisions().then(divisions => setDivisions(divisions))
        }
    }, []);

    return (
        <div>
            <NavBar page={"events"}></NavBar>
            <Box sx={{ px: 2 }}>
                {divisions.map((division) => {
                    return (
                        <Box sx={{ pb: 2 }} key={division.name}>
                            <Typography variant="h5">{division.name}</Typography>
                            {user ?
                                <ScrollingCard user={user} division={[division.name]}></ScrollingCard> :
                                null
                            }
                        </Box>
                    );
                })}
            </Box>
        </div>
    );
} 
