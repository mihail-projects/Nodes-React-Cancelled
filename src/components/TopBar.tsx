/* eslint-disable react/react-in-jsx-scope */
import '../Styles/TopBar.css'
import '../Styles/Fonts.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from './Settings';
import { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

type topBarProps = {
    projectName: string
}

function TopBar({ projectName }: topBarProps) {

    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
            <Settings show={showSettings} />
            <Box id='bar' sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ borderRadius: 16 }}>
                    <Toolbar>
                        <IconButton id='account' onClick={() => null}><AccountCircleIcon color='primary' /></IconButton>
                        <IconButton id='settings' onClick={() => setShowSettings(!showSettings)}><SettingsIcon color='primary' /></IconButton>
                        <IconButton id='docs' onClick={() => window.open("/docs", "_blank")}><ArticleIcon color='primary' /></IconButton>
                        <Typography id='name' variant="h5" color='secondary'><i>{projectName}</i></Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )

}

export default TopBar;
