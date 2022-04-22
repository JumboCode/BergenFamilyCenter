import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import EventDialog from "./eventDialog";

export default function MediaCard(props) {
    const { description, title, image, className, startTime, endTime, manager, event, attendees, user } = props;
    const [loading, setLoading] = React.useState(true);
    const optionsStart = { weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric', minute: "numeric" };
    const optionsEnd = { hour: 'numeric', minute: "numeric" };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (!open) {
            setOpen(true);
        }
    };
    return (
        <div style={{ padding: 10 }}>
            <Card sx={{ width: "100%", borderRadius: "2%", padding: 0 }} className={className}>
                <CardActionArea
                    sx={{ height: 159 }}
                    onClick={handleClickOpen}
                    disableRipple={open}
                >
                    <EventDialog open={open} setOpen={setOpen} {...props} />
                    <CardMedia
                        sx={{ height: "60%" }}
                        alt="bergen-family"
                    >
                        {loading ? <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" /> : null}
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image
                                onLoadingComplete={() => setLoading(false)}
                                src='https://source.unsplash.com/random'
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </CardMedia>
                    <CardContent sx={{ p: 1 }}>
                        {loading ?
                            <Skeleton animation="wave" variant="text" /> :
                            (<div>
                                <Typography variant="h6" component="div">
                                    {title}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {startTime?.toDate().toLocaleDateString("en-US", optionsStart)} - {endTime?.toDate().toLocaleTimeString("en-US", optionsEnd)}
                                </Typography>
                            </div>)
                        }
                    </CardContent>
                </CardActionArea>
            </Card>
        </div >
    );
}