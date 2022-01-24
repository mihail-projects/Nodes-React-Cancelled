import React, { useEffect, useState } from 'react'

type DraggableProps = {
    drag: boolean,
    mousePos: number[],
    children: JSX.Element,
}

function Draggable(props: DraggableProps) {

    const [pos, setPos] = useState<number[]>(props.mousePos)

    useEffect(() => {
        if (props.drag) {
            setPos(props.mousePos)
        }
    }, [props])

    return (
        <div
            style={{
                position: 'absolute',
                top: pos[1]-20,
                left: pos[0]-75
            }}>
            {props.children}
        </div>
    )

}

export default Draggable