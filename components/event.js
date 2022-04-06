import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import * as yup from 'yup';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { firebaseAppendPerson } from '../src/firebaseEvents';
import Link from "@mui/material/Link";

export default function MediaCard({ description, title, image, className, startTime, endTime, manager, event, attendees }) {
    const [loading, setLoading] = React.useState(true);
    const [numFields, setNumFields] = React.useState(1);
    const optionsStart = { weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric', minute: "numeric" };
    const optionsEnd = { hour: 'numeric', minute: "numeric" };

    let schema = {}
    for (let i = 0; i < numFields; i++) {
        schema[`name${i + 1}`] = yup.string('Enter name').required('Name is required');
        schema[`age${i + 1}`] = yup.number('Enter age').required('Age is required');
    }

    const validationSchema = yup.object(schema);

    const formik = useFormik({
        initialValues: {
            name1: '',
            age1: '',
            name2: '',
            age2: '',
            name3: '',
            age3: '',
            name4: '',
            age4: '',
            name5: '',
            age5: '',
            name6: '',
            age6: '',
            name7: '',
            age7: '',
            name8: '',
            age8: '',
            name9: '',
            age9: '',
            name10: '',
            age10: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            firebaseAppendPerson("Ap9SYtZOGdIFYKCJSs7e", event, attendees, [values.name1], [values.age1], null).then(() => {
                // TODO show notification that you signed up
            })
        },
    });

    const formFields = [];
    for (let z = 0; z < numFields; z++) {
        formFields.push(
            <div key={z}>
                <TextField
                    sx={{ my: 1, mx: 2, width: '20ch' }}
                    autoFocus
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
                <TextField
                    sx={{ my: 1, mx: 2, width: '20ch' }}
                    autoFocus
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
            </div>
        )
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (!open) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ padding: 10 }}>
            <Card sx={{ width: "100%", borderRadius: "2%", padding: 0 }} className={className}>
                <CardActionArea
                    sx={{ height: 159 }}
                    onClick={handleClickOpen}
                    disableRipple={open}
                >
                    <Dialog open={open} onClose={handleClose}>
                        <form onSubmit={formik.handleSubmit}>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogContent sx={{ py: 0 }}>
                                <Typography variant="subtitle1">
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
                                    Time: {startTime?.toLocaleDateString("en-US", optionsStart)} - {endTime?.toLocaleTimeString("en-US", optionsEnd)}
                                </Typography>
                            </DialogContent>
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
                                            if (numFields > 1) {
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

                    <CardMedia
                        sx={{ height: "60%" }}
                        alt="bergen-family"
                    >
                        {loading ? <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" /> : null}
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image
                                onLoadingComplete={() => setLoading(false)}
                                src='https://source.unsplash.com/random'
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </CardMedia>
                    <CardContent sx={{ p: 1 }}>
                        {loading ?
                            <Skeleton animation="wave" variant="text" /> :
                            (<div>
                                <Typography variant="h6" component="div">
                                    {title}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {startTime?.toLocaleDateString("en-US", optionsStart)} - {endTime?.toLocaleTimeString("en-US", optionsEnd)}
                                </Typography>
                            </div>)
                        }
                    </CardContent>
                </CardActionArea>

                {/* <CardActions>
                <Button size="small">Sign Up</Button>
            </CardActions> */}
            </Card>
        </div >
    );
}