import * as React from 'react';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import * as yup from 'yup';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { firebaseAppendPerson } from '../src/firebaseEvents';
import Link from "@mui/material/Link";
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { makeStyles } from '@mui/styles';
import imageKitLoader from './imageKitLoader';


const useStyles = makeStyles(() => ({
    dialogPaper: {
        // backgroundImage: "url(https://i.imgur.com/HeGEEbu.jpg)",
        opacity: 1,
        color: "#000 !important"
    },
}));


export default function EventDialog({ open, setOpen, description, title, image, className, startTime, endTime, manager, event, attendees, user, ageLow, ageHigh, maxAttendees }) {
    const [numFields, setNumFields] = React.useState(1);
    const [names, setNames] = React.useState([]);
    const [ages, setAges] = React.useState([]);
    const [numAttending, setNumAttending] = React.useState(0);
    const classes = useStyles();
    const [openTooMany, setOpenTooMany] = React.useState(false);
    const handleCloseTooMany = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const [ageError, setAgeError] = React.useState(false);
    const handleCloseAgeError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAgeError(false);
    };

    React.useEffect(() => {
        // assumes user is defined
        if (open) {
            if (user.events.map(e => e.id).includes(event)) {
                getDoc(attendees).then(v => {
                    const att = v.data().attendees;
                    let n = 0;
                    for (let i = 0; i < att.length; i++) {
                        n += Object.keys(att[i].attendees).length;
                    }
                    const attendingMap = att.find(a => a.parent.id === user.id);
                    setNumAttending(n);
                    setNames(Object.keys(attendingMap.attendees));
                    setAges(Object.values(attendingMap.attendees));
                    setNumFields(Object.values(attendingMap.attendees).length)
                });
            }
        } else {
            setNames([]);
            setAges([]);
            setNumFields(1);
        }
    }, [open]);

    const optionsStart = { weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric', minute: "numeric" };
    const optionsEnd = { hour: 'numeric', minute: "numeric" };
    let schema = {}

    for (let i = 0; i < numFields; i++) {
        schema[`name${i + 1}`] = yup.string('Enter name').required('Name is required');
        schema[`age${i + 1}`] = yup.number('Enter age').required('Age is required');
    }

    const validationSchema = yup.object(schema);
    const initialValues = {}
    for (let i = 0; i < 10; i++) {
        initialValues[`name${i + 1}`] = names[i] ?? '';
        initialValues[`age${i + 1}`] = ages[i] ?? '';
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Does not submit all users
            let submitNames = []
            let submitAges = []
            for (let i = 0; i < numFields; i++) {
                submitNames.push(values[`name${i + 1}`])
                submitAges.push(values[`age${i + 1}`])
            }
            if (maxAttendees !== "" && submitNames.length + numAttending > maxAttendees) {
                setOpenTooMany(true);
            } else {
                let ageError = false;
                for (let i = 0; i < submitAges.length; i++) {
                    if (ageLow === "" && ageHigh === "") {

                    } else if (ageLow === "") {
                        if (parseInt(submitAges[i]) > ageHigh) {
                            ageError = true;
                        }
                    } else if (ageHigh === "") {
                        if (parseInt(submitAges[i]) < ageLow) {
                            ageError = true;
                        }
                    }
                    else {
                        if (parseInt(submitAges[i]) < ageLow || parseInt(submitAges[i]) > ageHigh) {
                            ageError = true;
                        }
                    }
                    if (ageError) {
                        setAgeError(ageError);
                    } else {
                        firebaseAppendPerson(user?.id, event, attendees, submitNames, submitAges, null).then(() => {
                            // TODO
                            handleClose();
                        })
                    }
                }
            }
        },
    });

    const formFields = [];
    for (let z = 0; z < numFields; z++) {
        formFields.push(
            <Box sx={{ my: 1, mx: 1 }} key={z}>
                <Grid container sx={{ width: '40ch' }} spacing={2} direction="row"
                    alignItems="flex-end">
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            sx={{ my: 1, mx: 1 }}
                            InputLabelProps={{ shrink: true }}
                            autoFocus
                            disabled={names[z] != undefined}
                            margin="dense"
                            name={`name${z + 1}`}
                            id={`name${z + 1}`}
                            label="Name"
                            variant="standard"
                            value={formik.values[`name${z + 1}`]}
                            onChange={formik.handleChange}
                            error={formik.touched[`name${z + 1}`] && Boolean(formik.errors[`name${z + 1}`])}
                            helperText={formik.touched[`name${z + 1}`] && formik.errors[`name${z + 1}`]}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            sx={{ my: 1, mx: 2 }}
                            InputLabelProps={{ shrink: true }}
                            autoFocus
                            disabled={ages[z] != undefined}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            margin="dense"
                            name={`age${z + 1}`}
                            id={`age${z + 1}`}
                            label="Age"
                            value={formik.values[`age${z + 1}`]}
                            onChange={formik.handleChange}
                            error={formik.touched[`age${z + 1}`] && Boolean(formik.errors[`age${z + 1}`])}
                            helperText={formik.touched[`age${z + 1}`] && formik.errors[`age${z + 1}`]}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        {ages[z] ?
                            <IconButton onClick={() => {
                                const newNames = [...names];
                                newNames.splice(z, 1);
                                const newAges = [...ages];
                                newAges.splice(z, 1);

                                // add dialog
                                setNames(newNames);
                                setAges(newAges);
                                setNumFields(numFields - 1);
                            }}>
                                <DeleteIcon />
                            </IconButton> : null
                        }
                    </Grid>
                </Grid>
            </Box >
        )
    }

    const handleClose = () => {
        setOpen(false);
    };
    console.log("THE IMAGE IS", image)

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    {image !== "" && image !== undefined && image?.length != 0 && image !== {} ?
                        <div style={{ position: 'relative', height: "25ch", width: "100%", maxHeight: "25ch" }}>
                            <Image
                                loader={imageKitLoader}
                                src={image}
                                alt="Event image"
                                objectFit='cover'
                                layout='fill'
                            // style={{ height: 50, width: 100, maxHeight: 20, objectFit: 'cover' }}
                            />
                        </div> :
                        null
                    }
                    {/* <Box className={classes.dialogPaper} sx={{ height: "25ch" }} /> */}
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent sx={{ py: 0 }}>
                        <Typography sx={{ width: "50ch" }} variant="subtitle2">
                            Description: {description}
                        </Typography>
                        <Typography variant="subtitle2">
                            Time: {startTime?.toDate().toLocaleDateString("en-US", optionsStart)} - {endTime?.toDate().toLocaleTimeString("en-US", optionsEnd)}
                        </Typography>
                        {manager == "" || manager == null ? null :
                            <Typography variant="subtitle2">
                                Contact:&nbsp;
                                <Link href={`mailto:${manager}`}>
                                    {manager}
                                </Link>
                            </Typography>
                        }
                        {ageLow === "" && ageHigh === "" ? null :
                            ageLow === "" ?
                                <Typography variant="subtitle2">
                                    Max Age: {ageHigh}
                                </Typography> :
                                ageHigh === "" ?
                                    <Typography variant="subtitle2">
                                        Minimum Age: {ageLow}
                                    </Typography> :
                                    <Typography variant="subtitle2">
                                        Age Range: {ageLow} - {ageHigh}
                                    </Typography>
                        }
                        {maxAttendees === "" ?
                            <Typography variant="subtitle2">
                                People Registered: {numAttending}
                            </Typography>
                            :
                            <Typography variant="subtitle2">
                                People Registered: {numAttending} / {maxAttendees}
                            </Typography>
                        }
                    </DialogContent>
                </div>
                <DialogContent>
                    {formFields}
                </DialogContent>
                <DialogActions sx={{ px: 3 }}>
                    <Tooltip title="Add Attendee">
                        <IconButton
                            color="primary"
                            onClick={() => {
                                if (numFields < 6) {
                                    setNumFields(numFields + 1)
                                }
                            }}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove Attendee">
                        <IconButton
                            color="primary"
                            onClick={() => {
                                if (numFields > ages.length && numFields > 1) {
                                    setNumFields(numFields - 1)
                                }
                            }}>
                            <RemoveIcon />
                        </IconButton>
                    </Tooltip>
                    <Box sx={{ flex: "1 0" }}></Box>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" >Submit</Button>
                </DialogActions>
                <Snackbar open={openTooMany} autoHideDuration={3000} anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                    onClose={handleCloseTooMany}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Event full
                    </Alert>
                </Snackbar>
                {/* I don't think they will want this */}
                <Snackbar open={ageError} autoHideDuration={3000} anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                    onClose={handleCloseAgeError}>
                    <Alert onClose={handleCloseAgeError} severity="error" sx={{ width: '100%' }}>
                        Attendee must be in age range
                    </Alert>
                </Snackbar>
            </form>
        </Dialog>
    );
}

