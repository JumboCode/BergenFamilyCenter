import { Typography } from '@mui/material';
import NavBar from "../components/navBar.js";

export default function Profile() {
    return (
        <div>
            <NavBar page={"profile"}></NavBar>
            <Typography>
                Profile
            </Typography>
        </div>
    )
}
