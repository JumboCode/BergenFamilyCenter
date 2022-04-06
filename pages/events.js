import { Grid, Typography, Box, Button } from '@mui/material';
import Event from "../components/event";
import NavBar from "../components/navBar.js";
import ScrollingCard from "../components/scrollingCards";

export default function Events() {
    const divisions = ['Early Learning Center/Home', "Family Success Center", "HIV/Outreach Services", "Visiting Program", "Senior Services", "Adolescent Services", "Clinical Services"];
    return (
        (
            <div>
                <NavBar page={"events"}></NavBar>
                <Box sx={{ px: 2 }}>
                    {divisions.map((d, i) =>
                        <Box key={i} sx={{ pb: 2 }}>
                            <Typography variant="h5">{d}</Typography>
                            <ScrollingCard division={[d]}></ScrollingCard>
                        </Box>
                    )}
                </Box>
            </div>
        )
    )
}
