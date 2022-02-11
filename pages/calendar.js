import { Typography } from '@mui/material';
import NavBar from "../components/navBar.js";

export default function Calendar() {
    return (
        <div>
            <NavBar page={"calendar"}></NavBar>
            <Typography>
                Calendar
            </Typography>
        </div>
    )
}
