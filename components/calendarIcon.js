import CardMedia from '@mui/material/CardMedia';
import { useRef } from 'react';

export default function CalendarIcon({ month, day, width, height }) {
    return (
        <div style={{ position: 'relative', width: width, height: height }}>
            <CardMedia
                component="img"
                style={{ position: 'relative' }}
                image="./CalendarBlank.png"
            />
            <div style={{ position: 'absolute', top: '5%', left: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', width: '80%', height: '23%' }}>
                <div style={{ fontSize: '2vh' }}>{month}</div>
            </div>
            <div style={{ position: 'absolute', top: '30%', left: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', width: '80%', height: '60%' }}>
                <div style={{ color: '#0c4d81', fontSize: '5vh' }}>{day}</div>
            </div>
        </div >
    );
}