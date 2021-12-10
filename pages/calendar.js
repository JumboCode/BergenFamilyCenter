import Head from 'next/head'
import { Typography } from '@mui/material';
import NavBar from "../components/navBar.js";

export default function Calendar() {
    return (
        <div>
            <NavBar></NavBar>
            <Typography>
                Calendar
            </Typography>
        </div>
    )
}
