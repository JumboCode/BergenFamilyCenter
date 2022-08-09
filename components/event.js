import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import EventDialog from "./eventDialog";
import imageKitLoader from './imageKitLoader';
import { colors } from '../public/colors.js'


export default function MediaCard(props) {
    const { description, title, image, className, startTime, endTime, manager, event, attendees, user, division, gtDivisions } = props;
    const [loading, setLoading] = useState(image !== "" && image !== undefined && image?.length != 0 && image !== {});
    const optionsStart = { weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric', minute: "numeric" };
    const optionsEnd = { hour: 'numeric', minute: "numeric" };
    const [open, setOpen] = useState(false);

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
                    {open ?
                        <EventDialog open={open} setOpen={setOpen} {...props} /> : null
                    }
                    <CardMedia
                        sx={{ height: "60%" }}
                        alt="bergen-family"
                    >
                        {loading ? <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" /> : null}
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            {image !== "" && image !== undefined && image?.length != 0 && image !== {} ?
                                <Image
                                    loader={imageKitLoader}
                                    onLoadingComplete={() => setLoading(false)}
                                    src={image}
                                    alt="Event image"
                                    objectFit='cover'
                                    layout='fill'
                                />
                                :
                                <div style={{ backgroundColor: colors[gtDivisions.indexOf(division)], position: 'relative', width: '100%', height: '100%' }} />

                            }
                        </div>
                    </CardMedia>
                    <CardContent sx={{ p: 1 }}>
                        {loading ?
                            <Skeleton animation="wave" variant="text" /> :
                            (<div>
                                <Typography variant="h6" component="div" sx={{
                                    flex: "1 0 auto",
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    lineHeight: 1,
                                }}>
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