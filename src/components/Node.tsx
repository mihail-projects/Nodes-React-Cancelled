import '../styles/Node.css'
import '../styles/Fonts.css'
import Draggable from 'react-draggable'

interface props {
    title: string
    posX: number
    posY: number
    properties: {
        name: string
        leftC: boolean
        rightC: boolean
    }[]
}

function Node(props: props) {

    return (
        <Draggable defaultPosition={{ x: props.posX, y: props.posY }}>
            <div id='node'>
                <div id='title'>{props.title}</div>
                {props.properties.map((element: any, index: number) => {
                    return (<>
                        <div id='property' style={{ paddingTop: (index + (index === 0 ? 5 : 0)) + 'px' }}>{element.name}</div>
                        <div id='connector' style={{ backgroundColor: element.leftConn ? '#d3d3d333' : '#323232', bottom: (index * 20 + 13) + 'px', left: '-5px' }} />
                        <div id='connector' style={{ backgroundColor: element.rightConn ? '#d3d3d333' : '#323232', bottom: (index * 20 + 13) + 'px', right: '-6px' }} />
                    </>)
                })}
            </div>
        </Draggable>
    )

}

export default Node;
