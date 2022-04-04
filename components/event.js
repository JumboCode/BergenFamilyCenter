import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Popover } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'; 


export default function MediaCard({ description, title, image, className, startTime, endTime }) {
    const [loading, setLoading] = React.useState(true);
    const [numFields, setNumFields] = React.useState(1);

    const formFields = [];
    for (let z = 0; z < numFields; z ++) {
        formFields.push(
        <div>
            <TextField
                sx={{ my: 1, mx: 2, width: '20ch' }}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                variant="standard"
            />
            <TextField
                sx={{ my: 1, mx: 2, width: '20ch' }}
                autoFocus
                margin="dense"
                id="age"
                label="Age"
                variant="standard"
            />
        </div>
        )
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (!open) {
            setOpen(true);
        }
    };
  
    const handleClose = () => {
        setOpen(false);
    };
  
    return (
        <div style={{ padding: 10 }}>
            <Card sx={{ width: "100%", borderRadius: "2%", padding: 0 }} className={className}>
                <CardActionArea 
                    sx={{ height: 159 }}
                    onClick={handleClickOpen}
                    disableRipple={open}
                >
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Enter Information</DialogTitle>
                        <DialogContent>
                            {formFields}
                            </DialogContent>
                        <DialogActions>
                        <Button 
                            onClick={() => {
                                if (numFields < 10) {
                                    setNumFields(numFields + 1)
                            }}}>
                            +
                        </Button>
                        <Button 
                            onClick={() => {
                                if (numFields > 1) {
                                    setNumFields(numFields - 1)
                            }}}>
                            -
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Submit</Button>
                        </DialogActions>
                    </Dialog>

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