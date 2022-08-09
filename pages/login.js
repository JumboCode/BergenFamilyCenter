import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getAuth } from "firebase/auth";
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSearchParams } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import GoogleButton from 'react-google-button';
import * as yup from 'yup';
import userSignIn from '../src/firebaseSignIn';
import signInWithGoogle from '../src/googleSignIn';
import LanguageSelector from "../components/languageSelector";
import { LanguageContext } from '../src/languageContext';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be at least 8 characters')
        .required('Password is required'),
});

export default function SignIn() {
    const auth = getAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams();
    const closeError = (_, reason) => {
        if (reason === 'clickaway') { return; }
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            userSignIn(values.email, values.password).then(() => {
            }).catch(() => {
                setOpen(true);
                setLoading(false);
            });
            setLoading(true);
        },
    });
    const { language, _ } = useContext(LanguageContext);
    const inEnglish = language === "English";

    auth.onAuthStateChanged((user) => {
        if (user) {
            const retURL = searchParams.get("returnUrl");
            if (retURL !== undefined && retURL !== null && !retURL.includes("login") && !retURL.includes("signUp")) {
                if (retURL === '/calendar' || retURL.startsWith('/calendar?') ||
                    retURL === '/events' || retURL.startsWith('/events?') ||
                    retURL === '/profile' || retURL.startsWith('/profile?')) {
                    router.push(retURL);
                } else {
                    router.push('/calendar');
                }
            }
            else {
                router.push('/calendar');
            }

        }
    });

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
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
                            <Typography component="h1" variant="h3">
                                {inEnglish ? "Log in" : "Iniciar Sesión"}
                            </Typography>
                            <Grid style={{ display: "flex", alignItems: "flex-end" }}>
                                <Typography style={{ float: "left" }}>
                                    {inEnglish ? "Don't have an account?" : "¿No tiene una cuenta?"}
                                    &nbsp;
                                </Typography>
                                <Link href="/signUp" underline="hover">
                                    {inEnglish ? "Sign up" : "Registrarse"}
                                </Link>
                            </Grid>
                        </Box>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label={inEnglish ? "Email" : "Correo Electrónico"}
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label={inEnglish ? "Password" : "Contraseña"}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Box style={{ display: "flex", alignItems: "center" }}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label={inEnglish ? "Remember me" : "Recuérdame"}
                            />
                            <Link
                                href="/forgotPassword"
                                underline="hover"
                                style={{ marginLeft: "auto", order: 1 }}
                                variant="body2"
                            >
                                {inEnglish ? "Forgot password?" : "¿Olvidaste la contraseña?"}
                            </Link>
                        </Box>
                        <LoadingButton
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{ mt: 3, mb: 2 }}
                            loading={loading}
                        >
                            {inEnglish ? "Log In" : "Iniciar Sesión"}
                        </LoadingButton>
                        <Divider>{inEnglish ? "or" : "o"}</Divider>
                        <GoogleButton
                            style={{ width: "100% !important", marginTop: 24 }}
                            onClick={() => { signInWithGoogle() }}
                        />
                    </form>
                </Box>
            </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
            >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>

                    <Image objectFit="cover"
                        src="/3-buddies-039.jpg" alt="me" layout="fill" />
                </div>
            </Grid>
            <Snackbar open={open} autoHideDuration={3000} onClose={closeError}>
                <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
                    Incorrect Email or Password
                </Alert>
            </Snackbar>

        </Grid>
    );
}
