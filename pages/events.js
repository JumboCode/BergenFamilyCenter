import Head from 'next/head'
import { Grid, Typography } from '@mui/material';
import Event from "../components/event";
import { makeStyles } from '@mui/styles';
import NavBar from "../components/navBar.js";

export default function Events() {
    return (
        <div>
            <NavBar />
            <div style={{ margin: 10 }}>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Event image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                    <Grid item xs={3}>
                        <Event image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                    <Grid item xs={3}>
                        <Event image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                    <Grid item xs={3}>
                        <Event image="/TransparentTree.png" title="Event Name" description="Event info.">
                        </Event>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
