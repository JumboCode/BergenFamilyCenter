import { Grid, Typography, Box } from '@mui/material';
import Event from "../components/event";
import NavBar from "../components/navBar.js";
import ScrollingCard from "../components/scrollingCards";

export default function Events() {
    return (
        (
            <div>
                <NavBar page={"events"}></NavBar>
                <Box sx={{ px: 2 }}>
                    <Box sx={{ pb: 2 }}>
                        <Typography variant="h5">Adolescent Events</Typography>
                        <ScrollingCard division={["Child"]}></ScrollingCard>
                    </Box>
                    <Box sx={{ pb: 2 }}>
                        <Typography variant="h5">Early Learning Center/Home</Typography>
                        <ScrollingCard division={["Early Learning Center/Home"]}></ScrollingCard>
                    </Box>
                    <Box sx={{ pb: 2 }}>
                        <Typography variant="h5">Teen Events</Typography>
                        <ScrollingCard division={["Child"]}></ScrollingCard>
                    </Box>
                    <Typography variant="h5">Senior Events</Typography>
                    <ScrollingCard division={["Child"]}></ScrollingCard>
                </Box>
            </div>
        )
    )
}
