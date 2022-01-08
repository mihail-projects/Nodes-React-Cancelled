/* eslint-disable react/react-in-jsx-scope */
import '../styles/TopBar.css'
import '../styles/Fonts.css'
import cog from '../Media/cog.png';
import book from '../Media/book.png';
import { useState } from 'react';
import Settings from './Settings';

type topBarProps = {
    projectName: string
}

function TopBar({ projectName }: topBarProps) {

    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
            <Settings show={showSettings} />
            <div id='topbar'>
                <div id='logo'>Node.</div>
                <div id='name'><i>{projectName}</i></div>
                <img id='docs' src={book} onClick={() => window.open("/docs", "_blank")} />
                <img id='settings' src={cog} onClick={() => setShowSettings(!showSettings)} />
            </div>
        </>
    )

}

export default TopBar;
