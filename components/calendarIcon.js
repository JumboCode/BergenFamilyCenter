import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';


const useStyles = makeStyles(() => ({
    root: {
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
        </Paper >
    );
}