/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/ban-types */
import '../Styles/ContextMenu.css'
import { useEffect, useState } from 'react'
import { templates } from './templates'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

type MenuProps = {
    show: boolean
    mousePos: number[]
    add: Function
}

function ContextMenu(props: MenuProps) {

    const [showUI, setShowUI] = useState(false)
    const [showFunc, setShowFunc] = useState(false)
    const [pos, setPos] = useState <number[]>([])

    useEffect(() => {
        window.addEventListener('click', () => change(false, false))
        return () => {
            window.removeEventListener('click', () => change(false, false))
        }
    }, [])

    useEffect(() => {
        setPos(props.mousePos)
    }, [props.show])

    function change(ui: boolean, func: boolean) {
        setShowUI(ui)
        setShowFunc(func)
    }

    if (props.show) {
        return (
            <>
                <Paper id='menu' style={{ top: pos[1] + 'px', left: pos[0] + 'px' }}>
                    <Typography id='option' variant="subtitle2" color='primary' onMouseOver={() => change(true, false)}>Interface ➤</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onMouseOver={() => change(false, true)}>Functionality ➤</Typography>
                </Paper>
                <Paper id='menu' style={{ position: 'absolute', visibility: showUI ? 'visible' : 'hidden', top: pos[1] + 'px', left: pos[0] + 125 + 'px' }}>
                    <Typography id='option' variant="subtitle2" color='primary' onClick={() => props.add(templates[7].textTemplate)}>Text</Typography>
                    <Typography id='option' variant="subtitle2" color='primary' onClick={() => props.add(templates[8].eventTemplate)}>Event</Typography>
                    <Typography id='option' variant="subtitle2" color='primary' onClick={() => props.add(templates[9].mediaTemplate)}>Media</Typography>
                    <Typography id='option' variant="subtitle2" color='primary' onClick={() => props.add(templates[10].tweenTemplate)}>Tween</Typography>
                    <Typography id='option' variant="subtitle2" color='primary' onClick={() => props.add(templates[12].containerTemplate)}>Container</Typography>
                </Paper>
                <Paper id='menu' style={{ position: 'absolute', visibility: showFunc ? 'visible' : 'hidden', top: pos[1] + 25 + 'px', left: pos[0] + 125 + 'px' }}>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => props.add(templates[0].ifTemplate)}>If</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => props.add(templates[1].forTemplate)}>For</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => props.add(templates[2].classTemplate)}>Class</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => props.add(templates[3].compareTemplate)}>Compare</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => props.add(templates[4].setVariableTemplate)}>SetVariable</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => props.add(templates[5].httpReqTemplate)}>HttpRequest</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => props.add(templates[6].functionTemplate)}>GroupToFunction</Typography>
                </Paper>
            </>
        )
    } else return null

}

export default ContextMenu;
