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
import { getAuth } from "firebase/auth";
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
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
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            userSignIn(values.email, values.password)
        },
    });
    const { language, _ } = useContext(LanguageContext);
    useEffect(() => {
        console.log(language)
    }, [language]);
    const inEnglish = language === "English";

    auth.onAuthStateChanged((user) => {
        if (user) {
            router.push('/calendar');
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
                                label={inEnglish ? "Remember me" : "Recuédame"}
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {inEnglish ? "Log In" : "Iniciar Sesión"}
                        </Button>
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
        </Grid>
    );
}
