import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Paper from '@mui/material/Paper';
import 'react-calendar/dist/Calendar.css';
import { makeStyles, withStyles } from '@mui/styles';

const styles = {
  root: {
    border: 0,
    margin: 5,
  }
};

const CalendarWithStyles = withStyles(styles)(({ classes }) => {
  return <Calendar calendarType="US" className={classes.root} />
});

export const MonthCalendar = () => {
  const [value, onChange] = useState(new Date());
  // console.log(.)
  return (
    <Paper style={{ display: "table", margin: 20 }} elevation={8}>
      <CalendarWithStyles />
    </Paper>
  );
}
