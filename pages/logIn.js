import Head from 'next/head'
import { makeStyles } from '@mui/styles';
import GoogleButton from 'react-google-button'


const useStyles = makeStyles({
    GoogleButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        margin: '0 500px',






    },

})

export default function LogIn() {
    const classes = useStyles();
    return (
        <div class="google-button">
            <GoogleButton className={classes.GoogleButton}></GoogleButton>

        </div>

    )

}











