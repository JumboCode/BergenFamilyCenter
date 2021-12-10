import Head from 'next/head'
import { Typography } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
    .string('Enter your first name')
    .required('Last name is required'),
});

export default function SignUp() {
  const classes = useStyles();
  const auth = getAuth();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      Firstname: '',
      Lastname: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      userSignUp(values.email, values.password)
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
          style={{ textAlign: "left" }}
          sx={{
            my: 2,
            mx: 5,
            alignItems: 'center',
          }}
        >
          <Image src="/Tree.png"
            alt="me"
            width="132"
            height="102"
            sx={{ m: 2 }} />
        </Box>
        <form onSubmit={formik.handleSubmit}>

          <Box sx={{ my: 2, mx: 5 }}>

            <Typography variant="h3" component="div" gutterBottom
              className={classes.heading}>
              Sign Up
            </Typography>

            <Typography className={classes.hasAccount}>
              Already have an account?
            </Typography>
            <Link href="logIn"
              variant="body2"
              sx={{ m: 0.5 }}
            >
              {"Sign In"}
            </Link>
          </Box>

          <div className="container">
            <TextField
              label="First Name"
              id="Firstname"
              onChange={formik.handleChange}
              error={formik.touched.Firstname && Boolean(formik.errors.Firstname)}
              helperText={formik.touched.Firstname && formik.errors.Firstname}
              variant="outlined"
              size="small"
              sx={{ my: 2, mx: 5, width: '30ch' }}
              className={classes.font}
            />
            <TextField
              label="Last Name"
              id="Lastname"
              onChange={formik.handleChange}
              error={formik.touched.Lastname && Boolean(formik.errors.Lastname)}
              helperText={formik.touched.Lastname && formik.errors.Lastname}
              variant="outlined"
              size="small"
              sx={{ my: 2, mx: -1, width: '30ch' }}
              className={classes.font}
            />
          </div>

          <div>
            <TextField
              label="Email"
              id="email"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
              size="small"
              sx={{ my: 2, mx: 5, width: '64ch' }}
              className={classes.font}
            />
          </div>

          <div>
            <TextField
              label="Password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant="outlined"
              size="small"
              sx={{ my: 2, mx: 5, width: '64ch' }}
              className={classes.font}
            />
          </div>

          <div>
            <LoadingButton
              style={{
                minWidth: '435px',
                minHeight: '40px'
              }}
              variant="contained"
              type="submit"
              loading={loading}
              sx={{ my: 2, mx: 5, width: '66ch' }}
            >
              Sign Up
            </LoadingButton>
          </div>
        </form>

        <Divider>or</Divider>

        <GoogleButton
          className={classes.Googlebutton}
          type="light"
          onClick={() => {
            signInWithGoogle()
          }}
        />
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
        }}>
      </Grid>
    </Grid>
  )
}


