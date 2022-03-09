import { Grid, Typography } from '@mui/material';
import Event from "../components/event";
import NavBar from "../components/navBar.js";
import ScrollingCard from "../components/scrollingCards";

export default function Events() {
    return (
        (
            <div>
                <NavBar page={"events"}></NavBar>
                <div>
                    <Typography>Adolescent Events</Typography>
                    <ScrollingCard division={["Child"]}></ScrollingCard>
                </div>
                <div>
                    <Typography>Teen Events</Typography>
                    <ScrollingCard division={["Child"]}></ScrollingCard>
                </div>
                <Typography>Senior Events</Typography>
                <ScrollingCard division={["Child"]}></ScrollingCard>
            </div>
        )
    )
}
