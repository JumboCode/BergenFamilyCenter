import * as React from 'react';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
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

const useStyles = makeStyles(() => ({
    dialogPaper: {
        backgroundImage: "url(https://i.imgur.com/HeGEEbu.jpg)",
        opacity: 1,
        color: "#000 !important"
    },
}));


export default function EventDialog({ open, setOpen, description, title, image, className, startTime, endTime, manager, event, attendees, user }) {
    const [numFields, setNumFields] = React.useState(1);
    const [names, setNames] = React.useState([]);
    const [ages, setAges] = React.useState([]);
    const classes = useStyles();
    React.useEffect(() => {
        // assumes user is defined
        if (open) {
            if (user.events.map(e => e.id).includes(event)) {
                getDoc(attendees).then(v => {
                    const attendingMap = v.data().attendees.find(a => a.parent.id === user.id);
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
            firebaseAppendPerson(user?.id, event, attendees, submitNames, submitAges, null).then(() => {
                //console.log(submitNames);
                // #TODO
                handleClose();
            })
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

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <Box className={classes.dialogPaper} sx={{ height: "25ch" }} />
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent sx={{ py: 0 }}>
                        <Typography sx={{ width: "50ch" }} variant="subtitle1">
                            Description: {description}
                        </Typography>
                        {manager == "" || manager == null ? null :
                            <Typography variant="subtitle2">
                                Contact:&nbsp;
                                <Link href={`mailto:${manager}`}>
                                    {manager}
                                </Link>
                            </Typography>
                        }
                        <Typography variant="subtitle2">
                            Time: {startTime?.toDate().toLocaleDateString("en-US", optionsStart)} - {endTime?.toDate().toLocaleTimeString("en-US", optionsEnd)}
                        </Typography>
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
                                if (numFields < 10) {
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
                                if (numFields > ages.length) {
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
            </form>
        </Dialog>
    );
}

