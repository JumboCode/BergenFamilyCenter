import { useState, useContext, useEffect } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import Button from '@mu\i/material/Button';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { LanguageContext } from '../src/languageContext';

const useStyles = makeStyles(() => ({
    iconButtonLabel: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

export default function LanguageSelector() {
    const classes = useStyles();
    const [languageState, setLanguageState] = useState('');
    const { language, setLanguage } = useContext(LanguageContext);

    useEffect(() => {
        setLanguageState(localStorage.getItem('language') ?? 'English');
        setLanguage(localStorage.getItem('language') ?? 'English');
    }, [])

    useEffect(() => {
        if (localStorage.getItem('language') == undefined) {
            localStorage.setItem('language', 'English');
            setLanguage('English');
        } else {
            if (languageState !== '') {
                localStorage.setItem('language', languageState);
                setLanguage(languageState);
            }
        }
    }, [languageState])

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setTimeout(() => {
            setAnchorEl(null);
        }, 1);
    };

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <Button id="test" onClick={handleOpen} size='small' sx={{
            color: "#0f4d81",
        }} classes={{ label: classes.iconButtonLabel }}>
            <LanguageIcon />
            {languageState}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    setLanguageState("English");
                    setLanguage("English");
                    handleClose();
                }}>
                    English
                </MenuItem>
                <MenuItem onClick={() => {
                    setLanguageState("Español");
                    setLanguage("Español");
                    handleClose();
                }}>
                    Español
                </MenuItem>
            </Menu>
        </Button>
    );
};