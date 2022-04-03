import CardMedia from '@mui/material/CardMedia';
import { useRef } from 'react';

export default function CalendarIcon({ month, day }) {
    return (
        <div style={{ position: 'relative', width: "100%", height: "100%" }}>
            <CardMedia
                component="img"
                // height="100"
                // width="500%"
                style={{ position: 'relative' }}
                image="./CalendarBlank.png"
            />
            <div style={{ position: 'absolute', top: '5%', left: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', width: '80%', height: '23%' }}>
                <div style={{ fontSize: '1vw' }}>{month}</div>
            </div>
            <div style={{ position: 'absolute', top: '30%', left: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', width: '80%', height: '60%' }}>
                <div style={{ color: '#0c4d81', fontSize: '2vw' }}>{day}</div>
            </div>
        </div >
    );
}