/* eslint-disable react/react-in-jsx-scope */
import '../styles/Node.css'
import '../styles/Fonts.css'
import Draggable from 'react-draggable'
import nodeProps from './nodeProps'

function Node(props: nodeProps) {

    return (

        <Draggable defaultPosition={{ x: props.posX, y: props.posY }}>

            <div id='node' onMouseOver={() => props.select(props.id)} onMouseOut={() => props.select(-1)}>

                <div id='title'>{props.title}</div>

                {props.properties.map((element: {name: string, leftC: boolean, rightC: boolean}, index: number) => {
                    return (<>
                        <div id='property' style={{ paddingTop: (index + (index === 0 ? 5 : 0)) + 'px' }}>{element.name}</div>
                        <div id='connector' style={{ backgroundColor: element.leftC ? '#35363a30' : '#323232', bottom: (index * 20 + 13) + 'px', left: '-5px' }} />
                        <div id='connector' style={{ backgroundColor: element.rightC ? '#d3d3d330' : '#323232', bottom: (index * 20 + 13) + 'px', right: '-6px' }} />
                    </>)
                })}

            </div>

        </Draggable>

    )

}

export default Node;
