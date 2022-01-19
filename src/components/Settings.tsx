/* eslint-disable react/react-in-jsx-scope */
import '../Styles/Settings.css'
import '../Styles/Fonts.css'

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
