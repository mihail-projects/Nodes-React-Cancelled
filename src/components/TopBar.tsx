/* eslint-disable react/react-in-jsx-scope */
import '../Styles/TopBar.css'
import '../Styles/Fonts.css'
import cog from '../Media/cog.png';
import docs from '../Media/docs.png';
import account from '../Media/account.png';
import Settings from './Settings';
import { useState } from 'react';

type topBarProps = {
    projectName: string
}

function TopBar({ projectName }: topBarProps) {

    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
            <Settings show={showSettings} />
            <div id='topbarLeft'>
                <img id='account' src={account} onClick={() => null} />
                <img id='docs' src={docs} onClick={() => window.open("/docs", "_blank")} />
                <img id='settings' src={cog} onClick={() => setShowSettings(!showSettings)} />
            </div>
            <div id='topbarCenter'>
                <div id='name'><i>{projectName}</i></div>
            </div>
        </>
    )

}

export default TopBar;
