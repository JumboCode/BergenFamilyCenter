import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import passwordReset from "../src/firebasePasswordReset";
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});

export default function ForgotPassword() {
    const formik = useFormik({
        initialValues: {
            email: 'name@example.com',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log({
                email: values.email,
            });
            passwordReset(values.email)
            alert(JSON.stringify(values, null, 2));
        },
    });


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <Box
                    sx={{ mt: 3 }}>

                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send reset password
                        </Button>
                    </form >
                </Box>
            </Box>
        </Container >

    );
}
