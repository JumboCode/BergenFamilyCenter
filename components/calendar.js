import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import Paper from '@mui/material/Paper';
import 'react-calendar/dist/Calendar.css';
import { makeStyles, withStyles } from '@mui/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { esES } from '@mui/material/locale';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { LanguageContext } from '../src/languageContext';
import PickersDay, {
  PickersDayProps,
  pickersDayClasses
} from "@mui/lab/PickersDay";

const styles = {
  root: {
    border: 0,
    width: "100%",
    margin: 5,
  }
};

const CalendarWithStyles = withStyles(styles)(({ classes }) => {
  const { language, _ } = useContext(LanguageContext);
  const inEnglish = language === "English";

  return <Calendar calendarType={inEnglish ? "US" : "ES"} className={classes.root} />
});

const renderWeekPickerDay = (
  date,
  selectedDates,
  pickersDayProps
) => {
  return (
    <PickersDay
      {...pickersDayProps}
      sx={{
        [`&&.${pickersDayClasses.selected}`]: {
          backgroundColor: "#0f4d81"
        }
      }}
    />
  );
};

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
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
}
