import Head from 'next/head'
import { Typography } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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

const useStyles = makeStyles({
  heading: {
    fontFamily: "Marcellus",
  },
  font: {
    fontFamily: "Californian FB Display",
  },
  Googlebutton: {
    margin: '10px 17px !important',
    width: '435px !important',
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
        //router.push('/calendar');
    }
  });


  return (
    <Box
      noValidate
      autoComplete="off"
    >

      <Typography variant="h3" component="div" gutterBottom
        className={classes.heading}
        sx={{ m: 2}}>
        Sign Up
      </Typography>

      
      <form onSubmit={formik.handleSubmit}>

      <Box sx={{ m: 2}}>

        <Typography className={classes.hasAccount}>
          Already have an account? 
        </Typography>
        <Link href="logIn" 
              variant="body2"
              sx={{ m: 0.5}}
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
          sx={{ m: 2, width: '25ch' }}
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
          sx={{ m: 2, width: '25ch' }}
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
          sx={{ m: 2, width: '54ch' }}
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
          sx={{ m: 2, width: '54ch' }}
          className={classes.font}
        />
      </div>

      <div>
        <LoadingButton
          style={{minWidth: '435px', 
                  minHeight: '40px'}}
          variant="contained"
          type="submit"
          loading={loading}
          sx={{ m: 2, width: '25ch' }}
        >
            Sign Up
        </LoadingButton>
      </div>
    </form>

      {/* <div className = {classes.Googlebutton}> */}
        <GoogleButton 
          className = {classes.Googlebutton}
          type="light"
          onClick={() => { 
            signInWithGoogle()
          }}
        />
      {/* </div> */}
    </Box>
  )
}


  
	