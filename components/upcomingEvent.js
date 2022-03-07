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

export default function UpcomingEvent({ userID }) {
  // firebaseGetEvent(eventID).then(
  //     value => {
  //     console.log("in here i know what value is: " + value)
  // });
  // console.log("here!");

  // const theme = useTheme();
  const theme = createTheme({
    shape: {
      borderRadius: 50,
    },
  })
  return (
    // Inspired by https://mui.com/components/cards/
    <Paper style={{ display: 'table', margin: 0, borderRadius: 50 }} elevation={8}>
      <Card style={{ display: 'flex', borderRadius: 50 }}>
        <CalendarIcon month="December" day="37"></CalendarIcon>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <CardMedia
              component="img"
              sx={{ maxHeight: 100 }}
              image="https://source.unsplash.com/random"
              alt="Live from space album cover"
            />
          </Box>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              Food Waste Prevention
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Life Alive Organic Cafe
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Paper >
  );
}