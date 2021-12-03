import Head from 'next/head'
import { Typography } from '@mui/material';
import userSignIn from "../src/firebaseSignIn";

export default function SignUp() {
    return (
        <div>
            <Typography>
                SignUp
            </Typography>
            <button onClick={() => userSignIn("test@test.com", "test123")}> click me! </button>
        </div>
    )
}
