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
                        <div key={division.name}>
                            <Typography>{division.name}</Typography>
                            <ScrollingCard division={[division.name]}></ScrollingCard>
                        </div>
                    );
                })
            );
        });
    };

    useEffect(() => {
        divisionLabels();
    }, []);

    return (
        (
            <div>
                <NavBar page={"events"}></NavBar>
                {divisions}
            </div>
        )
    )
}
