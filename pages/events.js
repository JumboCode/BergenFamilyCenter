import Head from 'next/head'
import { Typography } from '@mui/material';
import NavBar from "../components/navBar.js";

export default function Events() {
    return (
        <div>
            <NavBar page={"events"}></NavBar>
            <Typography>
                Events
            </Typography>
        </div>
    )
}
