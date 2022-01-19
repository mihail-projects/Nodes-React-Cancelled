/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/ban-types */
import '../Styles/ContextMenu.css'
import { useEffect, useState } from 'react'
import { menuProps, templates } from './templates'

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
                <div id='menu' style={{ top: yPos + 'px', left: xPos + 'px' }}>
                    <div id='option' onMouseOver={() => change(true, false)} >Interface ➤</div>
                    <div id='option' onMouseOver={() => change(false, true)} style={{ paddingTop: '5px' }}>Function ➤</div>
                </div>
                <div id='menu' style={{ position: 'absolute', visibility: showUI ? 'visible' : 'hidden', top: yPos + 'px', left: xPos + 100 + 'px' }}>
                    <div id='option' onClick={() => add(templates[7].textTemplate)}>Text</div>
                    <div id='option' onClick={() => add(templates[8].eventTemplate)} style={{ paddingTop: '5px' }}>Event</div>
                    <div id='option' onClick={() => add(templates[9].mediaTemplate)} style={{ paddingTop: '5px' }}>Media</div>
                    <div id='option' onClick={() => add(templates[10].tweenTemplate)} style={{ paddingTop: '5px' }}>Tween</div>
                    <div id='option' onClick={() => add(templates[12].containerTemplate)} style={{ paddingTop: '5px' }}>Container</div>
                </div>
                <div id='menu' style={{ position: 'absolute', visibility: showFunc ? 'visible' : 'hidden', top: yPos + 25 + 'px', left: xPos + 100 + 'px' }}>
                    <div id='option' onClick={() => add(templates[0].ifTemplate)}>If</div>
                    <div id='option' onClick={() => add(templates[1].forTemplate)} style={{ paddingTop: '5px' }}>For</div>
                    <div id='option' onClick={() => add(templates[2].classTemplate)} style={{ paddingTop: '5px' }}>Class</div>
                    <div id='option' onClick={() => add(templates[3].compareTemplate)} style={{ paddingTop: '5px' }}>Compare</div>
                    <div id='option' onClick={() => add(templates[4].setVariableTemplate)} style={{ paddingTop: '5px' }}>SetVariable</div>
                    <div id='option' onClick={() => add(templates[5].httpReqTemplate)} style={{ paddingTop: '5px' }}>HttpRequest</div>
                    <div id='option' onClick={() => add(templates[6].functionTemplate)} style={{ paddingTop: '5px' }}>GroupToFunction</div>
                </div>
            </>
        )
    } else return null

}

export default ContextMenu;
