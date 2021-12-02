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
import * as React from 'react';
import GoogleButton from 'react-google-button';
import * as yup from 'yup';
import userSignIn from '../src/firebaseSignIn';
import signInWithGoogle from '../src/googleSignIn';

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
                Log in
              </Typography>
              <Grid style={{ display: "flex", alignItems: "flex-end" }}>
                <Typography style={{ float: "left" }}>
                  Don't have an account?&nbsp;
                </Typography>
                <Link href="#" underline="hover">
                  Sign up
                </Link>
              </Grid>

            </Box>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
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
              label="Password"
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
                label="Remember me"
              />
              <Link
                href="#"
                underline="hover"
                style={{ marginLeft: "auto", order: 1 }}
                variant="body2"
              >
                Forgot password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Divider>or</Divider>
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
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
}