import CardMedia from '@mui/material/CardMedia';
import { useRef } from 'react';

export default function CalendarIcon({ month, day }) {
    const ref = useRef(null);
    console.log(ref);
    return (
        <div style={{ width: '40vmin', height: '40vmin' }}>
            <CardMedia
                component="img"
                style={{ position: 'relative' }}
                // image="https://source.unsplash.com/random"
                image="./CalendarBlank.png"
            />
            <div style={{ position: 'absolute', top: '2vmin', left: '4vmin', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', width: '32vmin', height: '9vmin' }}>
                <div style={{ fontSize: '5vmin' }} ref={ref}>{month}</div>
            </div>
            {/* <div style={{ position: 'absolute', top: '2vmin', left: '12vmin', display: 'flex', color: 'white', fontSize: '8vmin', transform: 'translate(-50%, 0)' }}>banterous</div> */}
            <div style={{ position: 'absolute', top: '12vmin', left: '4vmin', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', width: '32vmin', height: '24vmin' }}>
                <div style={{ color: '#0c4d81', fontSize: '20vmin' }}>{day}</div>
            </div>
        </div >
    );
}