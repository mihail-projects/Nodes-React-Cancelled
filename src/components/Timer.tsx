/* eslint-disable @typescript-eslint/ban-types */
import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

type TimerProps = {
    time: Date,
    expire: Function
}

function Timer(props: TimerProps) {

    const {
        start,
    } = useTimer({ expiryTimestamp: props.time, onExpire: () => props.expire })

    useEffect(() => {
        start()
    }, [])

    return null

}

export default Timer