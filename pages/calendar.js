import { Typography } from '@mui/material';
import NavBar from "../components/navBar.js";
import Button from '@mui/material/Button';
import { firebaseAppendPerson } from "../src/firebaseEvents"

export default function Calendar() {
    const divisions = ["Child", "Nonchild"];
    const uid = "Js4caNIqhug8Qj64PUnFPJH3fd93";
    const eventId = "eventex";
    const names = ["Joe", "Joey"];
    const ages = [5, 10];
    return (
        <div>
            <NavBar page={"calendar"}></NavBar>
            <Typography>
                Calendar
            </Typography>
            <Button onClick={async () => { await firebaseAppendPerson(uid, eventId, names, ages, true) }}>Je suis un button!</Button>
        </div>
    )
}
