import { useState, useEffect, useContext } from "react";
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
import { updateUser } from '../src/userFunctions';
import Link from "@mui/material/Link";
import DeleteIcon from '@mui/icons-material/Delete';
import { getDoc } from "firebase/firestore";
import { makeStyles } from '@mui/styles';
import imageKitLoader from './imageKitLoader';
import { LanguageContext } from '../src/languageContext';


const useStyles = makeStyles(() => ({
    dialogPaper: {
        opacity: 1,
        color: "#000 !important"
    },
}));

export default function EventDialog({ open, setOpen, description, title, image, className, startTime, endTime, manager, event, attendees, user, ageLow, ageHigh, maxAttendees }) {
    const [numFields, setNumFields] = useState(1);
    const [names, setNames] = useState([]);
    const [ages, setAges] = useState([]);
    const [numAttending, setNumAttending] = useState(0);
    const [openTooMany, setOpenTooMany] = useState(false);
    const { language, _ } = useContext(LanguageContext);
    const inEnglish = language === "English";

    const handleCloseTooMany = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const [ageError, setAgeError] = useState(false);
    const handleCloseAgeError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAgeError(false);
    };

    useEffect(() => {
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
    let schema = {
        phone: yup.string('Enter phone number').required(inEnglish ? 'Phone number is required' : "Entrar un número de teléfono"),
        address: yup.string('Enter address').required(inEnglish ? 'Address is required' : "Entrar una dirección")
    }

    for (let i = 0; i < numFields; i++) {
        schema[`name${i + 1}`] = yup.string('Enter name').required(inEnglish ? 'Name is required' : "Entrar un nombre");
        schema[`age${i + 1}`] = yup.number('Enter age').required(inEnglish ? 'Age is required' : 'Entrar un edad');
    }

    const validationSchema = yup.object(schema);
    const initialValues = { phone: user.phoneNumber, address: user.address }
    for (let i = 0; i < 10; i++) {
        initialValues[`name${i + 1}`] = names[i] ?? '';
        initialValues[`age${i + 1}`] = ages[i] ?? '';
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
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
                        // phone number stuff
                        updateUser(user.id, { phoneNumber: values.phone })
                        updateUser(user.id, { address: values.address })

                        firebaseAppendPerson(user?.id, event, attendees, submitNames, submitAges, null).then(() => {
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
                            label={inEnglish ? "Name" : "Nombre"}
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
                            label={inEnglish ? "Age" : "Edad"}
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
                    {image !== "" && image !== undefined && image?.length != 0 && image !== {} ?
                        <div style={{ position: 'relative', height: "25ch", width: "100%", maxHeight: "25ch" }}>
                            <Image
                                loader={imageKitLoader}
                                src={image}
                                alt="Event image"
                                objectFit='cover'
                                layout='fill'
                            />
                        </div> :
                        null
                    }
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent sx={{ py: 0 }}>
                        <Typography sx={{ width: "50ch" }} variant="subtitle2">
                            {inEnglish ? "Description" : "Detalles"}: {description}
                        </Typography>
                        <Typography variant="subtitle2">
                            {inEnglish ? "Time" : "Hora"}: {startTime?.toDate().toLocaleDateString(inEnglish ? "en-US" : "es-ES", optionsStart)} - {endTime?.toDate().toLocaleTimeString(inEnglish ? "en-US" : "es-ES", optionsEnd)}
                        </Typography>
                        {manager == "" || manager == null ? null :
                            <Typography variant="subtitle2">
                                {inEnglish ? "Contact" : "Contacto"}:&nbsp;
                                <Link href={`mailto:${manager}`}>
                                    {manager}
                                </Link>
                            </Typography>
                        }
                        {ageLow === "" && ageHigh === "" ? null :
                            ageLow === "" ?
                                <Typography variant="subtitle2">
                                    {inEnglish ? "Max Age" : "Edad Máxima"}: {ageHigh}
                                </Typography> :
                                ageHigh === "" ?
                                    <Typography variant="subtitle2">
                                        {inEnglish ? "Minimum Age" : "Edad Mínima"}: {ageLow}
                                    </Typography> :
                                    <Typography variant="subtitle2">
                                        {inEnglish ? "Age Range" : "Rango de Edades"}: {ageLow} - {ageHigh}
                                    </Typography>
                        }
                        {maxAttendees === "" ?
                            <Typography variant="subtitle2">
                                {inEnglish ? "People Registered" : "Personas Registradas"}: {numAttending}
                            </Typography>
                            :
                            <Typography variant="subtitle2">
                                {inEnglish ? "People Registered" : "Personas Registradas"}: {numAttending} / {maxAttendees}
                            </Typography>
                        }
                    </DialogContent>
                </div>
                <DialogContent>
                    <TextField
                        sx={{ px: 2 }}
                        fullWidth
                        autoFocus
                        InputLabelProps={{ sx: { px: 2 } }}
                        name="address"
                        id="address"
                        label={inEnglish ? "Address" : "Dirección"}
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        variant="standard"
                    />
                    <TextField
                        sx={{ px: 2 }}
                        fullWidth
                        autoFocus
                        InputLabelProps={{ sx: { px: 2 } }}
                        margin="dense"
                        name="phone"
                        id="phone"
                        label={inEnglish ? "Phone Number" : "Número de Teléfono"}
                        value={formik.values.phone}
                        initialValues={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        variant="standard"
                    />
                    {formFields}
                </DialogContent>
                <DialogActions sx={{ px: 3 }}>
                    <Tooltip title={inEnglish ? "Add Attendee" : "Agregar Persona"}>
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
                    <Tooltip title={inEnglish ? "Remove Attendee" : "Eliminar Persona"}>
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
                    <Button onClick={handleClose}>{inEnglish ? "Cancel" : "Cancelar"}</Button>
                    <Button type="submit" >{inEnglish ? "Submit" : "Enviar"}</Button>
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

