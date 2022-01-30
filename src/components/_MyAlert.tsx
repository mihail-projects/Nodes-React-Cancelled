/* eslint-disable react/react-in-jsx-scope */
import Alert from '@mui/material/Alert'
import { useState } from 'react'
import Timer from './Timer'

type AlertSeverity = 'error' | 'success' | 'info' | 'warning' | undefined

type AlertProps = {
    text: string,
    severity: AlertSeverity,
    time: Date
}

function MyAlert(props: AlertProps) {

    const [show, setShow] = useState(true)

    return (
        show ?
            <div>
                <Alert sx={{ position: 'absolute', top: '95px', left: '10px' }} onClose={() => setShow(false)} severity={props.severity}>{props.text}</Alert>
                <Timer time={props.time} expire={() => setShow(false)} />
            </div>
            : null
    )

}

export default MyAlert
