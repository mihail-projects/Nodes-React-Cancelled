import '../styles/Settings.css'
import '../styles/Fonts.css'
import { useState } from 'react';

type props = {
    show: boolean
}

function Settings({ show }: props) {

    if (show) {
        return (
            <div id='settingsBG'>
            </div>
        )
    }else return null

}

export default Settings;
