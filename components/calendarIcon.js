import CardMedia from '@mui/material/CardMedia';
import { useRef } from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';


const useStyles = makeStyles(() => ({
    root: {
        // border: "1px solid #000",
        // margin: 8,
        borderRadius: 15,
        width: "100%",
        height: "75%",
        textAlign: "center",
        centerAlgin: "vertical",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        marginBottom: 10,
    },
    month: {
        // border: "1px solid #000",
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
        borderRadius: 15,
        backgroundColor: "#0f4d81",
        centerAlgin: "vertical",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        color: "white",
        fontSize: 16,
    },
    day: {
        centerAlgin: "vertical",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        // border: "1px solid #000",
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        borderRadius: 15,
        backgroundColor: "#fff",
        color: "#0f4d81",
        fontSize: 24,
    }
}));


export default function CalendarIcon({ month, day }) {
    const classes = useStyles();
    return (
        <Paper sx={{ mx: 0.5 }} elevation={5} className={classes.root}>
            <div className={classes.month} style={{ width: "100%", height: "30%" }}>
                {month}
            </div>
            <div className={classes.day} style={{ width: "100%", height: "70%" }}>
                {day}
            </div>
            {/* <CardMedia
                component="img"
                // height="100"
                // width="500%"
                style={{ position: 'relative' }}
                image="./CalendarBlank.png"
            />
            <div style={{ position: 'absolute', top: '5%', left: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', width: '80%', height: '23%' }}>
                <div style={{ fontSize: '1vw' }}>{month}</div>
            </div>
            <div style={{ position: 'absolute', top: '30%', left: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', width: '80%', height: '60%' }}>
                <div style={{ color: '#0c4d81', fontSize: '2vw' }}>{day}</div>
            </div> */}
        </Paper >
    );
}