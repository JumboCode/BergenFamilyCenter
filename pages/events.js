import { ClassNames } from '@emotion/react';
import { Grid } from '@mui/material';
import Event from "../components/event";
import { Typography } from "@mui/material";
import NavBar from "../components/navBar.js";
import ScrollingCard from "../components/scrollingCards.js";




export default function Events() {
    return (
        <div>
      <NavBar page={"Events"}></NavBar>
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
}


{/* <NavBar page={"events"}></NavBar>
            <div style={{ margin: 10 }}>
            <Grid container spacing={2} columns={16}>
                    <Grid item xs="auto">
                        <Event sx={{ width: 500, height: 275 }}
                        image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                    <Grid item xs="auto">
                        <Event image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                    <Grid item xs="auto">
                        <Event image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                    <Grid item xs="auto">
                        <Event image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                    <Grid item xs="auto">
                        <Event image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                    <Grid item xs="auto">
                        <Event image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                    <Grid item xs="auto">
                        <Event image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                    <Grid item xs="auto">
                        <Event image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                    <Grid item xs="auto">
                        <Event image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                </Grid> */}