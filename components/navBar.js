import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import { useRouter } from 'next/router'
import LanguageSelector from "./languageSelector";

const drawerWidth = 240;

const DrawerHeader = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    padding: 6,
    justifyContent: 'flex-end',
}));

export default function NavBar({ page }) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <CssBaseline />
            <MuiAppBar
                style={{ background: "#e9f7fe", boxShadow: 'none', textAlign: 'left', borderBottom: "1px solid rgb(216, 216, 216)" }}
                position="sticky"
                sx={{ p: 1 }}
                open={open}
            >
                <Toolbar sx={{ textAlign: 'left' }}>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ pl: 1, display: "block", position: "relative", height: 70, width: 250 }}>
                        <Image src="/weblogo.svg" layout="fill" objectFit="contain"
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    {/* <Typography variant="h5" color="black" >
                        {page.charAt(0).toUpperCase() + page.slice(1)}
                    </Typography> */}
                    <LanguageSelector />
                </Toolbar>
            </MuiAppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Calendar', 'Events', 'Profile'].map((text, index) => (
                        <ListItem onClick={() => { router.push("/" + text.toLowerCase()) }} button key={text}>
                            <ListItemIcon>
                                {index % 3 === 0 ? <CalendarMonthIcon /> : (index % 3 == 1 ? <CalendarViewDayIcon /> : <AccountBoxIcon />)}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
        </Box >
    )
};
