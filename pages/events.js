import { Grid, Typography, Box, Button } from '@mui/material';
import Event from "../components/event";
import NavBar from "../components/navBar.js";
import ScrollingCard from "../components/scrollingCards";
import { useState, useEffect } from "react";
import { firebaseGetDivisions } from "../src/firebaseDivisions"
import { PrecisionManufacturingTwoTone } from '@mui/icons-material';

export default function Events() {
    const [divisions, setDivisions] = useState([]);

    const divisionLabels = () => {
        firebaseGetDivisions().then((divisions) => {
            setDivisions(
                divisions.map((division) => {
                    return (
                        <Box sx={{ pb: 2 }} key={division.name}>
                            <Typography variant="h5">{division.name}</Typography>
                            <ScrollingCard division={[division.name]}></ScrollingCard>
                        </Box>
                    );
                })
            );
        });
    };

    useEffect(() => {
        divisionLabels();
    }, []);

    return (
        <div>
            <NavBar page={"events"}></NavBar>
            <Box sx={{ px: 2 }}>
                {divisions}
            </Box>
        </div>
    );
}
