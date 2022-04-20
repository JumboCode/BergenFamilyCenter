import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Paper from '@mui/material/Paper';
import 'react-calendar/dist/Calendar.css';
import { makeStyles, withStyles } from '@mui/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';


const styles = {
  root: {
    border: 0,
    width: "100%",
    margin: 5,
  }
};

// const [value, setValue] = React.useState(new Date());

// return (
//   <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <StaticDatePicker
//       displayStaticWrapperAs="desktop"
//       openTo="year"
//       value={value}
//       onChange={(newValue) => {
//         setValue(newValue);
//       }}
//       renderInput={(params) => <TextField {...params} />}
//     />
//   </LocalizationProvider>
// );


const CalendarWithStyles = withStyles(styles)(({ classes }) => {
  return <Calendar calendarType="US" className={classes.root} />
});

export const MonthCalendar = ({ date, onChangeDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        showDaysOutsideCurrentMonth
        views={["day"]}
        value={date}
        onChange={(newValue) => {
          onChangeDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
