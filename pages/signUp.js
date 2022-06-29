import { Typography } from '@mui/material';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import GoogleButton from 'react-google-button'
import { useFormik } from 'formik';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import signInWithGoogle from '../src/googleSignIn';
import userSignUp from '../src/firebaseSignUp';
import { getAuth } from "firebase/auth";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LanguageSelector from "../components/languageSelector";
import { LanguageContext } from '../src/languageContext';

const useStyles = makeStyles({
    heading: {
        fontFamily: "Marcellus",
    },
    font: {
        fontFamily: "Californian FB Display",
    },
    Googlebutton: {
        margin: '10px 42px !important',
        width: '510px !important',
        textAlign: 'center',
    },
    hasAccount: {
        float: 'left',
        margin: '',
        fontFamily: "Marcellus",
    },
});

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    Firstname: yup
        .string('Enter your first name')
        .required('First name is required'),
    Lastname: yup
        .string('Enter your last name')
        .required('Last name is required'),
    changepassword: yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
            [yup.ref("password")],
            "Both password need to be the same"
        )
    })
});

export default function SignUp() {
    const classes = useStyles();
    const auth = getAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { language, _ } = useContext(LanguageContext);
    const inEnglish = language === "English";

    const closeError = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            Firstname: '',
            Lastname: '',
            email: '',
            password: '',
            changepassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            userSignUp(values.email, values.password, "", values.Firstname.trim() + " " + values.Lastname.trim()).then(() => {
                setLoading(false);
            }).catch(() => {
                setOpen(true);
                setLoading(false);
            });
            setLoading(true);
        },
    });

    auth.onAuthStateChanged((user) => {
        if (user) {
            router.push('/calendar');
        }
    });

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    style={{ textAlign: "right" }}
                    sx={{
                        mt: 2,
                        mx: 2,
                        alignItems: 'center',
                        float: 'right'
                    }}
                >
                    <LanguageSelector />
                </Box>
                <Box
                    style={{ textAlign: "left" }}
                    sx={{
                        my: 4,
                        mx: 4,
                        alignItems: 'center',
                    }}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <Box style={{ textAlign: "left", width: "100%" }}>
                            <Image src="/Tree.png" alt="me" width="132" height="102" />
                            <Typography variant="h3" component="h1" >
                                {inEnglish ? "Sign Up" : "Registrarse"}
                            </Typography>
                            <Grid style={{
                                display: "flex",

                            }}>
                                <Typography style={{ float: "left" }}>
                                    {inEnglish ? "Already have an account?" : "¿Ya tiene una cuenta?"}
                                    &nbsp;
                                </Typography>
                                <Link href="/login" underline="hover">
                                    {inEnglish ? "Sign In" : "Iniciar Sesión"}
                                </Link>
                            </Grid>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    label={inEnglish ? "First Name" : "Nombre"}
                                    id="Firstname"
                                    onChange={formik.handleChange}
                                    autoFocus
                                    error={formik.touched.Firstname && Boolean(formik.errors.Firstname)}
                                    helperText={formik.touched.Firstname && formik.errors.Firstname}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 2 }}>
                                <TextField
                                    label={inEnglish ? "Last Name" : "Apellido"}
                                    id="Lastname"
                                    onChange={formik.handleChange}
                                    error={formik.touched.Lastname && Boolean(formik.errors.Lastname)}
                                    helperText={formik.touched.Lastname && formik.errors.Lastname}
                                    autoFocus
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={inEnglish ? "Email" : "Correo Electrónico"}
                                    id="email"
                                    fullWidth
                                    autoFocus
                                    autoComplete='email'
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={inEnglish ? "Password" : "Contraseña"}
                                    type="password"
                                    id="password"
                                    fullWidth
                                    autoFocus
                                    autoComplete="current-password"
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={inEnglish ? "Confirm Password" : "Confirmar Contraseña"}
                                    type="password"
                                    id="changepassword"
                                    fullWidth
                                    autoFocus
                                    autoComplete="current-password"
                                    onChange={formik.handleChange}
                                    error={formik.touched.changepassword && Boolean(formik.errors.changepassword)}
                                    helperText={formik.touched.changepassword && formik.errors.changepassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                    loading={loading}
                                >
                                    {inEnglish ? "Sign Up" : "Registrarse"}
                                </LoadingButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>{inEnglish ? "or" : "o"} </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <GoogleButton
                                    style={{ width: "100% !important" }}
                                    onClick={() => {
                                        signInWithGoogle()
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
            >
                <div style={{ alignSelf: "center", position: 'relative', width: '100%', height: '100%' }}>
                    <Image objectFit="cover" style={{ right: 100 }}
                        src="/3-girls-outside-0518.jpg" alt="me" layout="fill" />
                </div>

            </Grid>
            <Snackbar open={open} autoHideDuration={3000} onClose={closeError}>
                <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
                    An account with that email already exists
                </Alert>
            </Snackbar>
        </Grid >
    )
}
