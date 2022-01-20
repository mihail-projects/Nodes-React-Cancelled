/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/ban-types */
import '../Styles/ContextMenu.css'
import { useEffect, useState } from 'react'
import { menuProps, templates } from './templates'
import { Paper } from '@mui/material'
import { Typography } from '@mui/material';

function ContextMenu({ show, xPos, yPos, add }: menuProps) {

    const [showUI, setShowUI] = useState(false)
    const [showFunc, setShowFunc] = useState(false)

    useEffect(() => {
        window.addEventListener('click', () => change(false, false))
        return () => {
            window.removeEventListener('click', () => change(false, false))
        }
    }, [])

    const change = (ui: boolean, func: boolean) => {
        setShowUI(ui)
        setShowFunc(func)
    }

    if (show) {
        return (
            <>
                <Paper id='menu' style={{ top: yPos + 'px', left: xPos + 'px' }}>
                    <Typography id='option' variant="subtitle2" color='primary' onMouseOver={() => change(true, false)}>Interface ➤</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onMouseOver={() => change(false, true)}>Functionality ➤</Typography>
                </Paper>
                <Paper id='menu' style={{ position: 'absolute', visibility: showUI ? 'visible' : 'hidden', top: yPos + 'px', left: xPos + 125 + 'px' }}>
                    <Typography id='option' variant="subtitle2" color='primary' onClick={() => add(templates[7].textTemplate)}>Text</Typography>
                    <Typography id='option' variant="subtitle2" color='primary' onClick={() => add(templates[8].eventTemplate)}>Event</Typography>
                    <Typography id='option' variant="subtitle2" color='primary' onClick={() => add(templates[9].mediaTemplate)}>Media</Typography>
                    <Typography id='option' variant="subtitle2" color='primary' onClick={() => add(templates[10].tweenTemplate)}>Tween</Typography>
                    <Typography id='option' variant="subtitle2" color='primary' onClick={() => add(templates[12].containerTemplate)}>Container</Typography>
                </Paper>
                <Paper id='menu' style={{ position: 'absolute', visibility: showFunc ? 'visible' : 'hidden', top: yPos + 25 + 'px', left: xPos + 125 + 'px' }}>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => add(templates[0].ifTemplate)}>If</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => add(templates[1].forTemplate)}>For</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => add(templates[2].classTemplate)}>Class</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => add(templates[3].compareTemplate)}>Compare</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => add(templates[4].setVariableTemplate)}>SetVariable</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => add(templates[5].httpReqTemplate)}>HttpRequest</Typography>
                    <Typography id='option' variant="subtitle2" color='secondary' onClick={() => add(templates[6].functionTemplate)}>GroupToFunction</Typography>
                </Paper>
            </>
        )
    } else return null

}

export default ContextMenu;
