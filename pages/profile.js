import Head from 'next/head'
import { Typography } from '@mui/material';
import NavBar from "../components/navBar.js";

export default function Profile() {
    return (
        <div>
            <NavBar></NavBar>
            <Typography>
                Profile
            </Typography>
        </div>
    )
}
