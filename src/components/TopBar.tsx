/* eslint-disable react/react-in-jsx-scope */
import '../Styles/TopBar.css'
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from './Settings';
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

type TopBarProps = {
    projectName: string
}

function TopBar(props: TopBarProps) {

    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
        
            <Settings show={showSettings} />

            <AppBar id='bar' position="static" sx={{ borderRadius: 16, width: 'fit-content' }}>
                <Toolbar>
                    <Tooltip title="Account">
                        <IconButton id='account' onClick={() => null}>
                            <AccountCircleIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Settings">
                        <IconButton id='settings' onClick={() => setShowSettings(!showSettings)}>
                            <SettingsIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Docs">
                        <IconButton id='docs' onClick={() => window.open("/docs", "_blank")}>
                            <ArticleIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                    <TextField defaultValue={props.projectName} placeholder='Project name' margin='none' variant='standard' color={!props.projectName ? 'error' : 'secondary'} sx={{ marginLeft: '15px' }} />
                </Toolbar>
            </AppBar >
            
        </>
    )

}

export default TopBar;
