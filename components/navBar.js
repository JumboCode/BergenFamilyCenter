import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function NavBar() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link href="/events">
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Events
                            </Button>
                        </Link>
                        <Link href="/calendar">
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Calendar
                            </Button>
                        </Link>
                        <Link href="/profile">
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Profile
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};