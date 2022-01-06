import { useEffect, useState } from 'react'
import '../styles/ContextMenu.css'

type props = {
    show: boolean
    xPos: number
    yPos: number
    func: Function
}

function ContextMenu({ show, xPos, yPos, func }: props) {

    const [showUI, setShowUI] = useState(false)
    const [showFunc, setShowFunc] = useState(false)

    useEffect(() => {
        window.addEventListener('click', () => setShowUI(false))
        return () => {
            window.removeEventListener('click', () => setShowFunc(false))
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
                    <div id='option' onClick={() => func('If')}>If</div>
                    <div id='option' onClick={() => func('For')} style={{ paddingTop: '5px' }}>For</div>
                    <div id='option' onClick={() => func('Class')} style={{ paddingTop: '5px' }}>Class</div>
                    <div id='option' onClick={() => func('Compare')} style={{ paddingTop: '5px' }}>Compare</div>
                    <div id='option' onClick={() => func('SetVariable')} style={{ paddingTop: '5px' }}>SetVariable</div>
                    <div id='option' onClick={() => func('HttpRequest')} style={{ paddingTop: '5px' }}>HttpRequest</div>
                    <div id='option' onClick={() => func('GroupToFunction')} style={{ paddingTop: '5px' }}>GroupToFunction</div>
                </div>
                <div id='menu' style={{ position: 'absolute', visibility: showFunc ? 'visible' : 'hidden', top: yPos + 25 + 'px', left: xPos + 100 + 'px' }}>
                    <div id='option' onClick={() => func('Text')}>Text</div>
                    <div id='option' onClick={() => func('Event')} style={{ paddingTop: '5px' }}>Event</div>
                    <div id='option' onClick={() => func('Media')} style={{ paddingTop: '5px' }}>Media</div>
                    <div id='option' onClick={() => func('Tween')} style={{ paddingTop: '5px' }}>Tween</div>
                    <div id='option' onClick={() => func('Container')} style={{ paddingTop: '5px' }}>Container</div>
                    <div id='option' onClick={() => func('QuatradicArray')} style={{ paddingTop: '5px' }}>QuatradicArray</div>
                </div>
            </>
        )
    } else return null

}

export default ContextMenu;
