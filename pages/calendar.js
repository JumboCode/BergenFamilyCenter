import { Typography } from '@mui/material';
import NavBar from "../components/navBar.js";
import { MonthCalendar } from "../components/calendar";

export default function Calendar() {
    return (
        <div>
            <NavBar page={"calendar"}></NavBar>
            <MonthCalendar />
        </div>
    )
}
