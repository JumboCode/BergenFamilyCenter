import { ClassNames } from '@emotion/react';
import { Grid } from '@mui/material';
import Event from "../components/event";
import NavBar from "../components/navBar.js";




export default function Events() {
    return (
        <div>
            <NavBar page={"events"}></NavBar>
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
                </Grid>
        </div>
        </div>
        
    )
}
