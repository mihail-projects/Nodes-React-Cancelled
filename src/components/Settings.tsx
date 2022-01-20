/* eslint-disable react/react-in-jsx-scope */
import '../Styles/Settings.css'
import '../Styles/Fonts.css'
import { Paper } from '@mui/material'

type settingsProps = {
    show: boolean
}

function Settings({ show }: settingsProps) {

    if (show) {
        return (
            <Paper id='settingsBG'>
            </Paper>
        )
    } else return null

}

export default Settings;
