import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export default function MediaCard({ description, title, image, className, startTime, endTime }) {
    const [loading, setLoading] = React.useState(true);
    return (
        <div style={{ padding: 10 }}>
            <Card sx={{ width: "100%", borderRadius: "2%", padding: 0 }} className={className}>
                <CardActionArea sx={{ height: 159 }}>
                    <CardMedia
                        sx={{ height: "60%" }}
                        alt="bergen-family"
                    >
                        {loading ? <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" /> : null}
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image
                                onLoadingComplete={() => setLoading(false)}
                                src={image}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </CardMedia>
                    <CardContent>
                        {loading ?
                            <Skeleton animation="wave" variant="text" /> :
                            (<Typography variant="h6" component="div">
                                {title}
                            </Typography>)
                        }
                    </CardContent>
                </CardActionArea>

                {/* <CardActions>
                <Button size="small">Sign Up</Button>
            </CardActions> */}
            </Card>
        </div>
    );
}