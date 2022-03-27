import Paper from "@mui/material/paper"
import Card from "@mui/material/Card";
// import { makeStyles } from '@mui/styles';
// import { useState, useEffect } from 'react';
import { firebaseGetEvent } from '../src/firebaseEvents';

import { useTheme, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CalendarIcon from "../components/calendarIcon";
import Grid from "@mui/material/Grid"
import { useEffect, useState } from 'react';
import { Timestamp } from "firebase/firestore";

export default function UpcomingEvent({ eventID }) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [eventName, updateEventName] = useState("");
  const [eventDescription, updateEventDesc] = useState("");
  const [timestamp, updateDate] = useState(null);

  useEffect(() => {
    firebaseGetEvent(eventID).then(
      value => {
        updateEventName(value.name);
        updateEventDesc(value.description);
        updateDate(value.startTime);
      });
  }, [])

  const date = timestamp?.toDate();

  return (
    <Paper style={{ display: 'table', margin: 20, borderRadius: 25 }} elevation={8}>
      {timestamp == null ? null :

        <Card style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', borderRadius: 25 }}>
          <Grid container>
            <Grid item xs={5}>
              <div style={{ margin: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                <CalendarIcon month={monthNames[date.getMonth()]} day={date.getDate()}></CalendarIcon>
              </div>
            </Grid>
            <Grid item xs={7}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardMedia
                  component="img"
                  sx={{ maxHeight: 100 }}
                  image="https://source.unsplash.com/random"
                  alt="Live from space album cover"
                />
                <CardContent sx={{ flex: '1 0 auto', padding: 1, whiteSpace: 'nowrap' }}>
                  <Typography component="div" variant="h5" style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                    {eventName}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div" style={{ maxWidth: '200px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis', WebkitBoxPack: 'end' }}>
                    {eventDescription}
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Card>
      }
    </Paper >
  );
}