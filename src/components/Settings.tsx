/* eslint-disable react/react-in-jsx-scope */
import '../styles/Settings.css'
import '../styles/Fonts.css'

type settingsProps = {
    show: boolean
}

function Settings({ show }: settingsProps) {

    if (show) {
        return (
            <div id='settingsBG'>
            </div>
        )
    }else return null

}

export default Settings;
